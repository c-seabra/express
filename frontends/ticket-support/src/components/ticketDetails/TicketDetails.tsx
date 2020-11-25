import { ApolloError, useQuery } from '@apollo/client'
import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import TICKET from '../../operations/queries/Ticket'
import { AppContext, Ticket } from '../app/App'

const ticketDetails: React.FC = () => {
  const { bookingRef } = useParams<{ bookingRef: string }>()
  const { conferenceSlug, token } = useContext(AppContext)

  const {
    loading,
    error,
    data,
  }: {
    data?: {
      ticket: Ticket
    }
    error?: ApolloError
    loading?: boolean
  } = useQuery(TICKET, {
    context: {
      slug: conferenceSlug,
      token,
    },
    variables: {
      reference: bookingRef,
    },
  })

  const ticket = data?.ticket
  const assignment = ticket?.assignment
  const assignee = assignment?.assignee

  return (
    <>
      <h3>Ticket: {bookingRef}</h3>
      {!loading && !error && ticket && (
        <>
          <span>Ticket status: {ticket?.state}</span>

          {assignee && (
            <>
              <h3>Ticket access information</h3>
              <span>Booking reference: {assignee?.email}</span>
              <span>App login email: {assignment?.appLoginEmail || assignee?.email}</span>

              <h3>User account information</h3>
              <span>Identity email: {assignee?.email}</span>
            </>
          )}
          <h3>Ticket operation</h3>
          <span>Lock</span>
        </>
      )}
    </>
  )
}

export default ticketDetails
