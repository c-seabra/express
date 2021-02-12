import 'moment-timezone'

import { useMutation } from '@apollo/client'
import moment from 'moment'
import React, { useState } from 'react'

import { Button } from '../../lib/components'
import LabeledInput from '../../lib/components/molecules/LabeledInput'
import INVESTOR_SESSIONS_CREATE_MUTATION from '../../operations/mutations/InvestorSessionsCreate'
import { useAppContext } from '../app/AppContext'
import Success from '../settingsActions/Success'
import Warning from '../settingsActions/Warning'
import { SpacingBottom, StyledGridContainer } from './InvestorSessionsCreateForm.styled'
import { BorderBottom } from './SettingsDashboard.styled'

type InvestorSessionsCreateFormType = {
  refetchSessions: any
  timeZone: string
}

const InvestorSessionsCreateForm: React.FC<InvestorSessionsCreateFormType> = ({
  refetchSessions,
  timeZone,
}) => {
  const { conferenceSlug, token } = useAppContext()
  const [eventTimezone] = useState<string>(timeZone)
  const [startsAt, setStartsAt] = useState<string | undefined>()
  const [endsAt, setEndsAt] = useState<string | undefined>()
  const [count, setCount] = useState<number | undefined>()
  const [mutationSuccessMessage, setMutationSuccessMessage] = useState<string | undefined>()
  const [mutationError, setMutationError] = useState<string | undefined>()

  const styledDateForMutation = (dateString?: string) => {
    if (dateString === undefined || dateString === '') {
      return null
    }
    return moment(dateString).tz(eventTimezone, true).format()
  }

  const [investorSessionsCreateMutation] = useMutation(INVESTOR_SESSIONS_CREATE_MUTATION, {
    context: {
      slug: conferenceSlug,
      token,
    },
    onCompleted: ({ investorSessionsCreate }) => {
      const success = investorSessionsCreate?.successMessage
      if (success !== null) {
        setMutationSuccessMessage(investorSessionsCreate?.successMessage)
        refetchSessions()
        setMutationError('')
      }
      if (investorSessionsCreate?.userErrors.length) {
        setMutationError(investorSessionsCreate?.userErrors[0].message)
      }
    },
    variables: {
      investorSessionsCount: count,
      investorSessionsEndsAt: styledDateForMutation(endsAt),
      investorSessionsStartsAt: styledDateForMutation(startsAt),
    },
  })

  const submitForm = () => {
    investorSessionsCreateMutation()
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
          <StyledGridContainer
            onSubmit={e => {
              e.preventDefault()
              investorSessionsCreateMutation()
            }}
          >
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
                setCount(+e.target.value)
              }}
            />
            <Button className="align-right" type="submit">
              Add Session
            </Button>
          </StyledGridContainer>
        </SpacingBottom>
      </BorderBottom>
    </>
  )
}

export default InvestorSessionsCreateForm
