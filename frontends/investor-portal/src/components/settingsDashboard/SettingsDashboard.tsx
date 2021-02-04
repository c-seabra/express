import 'moment-timezone'

import { ApolloError, useMutation, useQuery } from '@apollo/client'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'

import { Button } from '../../lib/components'
import ContainerCard from '../../lib/components/atoms/ContainerCard'
import LabeledInput from '../../lib/components/molecules/LabeledInput'
import Loader from '../../lib/Loading'
import EVENT_UPDATE_MUTATION from '../../operations/mutations/EventUpdate'
import EVENT_QUERY from '../../operations/queries/Event'
import { useAppContext } from '../app/AppContext'
import Success from '../settingsActions/Success'
import Warning from '../settingsActions/Warning'
import InvestorSessions from './InvestorSessions'
import SessionsSummary from './SessionsSummary'
import {
  ConfigurationPanel,
  FormArea,
  PageContainer,
  SpacingBottom,
  SponsorLogo,
} from './SettingsDashboard.styled'

const SettingsDashboard: React.FC = () => {
  const { conferenceSlug, token } = useAppContext()
  const [defaultStartupSelections, setDefaultStartupSelections] = useState<number | undefined>()
  const [eventTimezone, setEventTimezone] = useState<string>('Europe/Dublin')
  const [file, setFile] = useState<File | undefined>()
  const [meetingsPerSession, setMeetingsPerSession] = useState<number | undefined>()
  const [sessionDuration, setSessionDuration] = useState<number | undefined>()
  const [sponsorLogoUrl, setSponsorLogoUrl] = useState<string | undefined>()
  const [startupPortalOpeningAt, setStartupPortalOpeningAt] = useState<string | undefined>()
  const [startupPortalClosingAt, setStartupPortalClosingAt] = useState<string | undefined>()
  const [startupSelectionDeadline, setStartupSelectionDeadline] = useState<string | undefined>()
  const [mutationSuccessMessage, setMutationSuccessMessage] = useState<string | undefined>()
  const [mutationError, setMutationError] = useState<string | undefined>()

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
            startupPortalClosingAt: string
            startupPortalOpeningAt: string
            startupSelectionDeadline: string
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
        timezone: string
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

  const handleUpload = (uploadedFile?: File) => {
    setSponsorLogoUrl(URL.createObjectURL(uploadedFile))
    setFile(uploadedFile)
  }

  const usableDateString = (dateString: string | undefined) => {
    if (dateString === undefined || dateString === null) {
      return undefined
    }
    const str = dateString
    return moment(str).utcOffset(str).format('YYYY-MM-DDTHH:mm')
  }

  const styledDateForMutation = (dateString?: string) => {
    if (dateString === undefined || dateString === '') {
      return null
    }
    return moment(dateString).tz(eventTimezone, true).format()
  }

  useEffect(() => {
    if (data) {
      setEventTimezone(data?.event.timezone || 'Europe/Dublin')
      const configurations = data?.event.configuration.investorMeetingConfiguration
      setDefaultStartupSelections(configurations.defaultStartupSelections)
      setMeetingsPerSession(configurations.meetingsPerSession)
      setSessionDuration(configurations.sessionDuration)
      setSponsorLogoUrl(configurations.sponsorLogoUrl)

      setStartupPortalOpeningAt(usableDateString(configurations.startupPortalOpeningAt))
      setStartupPortalClosingAt(usableDateString(configurations.startupPortalClosingAt))
      setStartupSelectionDeadline(usableDateString(configurations.startupSelectionDeadline))
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

      investorMeetingsStartupPortalClosingAt: styledDateForMutation(startupPortalClosingAt),
      investorMeetingsStartupPortalOpeningAt: styledDateForMutation(startupPortalOpeningAt),
      investorMeetingsStartupSelectionDeadline: styledDateForMutation(startupSelectionDeadline),
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
                  accept="image/svg+xml"
                  defaultValue={sponsorLogoUrl}
                  label="Sponsor logo"
                  type="file"
                  onChange={e => {
                    handleUpload(e.target.files?.[0])
                  }}
                />
                <FormArea>
                  <h2>Session settings</h2>
                  <LabeledInput
                    defaultValue={sessionDuration}
                    label="Sessions duration (min)"
                    type="number"
                    onChange={e => {
                      setSessionDuration(parseInt(e.target.value, 10))
                    }}
                  />
                  <LabeledInput
                    defaultValue={meetingsPerSession}
                    label="Meetings per session"
                    type="number"
                    onChange={e => {
                      setMeetingsPerSession(parseInt(e.target.value, 10))
                    }}
                  />
                  <LabeledInput
                    defaultValue={defaultStartupSelections}
                    label="Minimum startup selections"
                    type="number"
                    onChange={e => {
                      setDefaultStartupSelections(parseInt(e.target.value, 10))
                    }}
                  />
                </FormArea>
                <FormArea>
                  <h2>Investor portal dates</h2>
                  <LabeledInput
                    label="Startup submissions deadline"
                    type="datetime-local"
                    value={startupSelectionDeadline}
                    onChange={e => {
                      setStartupSelectionDeadline(e.target.value)
                    }}
                  />
                </FormArea>
                <FormArea>
                  <h2>Startup portal dates</h2>
                  <LabeledInput
                    label="Startup Portal opening at"
                    type="datetime-local"
                    value={startupPortalOpeningAt}
                    onChange={e => {
                      setStartupPortalOpeningAt(e.target.value)
                    }}
                  />
                  <LabeledInput
                    label="Startup Portal closing at"
                    min={startupPortalOpeningAt}
                    type="datetime-local"
                    value={startupPortalClosingAt}
                    onChange={e => {
                      setStartupPortalClosingAt(e.target.value)
                    }}
                  />
                </FormArea>
                <div>
                  <Button onClick={submitSettings}>Save</Button>
                </div>
              </ConfigurationPanel>
            </SpacingBottom>
          </ContainerCard>
        </SpacingBottom>
        <SpacingBottom>
          <InvestorSessions />
        </SpacingBottom>
        {investorSessionsSummary?.length && (
          <SessionsSummary investorSessionsSummary={investorSessionsSummary} />
        )}
      </PageContainer>
    </>
  )
}

export default SettingsDashboard
