import { ApolloError, useMutation, useQuery } from '@apollo/client'
import moment from 'moment'
import React, { useEffect, useState } from 'react'

import { Button } from '../../lib/components'
import Select from '../../lib/components/atoms/Select'
import ATTENDANCE_UPDATE_MUTATION from '../../operations/mutations/AttendanceUpdate'
import EVENT_QUERY from '../../operations/queries/Event'
import { useAppContext } from '../app/AppContext'
import { InputArea } from './AttendanceInvestorSession.styled'

type AttendanceInvestorSessionType = {
  attEndsAt: string
  attStartsAt: string
  attendanceId: string
  refetchSessions: any
}

const AttendanceInvestorSession: React.FC<AttendanceInvestorSessionType> = ({
  refetchSessions,
  attStartsAt,
  attEndsAt,
  attendanceId,
}) => {
  const { conferenceSlug, token } = useAppContext()
  const [newStartsAt, setNewStartsAt] = useState<string | undefined>()
  const [eventTimezone, setEventTimezone] = useState<string>('Europe/Dublin')
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

  useEffect(() => {
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
        console.log('success')
      }
      if (attendanceUpdate?.userErrors.length) {
        console.log('error')
      }
    },
    variables: {
      attendanceId: attendanceId,
      startsAt: styledDateForMutation(newStartsAt),
    },
  })

  const submit = () => {
    attendanceUpdateMutation()
  }

  return (
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
        }}
      >
        <option selected>Select another available session</option>
        {investorSessionsSummary?.map((item, i) => (
          <option key={i} disabled={item.available === '0'} value={item.startsAt}>
            {moment(item?.startsAt).format('dddd')}: {moment(item?.startsAt).format('HH:mm')} -{' '}
            {moment(item?.endsAt).format('HH:mm')}
          </option>
        ))}
      </Select>
      <Button onClick={submit}>Submit</Button>
    </InputArea>
  )
}

export default AttendanceInvestorSession
