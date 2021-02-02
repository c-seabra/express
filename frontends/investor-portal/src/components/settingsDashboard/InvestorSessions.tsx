import { useMutation, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import moment from 'moment';
import 'moment-timezone';

import { Button } from '../../lib/components'
import INVESTOR_SESSIONS_UPDATE_MUTATION from '../../operations/mutatuions/InvestorSessionsUpdate'
import { useAppContext } from '../app/AppContext'
import LabeledInput from '../../lib/components/molecules/LabeledInput'


const InvestorSessions: React.FC = () => {
  const { conferenceSlug, token } = useAppContext()
  const [eventTimezone, setEventTimezone] = useState<string>('Europe/Dublin')

  const [startDate, setStartDate] = useState<string | undefined>()
  const [endDate, setEndDate] = useState<string | undefined>()
  const [count, setCount] = useState<number | undefined>()
  const [mutationSuccessMessage, setMutationSuccessMessage] = useState<string | undefined>()
  const [mutationError, setMutationError] = useState<string | undefined>()

  const usableDateString = (dateString: string | undefined) => {
    if (dateString === undefined || dateString === null) {
      return undefined
    }

    let str = dateString
    return moment(str).utcOffset(str).format('YYYY-MM-DDTHH:mm')
  }

  const styledDateForMutation = (dateString?: string) => {
    if (dateString === undefined) {
      return null
    }
    return moment(dateString).tz(eventTimezone, true).format()
  }


  useEffect(() => {
    setStartDate(usableDateString(startDate))
    setEndDate(usableDateString(endDate))
    setCount(count)
  },[])

  const [investorSessionsUpdateMutation] = useMutation(INVESTOR_SESSIONS_UPDATE_MUTATION, {
    context: {
      slug: conferenceSlug,
      token,
    },
    onCompleted: ({ investorSessionsUpdate }) => {
      if (investorSessionsUpdate?.successMessage.length) {
        setMutationSuccessMessage(investorSessionsUpdate?.successMessage)
        setMutationError('')
      }
      if (investorSessionsUpdate?.userErrors.length) {
        setMutationError(investorSessionsUpdate?.userErrors[0])
      }
    },
    variables: {
      investorSessionsStartDate: startDate,
      investorSessionsEndDate: endDate,
      investorSessionsCount: count
    },
  })

  const submitForm = () => {
    investorSessionsUpdateMutation()
  }

  return (
    <div>
                <h2>session dates</h2>
                <LabeledInput
                  defaultValue={startDate}
                  label="session starts"
                  type="datetime-local"
                  onChange={e => {setStartDate(e.target.value)}}
                />

                <LabeledInput
                  defaultValue={endDate}
                  label="session ends"
                  type="datetime-local"
                  onChange={e => {setEndDate(e.target.value)}}
                />

                <LabeledInput
                  defaultValue={count}
                  label="count"
                  type="number"
                  onChange={e => {setCount(parseInt(e.target.value))}}
              />
      <div>
        <Button onClick={submitForm}>ADD SESSION</Button>
      </div>
    </div>
  )
}

export default InvestorSessions
