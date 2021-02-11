import { useMutation, useQuery } from '@apollo/client'
import React, { ReactElement, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'

import { Button, ContainerCard } from '../../lib/components'
import LabeledInput from '../../lib/components/molecules/LabeledInput'
import Loader from '../../lib/Loading'
import { ATTENDANCE_BY_BOOKING_REFERENCE_UPDATE_MUTATION } from '../../operations/mutations/AttendanceByBookingReferenceUpdateMutation'
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
  const [defaultStartupSelections, setDefaultStartupSelections] = useState<number | undefined>()
  const [startupSelections, setStartupSelections] = useState<number | undefined>()
  const [updateError, setUpdateError] = useState<string | undefined>()
  const [updateSuccess, setUpdateSuccess] = useState<string | undefined>()
  const [tickets, setTickets] = useState<Array<Ticket>>([])
  const [bookingReferencesArray, setBookingReferencesArray] = useState<Array<string>>([])
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
      setDefaultStartupSelections(
        data?.event.configuration.investorMeetingConfiguration.defaultStartupSelections
      )
      setStartupSelections(
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
      setBookingReferencesArray([])
    } else {
      const sanitizedBookingReferences = elements
        .split(bookingRefSeparator)
        .filter(id => validBookingRefMatcher.exec(id))
        .map(id => id.toUpperCase())
      setBookingReferencesArray(sanitizedBookingReferences)
    }
  }

  const grantAccess = () => {
    clearMessages()
    setUpdating(true)
    attendanceByBookingReferenceUpdateMutation()
  }

  const [attendanceByBookingReferenceUpdateMutation] = useMutation(
    ATTENDANCE_BY_BOOKING_REFERENCE_UPDATE_MUTATION,
    {
      context: {
        slug: conferenceSlug,
        token,
      },
      onCompleted: ({ attendanceByBookingReferenceUpdate }) => {
        setUpdating(false)
        const success = attendanceByBookingReferenceUpdate?.successMessage
        if (success !== null) {
          setTickets(attendanceByBookingReferenceUpdate?.tickets)
          setUpdateSuccess(attendanceByBookingReferenceUpdate?.successMessage)
          setInvalidBookingReferences(attendanceByBookingReferenceUpdate?.invalidBookingReferences)
        } else {
          setUpdateError(attendanceByBookingReferenceUpdate?.errorMessage)
          setInvalidBookingReferences([])
          setTickets([])
        }
      },
      variables: {
        bookingReferencesArray,
        startupSelections,
      },
    }
  )

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
                  defaultValue={defaultStartupSelections}
                  label={`How many start up selections in investor portal per attendee? (default is ${
                    defaultStartupSelections ? defaultStartupSelections.toString() : ''
                  })`}
                  max="999"
                  min="1"
                  type="number"
                  onChange={e => {
                    setStartupSelections(parseInt(e.target.value, 10))
                  }}
                />
              </SpacingBottom>
              <SpacingBottom>
                {bookingReferencesArray?.length !== 0 && (
                  <Button type="submit">
                    Grant permission to {bookingReferencesArray?.length} Investor
                    {bookingReferencesArray?.length > 1 ? 's' : ''}
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
                      <th>Booking Reference</th>
                      <th>Attendance ID</th>
                      <th>Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tickets.map(ticket => {
                      const { attendanceId, bookingRef, name } = ticket
                      return (
                        <tr key={bookingRef}>
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
