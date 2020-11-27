import { ApolloError, useQuery } from '@apollo/client'
import React, { useContext, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import StatePlate from '../ticketItem/StatePlate'
import TicketClaim from '../ticketActions/TicketClaim'

import TICKET from '../../operations/queries/Ticket'
import { AppContext, Ticket } from '../app/App'
import TicketAssign from '../ticketActions/TicketAssign'
import TicketUnlock from '../ticketActions/TicketUnlock'
import UpdateAppLoginEmail from '../ticketActions/UpdateAppLoginEmail'

const StlyedContainer = styled.section`
  padding: 1rem;
  max-width: 1440px;
  margin: 0 auto;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid grey;
  hr {
    border-color: 1px solid grey;
  }
`

const Heading = styled.div`
  border-radius: 8px;
  padding-top: 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  font-weight: bold;
  span {
    color: #00ac93;
  }
`

const Text = styled.div`
  border-radius: 8px;
  padding: .25rem;
  font-size: 1rem;
  font-weight: 400;
`

export const Button = styled.button`
  margin: 0 0 1rem;
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
const TicketHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const TicketStatus = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  font-size: .85rem;
  margin-right: .75rem;
  > span {
    margin-bottom: .25rem;
  }
`
const TicketStatusBar = styled.div`
  display: flex;
  align-items: center;
`

const ticketDetails: React.FC = () => {
  const { bookingRef } = useParams<{ bookingRef: string }>()
  const history = useHistory()
  const { conferenceSlug, token } = useContext(AppContext)
  const [reassignment, setReassignment] = useState(false)
  const [loginEmailChange, setLoginEmailChange] = useState(false)

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
    <StlyedContainer>
      <TicketHeader>
        <Heading><Button type="button"  onClick={() => history.goBack()}>Back</Button> Manage Ticket/<span>{bookingRef}</span></Heading>
        <TicketStatusBar>
          <TicketStatus>
            <span>Ticket status</span>
            <StatePlate state={ticket?.state as string}/>
          </TicketStatus>
          <TicketStatus>
            <span>Assignment status</span>
            <StatePlate state={!assignment ? 'Unassigned' : assignment?.state as string} />
          </TicketStatus>
        </TicketStatusBar>
      </TicketHeader>
      <hr/>
      {!loading && !error && ticket && (
        <div>
            {ticket && ticket.state !== 'VOID' && !assignment && (
              <>
                <div>
                  <Heading>Assign ticket:</Heading>
                  <TicketAssign ticketId={ticket.id} resetReassignment={setReassignment} />
                </div>
                <hr/>
              </>
            )}

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
                {ticket.state !== 'VOID' && (
                  <Button onClick={() => setReassignment(!reassignment)}>
                    {reassignment ? 'Cancel' : 'Reassign'}
                  </Button>
                )}

                <hr/>

                <Heading>Ticket access information</Heading>
                <Text>Booking reference: {bookingRef}</Text>
                {assignment?.state === 'ACCEPTED' && (
                  <>
                    <Text>App login email: {assignment?.appLoginEmail || assignee?.email}</Text>
                    {loginEmailChange && (
                      <UpdateAppLoginEmail bookingRef={bookingRef} resetLoginEmailChange={setLoginEmailChange}/>
                    )}
                    <Button onClick={() => setLoginEmailChange(!loginEmailChange)}>
                      {loginEmailChange ? 'Cancel' : 'Update App Login Email'}
                    </Button>
                  </>
                )}

                <hr/>

                <Heading>User account information</Heading>
                <Text>Identity email: {assignee?.email}</Text>


              </div>
            )}
            {ticket.state === 'LOCKED' || (assignment && assignment.state !== 'ACCEPTED' && ticket.state !== 'VOID') && (
              <div>
                <hr/>
                <Heading>Ticket operation</Heading>
                {ticket.state === 'LOCKED' && <TicketUnlock bookingRef={ticket?.bookingRef} />}
                {assignment && assignment.state !== 'ACCEPTED' && ticket.state !== 'VOID' && (
                  <div>
                    <TicketClaim ticketId={ticket.id} />
                  </div>
                )}
              </div>
            )}
        </div>
      )}
    </StlyedContainer>
  )
}

export default ticketDetails
