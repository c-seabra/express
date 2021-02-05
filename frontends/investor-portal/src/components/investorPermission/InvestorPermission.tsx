import { ApolloError, useMutation, useQuery } from '@apollo/client'
import React, { ReactElement, useEffect, useState } from 'react'

import ContainerCard from '../../lib/components/atoms/ContainerCard'
import LabeledInput from '../../lib/components/molecules/LabeledInput'
import Loader from '../../lib/Loading'
import { ATTENDANCE_BATCH_UPDATE_MUTATION } from '../../operations/mutatuions/AttendaceBatchUpdate'
import { EVENT_QUERY } from '../../operations/queries/Event'
import { useAppContext } from '../app/AppContext'
import Success from '../settingsActions/Success'
import Warning from '../settingsActions/Warning'
import { PermissionForm } from './InvestorPermission.styled'

const InvestorPermission = (): ReactElement => {
  const { conferenceSlug, token } = useAppContext()
  const [defaultStartupSelections, setDefaultStartupSelections] = useState<number | undefined>()
  const [startupSelections, setStartupSelections] = useState<number | undefined>()
  const [attendanceIDArray, setAttendanceIDArray] = useState<Array<string>>([])
  const [attendanceIDArraySize, setAttendanceIDArraySize] = useState<number>(0)
  const [mutationSuccessMessage, setMutationSuccessMessage] = useState<string | undefined>()
  const [mutationError, setMutationError] = useState<string | undefined>()

  const UUIDRegex = new RegExp(
    /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
  )
  const [showList, setShowList] = useState<boolean>(false)
  const toggleList = () => setShowList(s => !s)

  const sanitizeAttendanceIDArray = (ids: string) => {
    if (ids === '') {
      setAttendanceIDArray([])
      setAttendanceIDArraySize(0)
    } else {
      const sanitizedIds = ids.split(/[^0-9a-f-]+/).filter(id => id.match(UUIDRegex))
      setAttendanceIDArray(sanitizedIds)
      setAttendanceIDArraySize(attendanceIDArray?.length)
    }
  }

  const [attendanceBatchUpdateMutation] = useMutation(ATTENDANCE_BATCH_UPDATE_MUTATION, {
    context: {
      slug: conferenceSlug,
      token,
    },
    onCompleted: ({ eventUpdate }) => {
      if (eventUpdate?.successMessage.length) {
        setMutationSuccessMessage(eventUpdate?.successMessage)
        setMutationError('')
      }
      if (eventUpdate?.userErrors.length) {
        setMutationError(eventUpdate?.userErrors[0])
      }
    },
    variables: {
      attendanceIDArray,
      startupSelections,
    },
  })

  const batchUpdateAttendance = () => {
    attendanceBatchUpdateMutation()
  }

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
      <ContainerCard color="#555" title="Grant access to the investor portal">
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
        <PermissionForm
          onSubmit={e => {
            e.preventDefault()
            batchUpdateAttendance()
          }}
        >
          <LabeledInput
            label="Insert attendance ID(s) as pasted from single spreadsheet column:"
            type="text"
            onKeyUp={e => {
              sanitizeAttendanceIDArray(e.target.value)
            }}
          />
          <LabeledInput
            defaultValue={defaultStartupSelections}
            label={`Startup selections (default is ${defaultStartupSelections?.toString()})`}
            type="number"
            onChange={e => {
              setStartupSelections(parseInt(e.target.value, 10))
            }}
          />
        </PermissionForm>
        {attendanceIDArraySize > 0 && (
          <>
            <button type="button" onClick={batchUpdateAttendance}>
              submit {attendanceIDArraySize}
            </button>
            <button type="button" onClick={toggleList}>
              toggle detail
            </button>
          </>
        )}

        {showList && (
          <ol>
            {attendanceIDArray?.map(el => (
              <li key={el}>{el}</li>
            ))}
          </ol>
        )}
      </ContainerCard>
    </>
  )
}

export default InvestorPermission
