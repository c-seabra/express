import 'moment-timezone'

import { ApolloError, useMutation, useQuery } from '@apollo/client'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'

import { Button, ContainerCard } from '../../lib/components'
import LabeledFileInput from '../../lib/components/molecules/LabeledFileInput'
import LabeledInput from '../../lib/components/molecules/LabeledInput'
import Loader from '../../lib/Loading'
import EVENT_UPDATE_MUTATION from '../../operations/mutations/EventUpdate'
import EVENT_QUERY from '../../operations/queries/Event'
import { useAppContext } from '../app/AppContext'
import Success from '../settingsActions/Success'
import Warning from '../settingsActions/Warning'
import InvestorSessionsCreateForm from './InvestorSessionsCreateForm'
import SessionsSummary from './SessionsSummary'
import {
  ConfigurationPanel,
  FormArea,
  PageContainer,
  SpacingBottom,
  SponsorLogo,
} from './SettingsDashboard.styled'
import { useErrorSnackbar, useSuccessSnackbar } from '../../lib/hooks/useSnackbarMessage'

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
  // const [mutationSuccessMessage, setMutationSuccessMessage] = useState<string | undefined>()
  // const [mutationError, setMutationError] = useState<string | undefined>()
  const success = useSuccessSnackbar()
  const errorMessage = useErrorSnackbar()

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
        timeZone: {
          ianaName: string
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

  // if (error) {
  //   errorMessage(event?.userErrors[0].message)
  // }

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
      setEventTimezone(data?.event.timeZone.ianaName || 'Europe/Dublin')
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
      if (eventUpdate?.userErrors[0]) {
        errorMessage(eventUpdate?.userErrors[0].message)
      } else {
        success(eventUpdate?.successMessage)
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
  console.log(error)

  return (
    <>
      <Helmet>
        <title>Investor Portal configurations</title>
      </Helmet>
      <PageContainer>
        {loading && <Loader />}
        {error && (
          <Warning>
            <span>{error[0].message}</span>
          </Warning>
        )}
        <SpacingBottom>
          <ContainerCard color="#00AFA9" title="Investor portal settings">
            <SpacingBottom>
              <ConfigurationPanel
                onSubmit={e => {
                  e.preventDefault()
                  submitSettings()
                }}
              >
                <FormArea>
                  <SponsorLogo src={sponsorLogoUrl} />
                  <LabeledFileInput
                    accept="image/svg+xml"
                    className="file-input"
                    defaultValue={sponsorLogoUrl}
                    label="Upload a SVG file"
                    type="file"
                    onChange={e => {
                      handleUpload(e.target.files?.[0])
                    }}
                  />
                </FormArea>
                <FormArea>
                  <h3 className="heading">Session settings</h3>
                  <LabeledInput
                    defaultValue={sessionDuration}
                    label="Sessions duration (min)"
                    type="number"
                    onChange={e => {
                      setSessionDuration(+e.target.value)
                    }}
                  />
                  <LabeledInput
                    defaultValue={meetingsPerSession}
                    label="Meetings per session"
                    type="number"
                    onChange={e => {
                      setMeetingsPerSession(+e.target.value)
                    }}
                  />
                  <LabeledInput
                    defaultValue={defaultStartupSelections}
                    label="Minimum startup selections"
                    type="number"
                    onChange={e => {
                      setDefaultStartupSelections(+e.target.value)
                    }}
                  />
                </FormArea>
                <FormArea>
                  <h3 className="heading">Investor portal dates</h3>
                  <LabeledInput
                    label="Startup submissions deadline"
                    type="datetime-local"
                    value={startupSelectionDeadline}
                    onChange={e => {
                      setStartupSelectionDeadline(e.target.value)
                    }}
                  />
                </FormArea>
                <FormArea className="space-around">
                  <h3 className="heading">Startup portal dates</h3>
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
                <FormArea>
                  <Button className="align-right" onClick={submitSettings}>
                    Save
                  </Button>
                </FormArea>
              </ConfigurationPanel>
            </SpacingBottom>
          </ContainerCard>
        </SpacingBottom>
        <ContainerCard color="#4688D9" title="Sessions">
          <SpacingBottom>
            <InvestorSessionsCreateForm
              refetchSessions={() => refetch()}
              timeZone={eventTimezone}
            />
            {investorSessionsSummary?.length && (
              <SessionsSummary investorSessionsSummary={investorSessionsSummary} />
            )}
          </SpacingBottom>
        </ContainerCard>
      </PageContainer>
    </>
  )
}

export default SettingsDashboard
