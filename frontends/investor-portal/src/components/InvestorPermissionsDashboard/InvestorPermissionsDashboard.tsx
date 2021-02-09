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
  type Attendance = {
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
  const [attendances, setAttendances] = useState<Array<Attendance>>([])
  const [bookingReferencesArray, setBookingReferencesArray] = useState<Array<string>>([])
  const [invalidBookingReferences, setInvalidBookingReferences] = useState<Array<string>>([])

  const [showDetails, setShowDetails] = useState<boolean>(false)
  const toggleDetails = () => setShowDetails(show => !show)

  const validBookingRefMatcher = new RegExp(/[A-Z0-9]{4}-[A-Z0-9]{1,}/)
  const bookingRefSeparator = new RegExp(/[^A-Z0-9-]/)

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
          setAttendances(attendanceByBookingReferenceUpdate?.attendances)
          setUpdateSuccess(attendanceByBookingReferenceUpdate?.successMessage)
          setInvalidBookingReferences(attendanceByBookingReferenceUpdate?.invalidBookingReferences)
        } else {
          setUpdateError(attendanceByBookingReferenceUpdate?.errorMessage)
          setInvalidBookingReferences([])
          setAttendances([])
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
          <h4>
            Give investors permission to access the Investor Portal. Use &quot;0&quot; as
            &quot;Startup selections&quot; to revoke access.
          </h4>
          <SpacingBottom>
            <PermissionForm
              onSubmit={e => {
                e.preventDefault()
                grantAccess()
              }}
            >
              <SpacingBottom className="largeInput">
                <LabeledInput
                  label="Insert Booking Reference(s) as pasted from single spreadsheet column:"
                  type="text"
                  onBlur={e => {
                    parseBookingReferencesString(e.target.value)
                  }}
                  onChange={e => {
                    parseBookingReferencesString(e.target.value)
                  }}
                />
              </SpacingBottom>
              <SpacingBottom className="smallInput">
                <LabeledInput
                  className="shortInput"
                  defaultValue={defaultStartupSelections}
                  label={`Startup selections (default is ${
                    defaultStartupSelections ? defaultStartupSelections.toString() : ''
                  })`}
                  max="999"
                  min="0"
                  type="number"
                  onChange={e => {
                    setStartupSelections(parseInt(e.target.value, 10))
                  }}
                />
              </SpacingBottom>
              <SpacingBottom className="buttons">
                <Button
                  type="button"
                  onClick={() => {
                    toggleDetails()
                  }}
                >
                  Toggle detail panel
                </Button>
                {bookingReferencesArray?.length !== 0 && (
                  <Button type="submit">
                    Grant permission to {bookingReferencesArray?.length} Investor
                    {bookingReferencesArray?.length > 1 ? 's' : ''}{' '}
                  </Button>
                )}
              </SpacingBottom>
              <SpacingBottom className="listing" hidden={!showDetails}>
                <StripedTable>
                  {invalidBookingReferences?.length > 0 && (
                    <caption>
                      <strong>
                        Invalid booking references for event ({invalidBookingReferences?.length} of{' '}
                        {attendances?.length}):
                      </strong>
                      <p>{invalidBookingReferences?.join(' ')}</p>
                    </caption>
                  )}
                  <thead>
                    <tr>
                      <th>Booking Reference</th>
                      <th>Attendance ID</th>
                      <th>Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendances.map(attendance => {
                      const { attendanceId, bookingRef, name } = attendance
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
