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
import { ConfigurationPanel, PageContainer, SpacingBottom } from './SettingsDashboard.styled'

const SettingsDashboard: React.FC = () => {
  const { conferenceSlug, token } = useAppContext()
  const [defaultStartupSelections, setDefaultStartupSelections] = useState<number | undefined>()
  const [meetingsPerSession, setMeetingsPerSession] = useState<number | undefined>()
  const [sessionDuration, setSessionDuration] = useState<number | undefined>()
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
          investorMeetingsConfigurations: {
            defaultStartupSelections: number
            meetingsPerSession: number
            sessionDuration: number
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

  useEffect(() => {
    if (data) {
      setDefaultStartupSelections(
        data?.event.configuration.investorMeetingsConfigurations.defaultStartupSelections
      )
      setMeetingsPerSession(
        data?.event.configuration.investorMeetingsConfigurations.meetingsPerSession
      )
      setSessionDuration(data?.event.configuration.investorMeetingsConfigurations.sessionDuration)
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
      if (eventUpdate?.userErrors.length) setMutationError(eventUpdate?.userErrors[0]?.message)
    },
    refetchQueries: ['EventQuery'],
    variables: {
      investorMeetingsDefaultStartupSelections: defaultStartupSelections,
      investorMeetingsMeetingsPerSession: meetingsPerSession,
      investorMeetingsSessionDuration: sessionDuration,
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
      </PageContainer>
    </>
  )
}

export default SettingsDashboard
