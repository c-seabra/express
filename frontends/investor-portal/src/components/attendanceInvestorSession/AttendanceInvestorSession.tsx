import { ApolloError, useQuery } from '@apollo/client'
import moment from 'moment'
import React from 'react'

import Select from '../../lib/components/atoms/Select'
import EVENT_QUERY from '../../operations/queries/Event'
import { useAppContext } from '../app/AppContext'

const AttendanceInvestorSession: React.FC = () => {
  const { conferenceSlug, token } = useAppContext()
  const {
    data,
    error,
    loading,
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

  return (
    <>
      <Select>
        <option selected>Select another available session</option>
        {investorSessionsSummary?.map((item, i) => (
          <option disabled={item.available === '0'} value={item.startsAt} key={i}>
            {moment(item?.startsAt).format('dddd')}: {moment(item?.startsAt).format('HH:mm')} -{' '}
            {moment(item?.endsAt).format('HH:mm')}
          </option>
        ))}
      </Select>
    </>
  )
}

export default AttendanceInvestorSession
