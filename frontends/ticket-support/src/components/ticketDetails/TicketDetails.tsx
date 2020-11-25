import { ApolloError, useQuery } from '@apollo/client'
import React, { useContext } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import TICKET from '../../operations/queries/Ticket'
import { AppContext, Ticket } from '../app/App'
import StatePlate from '../ticketItem/StatePlate'
import ClaimTicket from './ClaimTicketButton'

const ticketDetails: React.FC = () => {
  const { bookingRef } = useParams<{ bookingRef: string }>()
  const history = useHistory()
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
      <button type="button"  onClick={() => history.goBack()}>Back</button>
      <h3>Ticket: {bookingRef}</h3>
      {!loading && !error && ticket && (
        <>
          <div>
            Ticket status: <StatePlate state={ticket?.state}/>
          </div>
          <div>Assignment status: <StatePlate state={!ticket.assignment ? 'Unassigned' : assignment?.state as string} /></div>

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

          <div>
            <ClaimTicket ticketId={ticket.id} />
          </div>
        </>
      )}
    </>
  )
}

export default ticketDetails
