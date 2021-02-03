import { ApolloError, useMutation, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import moment from 'moment';
import 'moment-timezone';

import { Button } from '../../lib/components'
import ContainerCard from '../../lib/components/atoms/ContainerCard'
import LabeledInput from '../../lib/components/molecules/LabeledInput'
import Loader from '../../lib/Loading'
import EVENT_UPDATE_MUTATION from '../../operations/mutatuions/EventUpdate'
import EVENT_QUERY from '../../operations/queries/Event'
import { useAppContext } from '../app/AppContext'
import Success from '../settingsActions/Success'
import Warning from '../settingsActions/Warning'
import {
  ConfigurationPanel,
  FormArea,
  PageContainer,
  SpacingBottom,
  SponsorLogo
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
        timezone: string
        configuration: {
          investorMeetingConfiguration: {
            defaultStartupSelections: number
            meetingsPerSession: number
            sessionDuration: number
            sponsorLogoUrl: string
            startupPortalOpeningAt: string
            startupPortalClosingAt: string
            startupSelectionDeadline: string
          }
        }
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

  const usableDateString = (dateString: string | undefined) => {
    if (dateString === undefined || dateString === null) {
      return undefined
    }
    let str = dateString
    return moment(str).utcOffset(str).format('YYYY-MM-DDTHH:mm')
  }

  const styledDateForMutation = (dateString?: string) => {
    if (dateString === undefined || dateString === "") {
      return null
    }
    return moment(dateString).tz(eventTimezone, true).format()
  }

  useEffect(() => {
    if (data) {
      setEventTimezone(data?.event.timezone)
      const configuration = data?.event.configuration.investorMeetingConfiguration
      setDefaultStartupSelections(configuration.defaultStartupSelections)
      setMeetingsPerSession(configuration.meetingsPerSession)
      setSessionDuration(configuration.sessionDuration)
      setSponsorLogoUrl(configuration.sponsorLogoUrl)

      setStartupPortalOpeningAt(usableDateString(configuration.startupPortalOpeningAt))
      setStartupPortalClosingAt(usableDateString(configuration.startupPortalClosingAt))
      setStartupSelectionDeadline(usableDateString(configuration.startupSelectionDeadline))
    }
  }, [data])

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
      investorMeetingsStartupPortalOpeningAt: styledDateForMutation(startupPortalOpeningAt),
      investorMeetingsStartupPortalClosingAt: styledDateForMutation(startupPortalClosingAt),
      investorMeetingsStartupSelectionDeadline: styledDateForMutation(startupSelectionDeadline)
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
                onChange={e => { handleUpload(e.target.files![0]) }}
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
              <FormArea>
                <h2>Startup portal dates</h2>
                <LabeledInput
                  value={startupPortalOpeningAt}
                  label="Startup Portal Opening At"
                  type="datetime-local"
                  onChange={e => {setStartupPortalOpeningAt(e.target.value)}}
                />
                <LabeledInput
                  value={startupPortalClosingAt}
                  min={startupPortalOpeningAt}
                  label="Startup Portal Closing At"
                  type="datetime-local"
                  onChange={e => {setStartupPortalClosingAt(e.target.value)}}
                />
              </FormArea>
              <FormArea>
                <h2>Investor portal dates</h2>
                <LabeledInput
                  value={startupSelectionDeadline}
                  label="Startup Selection Deadline"
                  type="datetime-local"
                  onChange={e => {setStartupSelectionDeadline(e.target.value)}}
                />
              </FormArea>
              <div>
                <Button onClick={submitSettings}>Save</Button>
              </div>
            </ConfigurationPanel>
          </SpacingBottom>
        </ContainerCard>
      </PageContainer>
    </>
  )
}

export default SettingsDashboard
