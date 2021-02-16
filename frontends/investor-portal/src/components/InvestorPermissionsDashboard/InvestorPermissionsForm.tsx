import { ApolloError, useMutation } from '@apollo/client'
import React, { ReactElement, useEffect, useState } from 'react'

import { Button } from '../../lib/components'
import LabeledInput from '../../lib/components/molecules/LabeledInput'
import { GRANT_INVESTOR_ACCESS_MUTATION } from '../../operations/mutations/GrantInvestorAccessMutation'
import { useAppContext } from '../app/AppContext'
import { PermissionForm, SpacingBottom } from './InvestorPermissionsDashboard.styled'

type InvestorPermissionsFormProps = {
  defaultSelectionsCount: number | undefined
  setTickets: unknown
}

const InvestorPermissionsForm = ({
  defaultSelectionsCount,
  setTickets,
}: InvestorPermissionsFormProps): ReactElement => {
  type Ticket = {
    attendanceId?: string
    bookingRef: string
    name?: string
  }
  const { conferenceSlug, token } = useAppContext()
  const [startupSelectionsCount, setStartupSelectionsCount] = useState<number | undefined>()
  const [bookingReferences, setBookingReferences] = useState<Array<string>>([])
  const [invalidBookingReferences, setInvalidBookingReferences] = useState<Array<string>>([])
  const [updating, setUpdating] = useState<boolean>(false)

  const validBookingRefMatcher = new RegExp(/[A-Za-z0-9]{4}-[A-Za-z0-9]{1,}/)
  const bookingRefSeparator = new RegExp(/[^A-Za-z0-9-]/)

  const parseBookingReferencesString = (elements: string) => {
    if (elements === '') {
      setBookingReferences([])
    } else {
      const sanitizedBookingReferences = elements
        .split(bookingRefSeparator)
        .filter(id => validBookingRefMatcher.exec(id))
        .map(id => id.toUpperCase())
      setBookingReferences(sanitizedBookingReferences)
    }
  }

  const [grantInvestorAccess] = useMutation(GRANT_INVESTOR_ACCESS_MUTATION, {
    context: {
      slug: conferenceSlug,
      token,
    },
    onCompleted: ({ grantInvestorAccessMutation }) => {
      setUpdating(false)
      const success = grantInvestorAccessMutation?.successMessage
      if (success !== null) {
        setTickets(grantInvestorAccessMutation?.tickets)
        // setUpdateSuccess(grantInvestorAccessMutation?.successMessage)
        setInvalidBookingReferences(grantInvestorAccessMutation?.invalidBookingReferences)
      }
      if (grantInvestorAccessMutation?.errors.length) {
        // setUpdateError(grantInvestorAccessMutation?.errors[0].message)
        setInvalidBookingReferences([])
        setTickets([])
      }
    },
    onError: (err: ApolloError) => {
      console.log(err)

      setInvalidBookingReferences([])
      setTickets([])
      // setUpdateError(err.toLocaleString())
      setUpdating(false)
    },
    variables: {
      bookingReferences,
      startupSelectionsCount,
    },
  })

  const grantAccess = () => {
    setUpdating(true)
    grantInvestorAccess()
  }

  useEffect(() => {
    if (defaultSelectionsCount) {
      setStartupSelectionsCount(defaultSelectionsCount)
    }
  }, [defaultSelectionsCount])

  return (
    <>
      <PermissionForm
        onSubmit={e => {
          e.preventDefault()
          grantAccess()
        }}
      >
        <SpacingBottom>
          <LabeledInput
            label="Insert a booking reference(s) as pasted from single spreadsheet column:"
            type="textarea"
            onBlur={e => {
              parseBookingReferencesString(e.target.value)
            }}
            onChange={e => {
              parseBookingReferencesString(e.target.value)
            }}
          />
        </SpacingBottom>
        <SpacingBottom>
          <LabeledInput
            className="shortInput"
            defaultValue={defaultSelectionsCount}
            label={`How many start up selections in investor portal per attendee? (default is ${
              defaultSelectionsCount ? defaultSelectionsCount.toString() : ''
            })`}
            max="999"
            min="1"
            type="number"
            onChange={e => {
              setStartupSelectionsCount(parseInt(e.target.value, 10))
            }}
          />
        </SpacingBottom>
        <SpacingBottom>
          {bookingReferences?.length !== 0 && (
            <Button type="submit">
              Grant access to {bookingReferences?.length} Investor
              {bookingReferences?.length > 1 ? 's' : ''}
            </Button>
          )}
        </SpacingBottom>
        <SpacingBottom>
          {invalidBookingReferences?.length > 0 && (
            <>
              <strong>Invalid booking references {invalidBookingReferences?.length}:</strong>
              <p>{invalidBookingReferences?.join(' ')}</p>
            </>
          )}
        </SpacingBottom>
      </PermissionForm>
    </>
  )
}

export default InvestorPermissionsForm
