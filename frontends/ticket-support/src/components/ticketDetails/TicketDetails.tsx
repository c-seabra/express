import { ApolloError, useQuery } from '@apollo/client'
import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'

import TICKET from '../../operations/queries/Ticket'
import { AppContext, Ticket } from '../app/App'
import { getAssignmentBadge, getTicketBadge } from '../ticketItem/TicketHelper'
import TicketAssign from '../ticketActions/TicketAssign'
import TicketUnlock from '../ticketActions/TicketUnlock'

const Heading = styled.div`
  border-radius: 8px;
  padding-top: 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  font-weight: bold;
`

const Text = styled.div`
  border-radius: 8px;
  padding: .25rem;
  font-size: 1rem;
  font-weight: 400;
`

const Badge = styled.div`
  width: fit-content;
`

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
  const ticketBadge = getTicketBadge(ticket?.state)
  const assignmentBadge = getAssignmentBadge(ticket?.state)

  return (
    <div>
      <Heading>Ticket: {bookingRef}</Heading>
      {!loading && !error && ticket && (
        <div>
          <div>
            <Heading>Ticket status:</Heading>
            <Badge>{ticketBadge}</Badge>
            <Heading>Assignment status:</Heading>
            <Badge>{assignmentBadge}</Badge>

            {ticket && !assignment && (
              <div>
                <Heading>Assign ticket:</Heading>
                <TicketAssign ticketId={ticket.id} resetReassignment={setReassignment} />
              </div>
            )}
          </div>

            {assignee && (
              <div>
                <Heading>Assignee details</Heading>
                <Text>Name: {assignee.firstName} {assignee.lastName}</Text>
                <Text>Email: {assignee.email}</Text>
                {ticket && reassignment && (
                  <div>
                    <Heading>Reassign ticket</Heading>
                    <TicketAssign ticketId={ticket.id} resetReassignment={setReassignment} />
                  </div>
                )}
                <Button onClick={() => setReassignment(!reassignment)}>
                  {reassignment ? 'Cancel' : 'Reassign'}
                </Button>

                <Heading>Ticket access information</Heading>
                <Text>Booking reference: {assignee?.email}</Text>
                <Text>App login email: {assignment?.appLoginEmail || assignee?.email}</Text>

                <Heading>User account information</Heading>
                <Text>Identity email: {assignee?.email}</Text>
              </div>
            )}
            <div>
              <Heading>Ticket operation</Heading>
              {ticket.state === 'LOCKED' && <TicketUnlock bookingRef={ticket?.bookingRef} />}
            </div>
        </div>
      )}
    </div>
  )
}

export default ticketDetails
