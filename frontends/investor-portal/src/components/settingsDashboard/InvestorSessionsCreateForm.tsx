import 'moment-timezone'

import { ApolloError, useMutation, useQuery } from '@apollo/client'
import moment from 'moment'
import React, { useEffect, useState } from 'react'

import { Button } from '../../lib/components'
import LabeledInput from '../../lib/components/molecules/LabeledInput'
import INVESTOR_SESSIONS_CREATE_MUTATION from '../../operations/mutations/InvestorSessionsCreate'
import EVENT_QUERY from '../../operations/queries/Event'
import { useAppContext } from '../app/AppContext'
import Success from '../settingsActions/Success'
import Warning from '../settingsActions/Warning'
import SessionsSummary from './SessionsSummary'
import { AddButton, BorderBottom, FormArea, SpacingBottom } from './SettingsDashboard.styled'

const InvestorSessionsCreateForm: React.FC = () => {
  const { conferenceSlug, token } = useAppContext()
  const [eventTimezone, setEventTimezone] = useState<string>('Europe/Dublin')
  const [startsAt, setStartsAt] = useState<string | undefined>()
  const [endsAt, setEndsAt] = useState<string | undefined>()
  const [count, setCount] = useState<number | undefined>()
  const [mutationSuccessMessage, setMutationSuccessMessage] = useState<string | undefined>()
  const [mutationError, setMutationError] = useState<string | undefined>()

  const {
    data,
    refetch,
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
    refetch?: any
  } = useQuery(EVENT_QUERY, {
    context: {
      slug: conferenceSlug,
      token,
    },
  })

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
    setEventTimezone(data?.event.timezone || 'Europe/Dublin')
    setStartsAt(usableDateString(startsAt))
    setEndsAt(usableDateString(endsAt))
    setCount(count)
  }, [data])

  const investorSessionsSummary = data?.event.investorSessionsSummary

  const [investorSessionsCreateMutation] = useMutation(INVESTOR_SESSIONS_CREATE_MUTATION, {
    context: {
      slug: conferenceSlug,
      token,
    },
    onCompleted: ({ investorSessionsCreate }) => {
      const success = investorSessionsCreate?.successMessage
      if (success !== null) {
        setMutationSuccessMessage(investorSessionsCreate?.successMessage)
        setMutationError('')
      }
      if (investorSessionsCreate?.userErrors.length) {
        setMutationError(investorSessionsCreate?.userErrors[0].message)
      }
    },
    refetchQueries: ['EventQuery'],
    variables: {
      investorSessionsCount: count,
      investorSessionsEndsAt: styledDateForMutation(endsAt),
      investorSessionsStartsAt: styledDateForMutation(startsAt),
    },
  })

  const submitForm = () => {
    investorSessionsCreateMutation()
    setTimeout(() => {
      refetch()
    }, 500)
  }

  return (
    <>
      {mutationError && (
        <Warning>
          <span>{mutationError}</span>
        </Warning>
      )}
      {mutationSuccessMessage && (
        <Success>
          <span>{mutationSuccessMessage}</span>
        </Success>
      )}
      <BorderBottom>
        <SpacingBottom>
          <FormArea>
            <LabeledInput
              label="Starting Time"
              type="datetime-local"
              value={startsAt}
              onChange={e => {
                setStartsAt(e.target.value)
              }}
            />
            <LabeledInput
              label="Ending Time"
              min={startsAt}
              type="datetime-local"
              value={endsAt}
              onChange={e => {
                setEndsAt(e.target.value)
              }}
            />
            <LabeledInput
              defaultValue={count}
              label="How many sessions in this block?"
              type="number"
              onChange={e => {
                setCount(parseInt(e.target.value))
              }}
            />
          </FormArea>
          <AddButton>
            <Button onClick={submitForm}>Add Session</Button>
          </AddButton>
        </SpacingBottom>
      </BorderBottom>
      {investorSessionsSummary && (
        <SessionsSummary investorSessionsSummary={investorSessionsSummary} />
      )}
    </>
  )
}

export default InvestorSessionsCreateForm
