import { ApolloError, useMutation, useQuery } from '@apollo/client'
import moment from 'moment'
import React, { useEffect, useState } from 'react'

import { Button } from '../../lib/components'
import Select from '../../lib/components/atoms/Select'
import { AttendanceAppearanceSelection } from '../../lib/types'
import ATTENDANCE_UPDATE_MUTATION from '../../operations/mutations/AttendanceUpdate'
import EVENT_QUERY from '../../operations/queries/Event'
import { useAppContext } from '../app/AppContext'
import { InputArea } from './AttendanceInvestorSession.styled'

type AttendanceInvestorSessionType = {
  attEndsAt: string
  attStartsAt: string
  attendanceId: string
  refetchSessions: any
  selections: AttendanceAppearanceSelection[]
}

const AttendanceInvestorSession: React.FC<AttendanceInvestorSessionType> = ({
  refetchSessions,
  attStartsAt,
  attEndsAt,
  attendanceId,
  selections = [],
}) => {
  const { conferenceSlug, token } = useAppContext()
  const [newStartsAt, setNewStartsAt] = useState<string | undefined>()
  const [eventTimezone, setEventTimezone] = useState<string>('Europe/Dublin')
  const [selected, setSelected] = useState<boolean | false>()
  const [unlock, setUnlock] = useState<boolean | false>()
  const [buttonTitle, setButtonTitle] = useState<string>('Submit')
  const [status, setStatus] = useState<boolean | undefined>()
  const {
    data,
  }: {
    data?: {
      event: {
        investorSessionsSummary: [
          {
            available: string
            endsAt: string
            startsAt: string
          }
        ]
        timeZone: {
          ianaName: string
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

  const investorSessionsSummary = data?.event.investorSessionsSummary

  const styledDateForMutation = (dateString?: string) => {
    if (dateString === undefined || dateString === '') {
      return null
    }
    return moment(dateString).tz(eventTimezone, true).format()
  }

  const handleUnlock = () => {
    if (attStartsAt !== undefined && selected === undefined) {
      setButtonTitle('Unlock Investor')
      setUnlock(true)
    } else {
      setButtonTitle('Submit')
      setUnlock(false)
    }
  }

  const handleStatus = () => {
    const item = selections.find(item => item.status === "accepted")
    if (item === undefined) {
      setStatus(undefined)
    } else {
      setStatus(true)
    }
  }

  useEffect(() => {
    handleStatus()
    handleUnlock()
    setEventTimezone(data?.event.timeZone.ianaName || 'Europe/Dublin')
  })

  const [attendanceUpdateMutation] = useMutation(ATTENDANCE_UPDATE_MUTATION, {
    context: {
      slug: conferenceSlug,
      token,
    },
    onCompleted: ({ attendanceUpdate }) => {
      const success = attendanceUpdate?.successMessage
      if (success !== null) {
        refetchSessions()
        setSelected(undefined)
      }
      if (attendanceUpdate?.userErrors.length) {
        console.log("Error")
      }
    },
    refetchQueries: ['EventQuery'],
    variables: {
      attendanceId,
      startsAt: styledDateForMutation(newStartsAt),
      unlock,
    },
  })

  const submit = () => {
    attendanceUpdateMutation()
    handleUnlock()
  }

  return (
    <>
      {!status && (
        <InputArea>
          {attStartsAt && (
            <span>
              {moment(attStartsAt).format('dddd')}: {moment(attStartsAt).format('HH:mm')} -{' '}
              {moment(attEndsAt).format('HH:mm')}
            </span>
          )}
          <Select
            onChange={e => {
              setNewStartsAt(e.target.value)
              setSelected(true)
            }}
          >
            <option defaultChecked>Select another available session</option>
            {investorSessionsSummary?.map((item, i) => (
              <option key={i} disabled={item.available === '0'} value={item.startsAt}>
                {moment(item?.startsAt).format('dddd')}: {moment(item?.startsAt).format('HH:mm')} -{' '}
                {moment(item?.endsAt).format('HH:mm')}
              </option>
            ))}
          </Select>
          <Button onClick={submit}>{buttonTitle}</Button>
        </InputArea>
      )}
    </>
  )
}

export default AttendanceInvestorSession
