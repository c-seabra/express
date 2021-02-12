import 'moment-timezone'

import { useMutation } from '@apollo/client'
import moment from 'moment'
import React, { useState } from 'react'

import { Button } from '../../lib/components'
import LabeledInput from '../../lib/components/molecules/LabeledInput'
import { useErrorSnackbar, useSuccessSnackbar } from '../../lib/hooks/useSnackbarMessage'
import { UserError } from '../../lib/types'
import INVESTOR_SESSIONS_CREATE_MUTATION from '../../operations/mutations/InvestorSessionsCreate'
import { useAppContext } from '../app/AppContext'
import { SpacingBottom, StyledGridContainer } from './InvestorSessionsCreateForm.styled'
import { BorderBottom } from './SettingsDashboard.styled'

type InvestorSessionsCreateFormType = {
  timeZone: string
}

const InvestorSessionsCreateForm: React.FC<InvestorSessionsCreateFormType> = ({ timeZone }) => {
  const { conferenceSlug, token } = useAppContext()
  const [eventTimezone] = useState<string>(timeZone)
  const [startsAt, setStartsAt] = useState<string | undefined>()
  const [endsAt, setEndsAt] = useState<string | undefined>()
  const [count, setCount] = useState<number | undefined>()
  const success = useSuccessSnackbar()
  const errorMessage = useErrorSnackbar()

  const styledDateForMutation = (dateString?: string) => {
    if (dateString === undefined || dateString === '') {
      return null
    }
    return moment(dateString).tz(eventTimezone, true).format()
  }

  type InvestorSessionsCreateData = {
    investorSessionsCreate: {
      successMessage: string
      userErrors: UserError[]
    }
  }

  const [investorSessionsCreateMutation] = useMutation<InvestorSessionsCreateData>(
    INVESTOR_SESSIONS_CREATE_MUTATION,
    {
      context: {
        slug: conferenceSlug,
        token,
      },
      onCompleted: ({ investorSessionsCreate }) => {
        if (investorSessionsCreate.userErrors.length) {
          errorMessage(investorSessionsCreate?.userErrors[0].message)
        } else {
          success(investorSessionsCreate?.successMessage)
        }
      },
      refetchQueries: ['EventQuery'],
      variables: {
        investorSessionsCount: count,
        investorSessionsEndsAt: styledDateForMutation(endsAt),
        investorSessionsStartsAt: styledDateForMutation(startsAt),
      },
    }
  )

  return (
    <>
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
