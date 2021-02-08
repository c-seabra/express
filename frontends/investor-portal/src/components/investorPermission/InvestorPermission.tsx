import { ApolloError, useMutation, useQuery } from '@apollo/client'
import React, { ReactElement, useEffect, useState } from 'react'

import { Button } from '../../lib/components'
import ContainerCard from '../../lib/components/atoms/ContainerCard'
import LabeledInput from '../../lib/components/molecules/LabeledInput'
import Loader from '../../lib/Loading'
import { ATTENDANCE_BY_BOOKING_REFERENCE_UPDATE_MUTATION } from '../../operations/mutations/AttendanceByBookingReferenceUpdateMutation'
import { EVENT_QUERY } from '../../operations/queries/Event'
import { useAppContext } from '../app/AppContext'
import Success from '../settingsActions/Success'
import Warning from '../settingsActions/Warning'
import { PermissionForm, SpacingBottom } from './InvestorPermission.styled'

const InvestorPermission = (): ReactElement => {
  const { conferenceSlug, token } = useAppContext()
  const [defaultStartupSelections, setDefaultStartupSelections] = useState<number | undefined>()
  const [startupSelections, setStartupSelections] = useState<number | undefined>()
  const [bookingReferencesArray, setBookingReferencesArray] = useState<Array<string>>([])
  const [validBookingReferences, setValidBookingReferences] = useState<Array<string>>([])
  const [invalidBookingReferences, setInvalidBookingReferences] = useState<Array<string>>([])
  const [bookingReferencesArraySize, setBookingReferencesArraySize] = useState<number>(0)
  const [mutationSuccessMessage, setMutationSuccessMessage] = useState<string | undefined>()
  const [mutationError, setMutationError] = useState<string | undefined>()

  const validBookingRefMatcher = new RegExp(/[A-Z0-9]{4}-[A-Z0-9]{1,}/)
  const bookingRefSeparator = new RegExp(/[^A-Z0-9-]/)

  const [showList, setShowList] = useState<boolean>(false)
  const toggleList = () => setShowList(display => !display)

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

  const sanitizeBookingReferencesArray = (elements: string) => {
    if (elements === '') {
      setBookingReferencesArray([])
      setBookingReferencesArraySize(0)
    } else {
      const sanitizedElements = elements
        .split(bookingRefSeparator)
        .filter(id => validBookingRefMatcher.exec(id))
      setBookingReferencesArray(sanitizedElements)
      setBookingReferencesArraySize(bookingReferencesArray?.length)
    }
  }

  const [attendanceByBookingReferenceUpdateMutation] = useMutation(
    ATTENDANCE_BY_BOOKING_REFERENCE_UPDATE_MUTATION,
    {
      context: {
        slug: conferenceSlug,
        token,
      },
      onCompleted: ({ attendanceByBookingReferenceUpdate }) => {
        const success = attendanceByBookingReferenceUpdate?.successMessage
        if (success !== null) {
          setMutationSuccessMessage(attendanceByBookingReferenceUpdate?.successMessage)
          setMutationError('')
          setValidBookingReferences(attendanceByBookingReferenceUpdate?.validBookingReferences)
          setInvalidBookingReferences(attendanceByBookingReferenceUpdate?.invalidBookingReferences)
        } else {
          setMutationSuccessMessage('')
          setMutationError(attendanceByBookingReferenceUpdate?.errorMessage)
          setValidBookingReferences([])
          setInvalidBookingReferences([])
        }
      },
      variables: {
        bookingReferencesArray,
        startupSelections,
      },
    }
  )

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

  return (
    <>
      {loading && <Loader />}
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
      <ContainerCard color="#555" title="Grant access to the investor portal">
        <SpacingBottom>
          <PermissionForm
            onSubmit={e => {
              e.preventDefault()
              setMutationSuccessMessage('')
              setMutationError('')
              attendanceByBookingReferenceUpdateMutation()
            }}
          >
            <LabeledInput
              label="Insert Booking Reference(s) as pasted from single spreadsheet column:"
              type="text"
              onBlur={e => {
                sanitizeBookingReferencesArray(e.target.value)
              }}
              onChange={e => {
                sanitizeBookingReferencesArray(e.target.value)
              }}
            />
            <LabeledInput
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
            {bookingReferencesArraySize > 0 && (
              <>
                <Button type="submit">Grant Investor access ({bookingReferencesArraySize})</Button>
                <Button type="button" onClick={toggleList}>
                  Toggle detail panel
                </Button>
              </>
            )}
          </PermissionForm>
        </SpacingBottom>
        <SpacingBottom>
          {showList && (
            <ul>
              {bookingReferencesArray?.map(el => (
                <li
                  key={el}
                  className={`${validBookingReferences?.indexOf(el) > -1 ? 'valid' : ''} ${
                    invalidBookingReferences?.indexOf(el) > -1 ? 'invalid' : ''
                  }`}
                >
                  {el}
                </li>
              ))}
            </ul>
          )}
          {showList && invalidBookingReferences?.length > 0 && (
            <ul>
              <li>Rejected Booking Reference(s): {invalidBookingReferences?.join(' ')}</li>
            </ul>
          )}
        </SpacingBottom>
      </ContainerCard>
    </>
  )
}

export default InvestorPermission
