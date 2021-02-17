import moment from 'moment'
import React, { useEffect, useState } from 'react'

import { Button, Select } from '../../lib/components'
import { useAttendanceUpdateMutation, useEventQuery } from '../../lib/hooks'
import { AttendanceAppearanceSelection } from '../../lib/types'
import { InputArea } from './AttendanceInvestorSession.styled'

type AttendanceInvestorSessionType = {
  attendanceId: string
  currentEndsAt: string
  currentStartsAt: string
  selections: AttendanceAppearanceSelection[]
}

const AttendanceInvestorSession: React.FC<AttendanceInvestorSessionType> = ({
  currentStartsAt,
  currentEndsAt,
  attendanceId,
  selections = [],
}) => {
  const [newStartsAt, setNewStartsAt] = useState<string | undefined>()
  const [eventTimezone, setEventTimezone] = useState<string>('Europe/Dublin')
  const [selected, setSelected] = useState<boolean | false>()
  const [unlock, setUnlock] = useState<boolean | false>()
  const [buttonTitle, setButtonTitle] = useState<string>('Submit')
  const [status, setStatus] = useState<boolean | undefined>()

  const { data } = useEventQuery()

  const investorSessionsSummary = data?.event.investorSessionsSummary

  const handleUnlock = () => {
    if (currentStartsAt !== undefined && selected === undefined) {
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

  const styledDateForMutation = (dateString?: string) => {
    if (dateString === undefined || dateString === '') {
      return undefined
    }
    return moment(dateString).tz(eventTimezone, true).format()
  }

  useEffect(() => {
    handleStatus()
    handleUnlock()
    setEventTimezone(data?.event.timeZone.ianaName || 'Europe/Dublin')
  })
  const startsAt = styledDateForMutation(newStartsAt)

  const { attendanceUpdateMutation } = useAttendanceUpdateMutation({
    attendanceId,
    eventTimezone,
    startsAt,
    unlock,
  })

  const submit = () => {
    attendanceUpdateMutation()
    handleUnlock()
  }

  return (
    <>
      {!status && (
        <InputArea>
          {currentStartsAt && (
            <span>
              {moment(currentStartsAt).format('dddd')}: {moment(currentStartsAt).format('HH:mm')} -{' '}
              {moment(currentEndsAt).format('HH:mm')}
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
