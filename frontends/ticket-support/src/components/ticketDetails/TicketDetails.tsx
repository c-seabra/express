import { ApolloError, useQuery } from '@apollo/client'
import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'

import TICKET from '../../operations/queries/Ticket'
import { AppContext, Ticket } from '../app/App'
import TicketUnlock from '../ticketUnlock/TicketUnlock'
import AssignTicket from '../ticketActions/AssignTicket'

const Button = styled.button`
  margin: 1rem 0;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: none;
  border: 1px solid grey;
  background: white;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    background-color: grey;
    color: white;
  }
`

const ticketDetails: React.FC = () => {
  const { bookingRef } = useParams<{ bookingRef: string }>()
  const { conferenceSlug, token } = useContext(AppContext)
  const [reassignment, setReassignment] = useState(false)

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
          <span>Ticket status: {ticket.state}</span>

          {ticket && !assignment && (
            <AssignTicket ticketId={ticket.id} resetReassignment={setReassignment} />
          )}

          {assignee && (
            <>
              <h3>Ticket access information</h3>
              <span>Booking reference: {assignee?.email}</span>
              <span>App login email: {assignment?.appLoginEmail || assignee?.email}</span>

              <Button onClick={() => setReassignment(!reassignment)}>
                {reassignment ? 'Cancel' : 'Reassign'}
              </Button>
              {ticket && reassignment && (
                <AssignTicket ticketId={ticket.id} resetReassignment={setReassignment} />
              )}

              <h3>User account information</h3>
              <span>Identity email: {assignee?.email}</span>
            </>
          )}
          <h3>Ticket operation</h3>
          {ticket.state === 'LOCKED' && <TicketUnlock bookingRef={ticket?.bookingRef} />}
        </>
      )}
    </>
  )
}

export default ticketDetails
