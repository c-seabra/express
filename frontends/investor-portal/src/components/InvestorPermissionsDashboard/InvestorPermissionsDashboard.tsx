import { ApolloError, useMutation, useQuery } from '@apollo/client'
import React, { ReactElement, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'

import { Button, ContainerCard, Icon } from '../../lib/components'
import LabeledInput from '../../lib/components/molecules/LabeledInput'
import Loader from '../../lib/Loading'
import { GRANT_INVESTOR_ACCESS_MUTATION } from '../../operations/mutations/GrantInvestorAccessMutation'
import { EVENT_QUERY } from '../../operations/queries/Event'
import { useAppContext } from '../app/AppContext'
import Success from '../settingsActions/Success'
import Warning from '../settingsActions/Warning'
import {
  PageContainer,
  PermissionForm,
  SpacingBottom,
  StripedTable,
} from './InvestorPermissionsDashboard.styled'

const InvestorPermissionsDashboard = (): ReactElement => {
  type Ticket = {
    attendanceId?: string
    bookingRef: string
    name?: string
  }
  const [updating, setUpdating] = useState<boolean>(false)
  const { conferenceSlug, token } = useAppContext()
  const [defaultStartupSelectionsCount, setDefaultStartupSelectionsCount] = useState<
    number | undefined
  >()
  const [startupSelectionsCount, setStartupSelectionsCount] = useState<number | undefined>()
  const [updateError, setUpdateError] = useState<string | undefined>()
  const [updateSuccess, setUpdateSuccess] = useState<string | undefined>()
  const [tickets, setTickets] = useState<Array<Ticket>>([])
  const [bookingReferences, setBookingReferences] = useState<Array<string>>([])
  const [invalidBookingReferences, setInvalidBookingReferences] = useState<Array<string>>([])

  const [showDetails, setShowDetails] = useState<boolean>(false)
  const toggleDetails = () => setShowDetails(show => !show)

  const validBookingRefMatcher = new RegExp(/[A-Za-z0-9]{4}-[A-Za-z0-9]{1,}/)
  const bookingRefSeparator = new RegExp(/[^A-Za-z0-9-]/)

  const { loading, error, data } = useQuery(EVENT_QUERY, {
    context: {
      slug: conferenceSlug,
      token,
    },
  })

  useEffect(() => {
    if (data) {
      setDefaultStartupSelectionsCount(
        data?.event.configuration.investorMeetingConfiguration.defaultStartupSelections
      )
      setStartupSelectionsCount(
        data?.event.configuration.investorMeetingConfiguration.defaultStartupSelections
      )
    }
  }, [data])

  const clearMessages = () => {
    setUpdateError('')
    setUpdateSuccess('')
  }

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

  const grantAccess = () => {
    clearMessages()
    setUpdating(true)
    grantInvestorAccess()
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
        setUpdateSuccess(grantInvestorAccessMutation?.successMessage)
        setInvalidBookingReferences(grantInvestorAccessMutation?.invalidBookingReferences)
      }
      if (grantInvestorAccessMutation?.errors.length) {
        setUpdateError(grantInvestorAccessMutation?.errors[0].message)
        setInvalidBookingReferences([])
        setTickets([])
      }
    },
    onError: (err: ApolloError) => {
      setInvalidBookingReferences([])
      setTickets([])
      setUpdateError(err.toLocaleString())
      setUpdating(false)
    },
    variables: {
      bookingReferences,
      startupSelectionsCount,
    },
  })

  return (
    <>
      <Helmet>
        <title>Investor permissions</title>
      </Helmet>
      <PageContainer>
        {(updating || loading) && <Loader />}
        {(error || updateError) && (
          <Warning>
            <span>{error ? error.message : updateError}</span>
          </Warning>
        )}
        {updateSuccess && (
          <Success>
            <span>{updateSuccess}</span>
          </Success>
        )}
        <ContainerCard color="#555" title="Investor portal permissions">
          <h4>Give investors permission to access the Investor Portal.</h4>
          <SpacingBottom>
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
                  defaultValue={defaultStartupSelectionsCount}
                  label={`How many start up selections in investor portal per attendee? (default is ${
                    defaultStartupSelectionsCount ? defaultStartupSelectionsCount.toString() : ''
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
                {tickets?.length !== 0 && (
                  <Button
                    type="button"
                    onClick={() => {
                      toggleDetails()
                    }}
                  >
                    Toggle detail panel
                  </Button>
                )}
              </SpacingBottom>
              <SpacingBottom>
                {invalidBookingReferences?.length > 0 && (
                  <>
                    <strong>
                      Invalid booking references for event ({invalidBookingReferences?.length} of{' '}
                      {tickets?.length}):
                    </strong>
                    <p>{invalidBookingReferences?.join(' ')}</p>
                  </>
                )}
              </SpacingBottom>
              <SpacingBottom hidden={!showDetails}>
                <StripedTable>
                  <thead>
                    <tr>
                      <th colSpan={2}>Booking Reference</th>
                      <th>Attendance ID</th>
                      <th>Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tickets.map(ticket => {
                      const { attendanceId, bookingRef, name } = ticket
                      return (
                        <tr key={bookingRef}>
                          <td className={attendanceId ? 'icon success' : 'icon fail'}>
                            <Icon>{attendanceId ? 'check' : 'close'}</Icon>
                          </td>
                          <td>{bookingRef}</td>
                          <td>{attendanceId}</td>
                          <td>{name}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </StripedTable>
              </SpacingBottom>
            </PermissionForm>
          </SpacingBottom>
        </ContainerCard>
      </PageContainer>
    </>
  )
}

export default InvestorPermissionsDashboard
