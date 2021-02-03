import { ApolloError, useMutation, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'

import { Button } from '../../lib/components'
import ContainerCard from '../../lib/components/atoms/ContainerCard'
import LabeledInput from '../../lib/components/molecules/LabeledInput'
import Loader from '../../lib/Loading'
import EVENT_UPDATE_MUTATION from '../../operations/mutatuions/EventUpdate'
import EVENT_QUERY from '../../operations/queries/Event'
import { useAppContext } from '../app/AppContext'
import Success from '../settingsActions/Success'
import Warning from '../settingsActions/Warning'
import InvestorSessions from './InvestorSessions'
import SessionsSummary from './SessionsSummary'
import {
  ConfigurationPanel,
  PageContainer,
  SpacingBottom,
  SponsorLogo,
} from './SettingsDashboard.styled'

const SettingsDashboard: React.FC = () => {
  const { conferenceSlug, token } = useAppContext()
  const [defaultStartupSelections, setDefaultStartupSelections] = useState<number | undefined>()
  const [meetingsPerSession, setMeetingsPerSession] = useState<number | undefined>()
  const [sessionDuration, setSessionDuration] = useState<number | undefined>()
  const [sponsorLogoUrl, setSponsorLogoUrl] = useState<string | undefined>()
  const [mutationSuccessMessage, setMutationSuccessMessage] = useState<string | undefined>()
  const [mutationError, setMutationError] = useState<string | undefined>()
  const [file, setFile] = useState<File | undefined>()

  const {
    data,
    error,
    loading,
  }: {
    data?: {
      event: {
        configuration: {
          investorMeetingConfiguration: {
            defaultStartupSelections: number
            meetingsPerSession: number
            sessionDuration: number
            sponsorLogoUrl: string
          }
        }
        investorSessionsSummary: [
          {
            claimed: number
            count: number
            endsAt: string
            startsAt: string
          }
        ]
      }
    }
    error?: ApolloError
    loading?: boolean
  } = useQuery(EVENT_QUERY, {
    context: {
      slug: conferenceSlug,
      token,
    },
  })

  const handleUpload = (file?: File) => {
    setSponsorLogoUrl(URL.createObjectURL(file))
    setFile(file)
  }

  useEffect(() => {
    if (data) {
      setDefaultStartupSelections(
        data?.event.configuration.investorMeetingConfiguration.defaultStartupSelections
      )
      setMeetingsPerSession(
        data?.event.configuration.investorMeetingConfiguration.meetingsPerSession
      )
      setSessionDuration(data?.event.configuration.investorMeetingConfiguration.sessionDuration)
      setSponsorLogoUrl(data?.event.configuration.investorMeetingConfiguration.sponsorLogoUrl)
    }
  }, [data])

  const investorSessionsSummary = data?.event.investorSessionsSummary

  const [eventUpdateMutuation] = useMutation(EVENT_UPDATE_MUTATION, {
    context: {
      slug: conferenceSlug,
      token,
    },
    onCompleted: ({ eventUpdate }) => {
      if (eventUpdate?.successMessage.length) {
        setMutationSuccessMessage(eventUpdate?.successMessage)
        setMutationError('')
      }
      if (eventUpdate?.userErrors.length) {
        setMutationError(eventUpdate?.userErrors[0])
      }
    },
    refetchQueries: ['EventQuery'],
    variables: {
      investorMeetingsDefaultStartupSelections: defaultStartupSelections,
      investorMeetingsMeetingsPerSession: meetingsPerSession,
      investorMeetingsSessionDuration: sessionDuration,
      investorMeetingsSponsorLogo: file,
    },
  })

  const submitSettings = () => {
    eventUpdateMutuation()
  }

  return (
    <>
      <Helmet>
        <title>Investor Portal configurations</title>
      </Helmet>
      <PageContainer>
        {loading && <Loader />}
        {mutationError && (
          <Warning>
            <span>{mutationError}</span>
          </Warning>
        )}
        {(error || mutationError) && (
          <Warning>
            <span>{error ? error.message : mutationError}</span>
          </Warning>
        )}
        {mutationSuccessMessage && (
          <Success>
            <span>{mutationSuccessMessage}</span>
          </Success>
        )}
        <SpacingBottom>
          <ContainerCard color="#00AFA9" title="Conference settings">
            <SpacingBottom>
              <ConfigurationPanel
                onSubmit={e => {
                  e.preventDefault()
                  submitSettings()
                }}
              >
                <SponsorLogo src={sponsorLogoUrl} />
                <LabeledInput
                  defaultValue={sponsorLogoUrl}
                  label="Sponsor logo"
                  type="file"
                  accept="image/svg+xml"
                  onChange={e => {
                    handleUpload(e.target.files?.[0])
                  }}
                />
                <LabeledInput
                  defaultValue={defaultStartupSelections}
                  label="Default startup selections"
                  type="number"
                  onChange={e => {
                    setDefaultStartupSelections(parseInt(e.target.value, 10))
                  }}
                />
                <LabeledInput
                  defaultValue={sessionDuration}
                  label="Investor session duration (minutes)"
                  type="number"
                  onChange={e => {
                    setSessionDuration(parseInt(e.target.value, 10))
                  }}
                />
                <LabeledInput
                  defaultValue={meetingsPerSession}
                  label="Startup meetings per investor session"
                  type="number"
                  onChange={e => {
                    setMeetingsPerSession(parseInt(e.target.value, 10))
                  }}
                />
                <div>
                  <Button onClick={submitSettings}>Save</Button>
                </div>
              </ConfigurationPanel>
            </SpacingBottom>
          </ContainerCard>
        </SpacingBottom>
        {investorSessionsSummary?.length && (
          <SessionsSummary investorSessionsSummary={investorSessionsSummary} />
        )}
        <InvestorSessions/>
      </PageContainer>
    </>
  )
}

export default SettingsDashboard
