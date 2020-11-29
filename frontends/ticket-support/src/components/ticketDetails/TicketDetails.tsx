import { ApolloError, useMutation, useQuery } from '@apollo/client'
import React, { useContext, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import StatePlate from '../ticketItem/StatePlate'
import TicketClaim from '../ticketActions/TicketClaim'

import TICKET from '../../operations/queries/Ticket'
import { AppContext, Ticket } from '../app/App'
import IdentityEmailUpdate from '../ticketActions/IdentityEmailUpdate'
import TicketAssign from '../ticketActions/TicketAssign'
import TicketUnlock from '../ticketActions/TicketUnlock'
import UpdateAppLoginEmail from '../ticketActions/UpdateAppLoginEmail'
import LoginLinkRequest from '../ticketActions/LoginLinkRequest'

const StlyedContainer = styled.section`
  padding: 1rem;
  max-width: 1440px;
  margin: 0 auto;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid grey;
  hr {
    border-color: grey;
  }
`

const Heading = styled.div`
  border-radius: 8px;
  padding-top: 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  font-weight: bold;
  button {
    margin-right: 1rem;
  }
  span {
    color: #00ac93;
  }
`

export const Text = styled.div`
  border-radius: 8px;
  padding: 0.25rem;
  font-size: 1rem;
  font-weight: 400;
  a {
    color: #337ab7;
    margin: 0 0.25rem;
  }
`

const TextHighlight = styled.span`
  color: #337ab7;
  margin: 0 0.25rem;
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
  font-size: 0.85rem;
  margin-right: 0.75rem;
  > span {
    margin-bottom: 0.25rem;
  }
`
const TicketStatusBar = styled.div`
  display: flex;
  align-items: center;
`

const TooltipIndicator = styled.span`
  opacity: 0;
  position: absolute;
  left: -9999px;
  transition: opacity 0.2s ease;
`

const Tooltip = styled.span`
  position: relative;
  ${TooltipIndicator} {
    opacity: 0;
    position: absolute;
    left: -9999px;
    transition: opacity 0.2s ease;
  }
  &:hover {
    cursor: pointer;
    ${TooltipIndicator} {
      opacity: 1;
      left: 0;
      top: -20px;
      width: 70px;
      font-size: 0.725rem;
      background: grey;
      color: white;
      padding: 0.25rem;
      border-radius: 4px;
      text-align: center;
    }
  }
`

const ticketDetails: React.FC = () => {
  const { bookingRef } = useParams<{ bookingRef: string }>()
  const history = useHistory()
  const { conferenceSlug, token } = useContext(AppContext)
  const [reassignment, setReassignment] = useState(false)
  const [loginEmailChange, setLoginEmailChange] = useState(false)
  const [identityEmailChange, setIdentityEmailChange] = useState(false)

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

  const copyToClipBoard = (copyMe: string) => {
    const textField = document.createElement('textarea')
    textField.innerText = copyMe
    document.body.appendChild(textField)
    textField.select()
    document.execCommand('copy')
    textField.remove()
  }

  const ticket = data?.ticket
  const assignment = ticket?.assignment
  const assignee = assignment?.assignee

  return (
    <StlyedContainer>
      <TicketHeader>
        <Heading>
          <Button type="button" onClick={() => history.goBack()}>
            Back
          </Button>
          Manage Ticket/
          <Tooltip onClick={() => copyToClipBoard(bookingRef)}>
            {bookingRef}
            <TooltipIndicator>Click to copy</TooltipIndicator>
          </Tooltip>
        </Heading>
        <TicketStatusBar>
          <TicketStatus>
            <span>Ticket status</span>
            <StatePlate state={ticket?.state as string} />
          </TicketStatus>
          <TicketStatus>
            <span>Assignment status</span>
            <StatePlate state={!assignment ? 'Unassigned' : (assignment?.state as string)} />
          </TicketStatus>
        </TicketStatusBar>
      </TicketHeader>
      <hr />
      {!loading && !error && ticket && (
        <div>
          {ticket && ticket.state !== 'VOID' && !assignment && (
            <>
              <div>
                <Heading>Assign ticket:</Heading>
                <TicketAssign ticketId={ticket.id} resetReassignment={setReassignment} />
              </div>
              <hr />
            </>
          )}

          {assignee && (
            <div>
              <Heading>Assignee details</Heading>
              <Text>
                Name: {assignee.firstName} {assignee.lastName}
              </Text>
              <Text>
                Email:
                <Tooltip onClick={() => copyToClipBoard(assignee.email)}>
                  <TextHighlight>{assignee.email}</TextHighlight>
                  <TooltipIndicator>Click to copy</TooltipIndicator>
                </Tooltip>
              </Text>
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

              <hr />

              <Heading>Assignment dashboard login link</Heading>
              <LoginLinkRequest account={assignee} />

              <hr />

              <Heading>Ticket access information</Heading>
              <Text>
                Booking reference:
                <Tooltip onClick={() => copyToClipBoard(bookingRef)}>
                  <TextHighlight>{bookingRef}</TextHighlight>
                  <TooltipIndicator>Click to copy</TooltipIndicator>
                </Tooltip>
              </Text>
              {assignment?.state === 'ACCEPTED' && (
                <>
                  <Text>
                    App login email:
                    <Tooltip
                      onClick={() => copyToClipBoard(assignment?.appLoginEmail || assignee?.email)}
                    >
                      <TextHighlight>{assignment?.appLoginEmail || assignee?.email}</TextHighlight>
                      <TooltipIndicator>Click to copy</TooltipIndicator>
                    </Tooltip>
                  </Text>
                  {loginEmailChange && (
                    <UpdateAppLoginEmail
                      bookingRef={bookingRef}
                      resetLoginEmailChange={setLoginEmailChange}
                    />
                  )}
                  <Button onClick={() => setLoginEmailChange(!loginEmailChange)}>
                    {loginEmailChange ? 'Cancel' : 'Update App Login Email'}
                  </Button>
                </>
              )}

              <hr />

              {assignee && (
                <>
                  <Heading>User account information</Heading>
                  <Text>
                    Identity email:
                    <Tooltip onClick={() => copyToClipBoard(assignee?.email)}>
                      <TextHighlight>{assignee?.email}</TextHighlight>
                      <TooltipIndicator>Click to copy</TooltipIndicator>
                    </Tooltip>
                  </Text>
                  {identityEmailChange && (
                    <IdentityEmailUpdate
                      accountId={assignee?.id}
                      resetIdentityEmailChange={setIdentityEmailChange}
                    />
                  )}
                  <Button onClick={() => setIdentityEmailChange(!identityEmailChange)}>
                    {identityEmailChange ? 'Cancel' : 'Update Identity Email'}
                  </Button>
                </>
              )}
              <hr />
            </div>
          )}
          <div>
            <Heading>Ticket operation</Heading>
            {ticket.state === 'LOCKED' && <TicketUnlock bookingRef={ticket?.bookingRef} />}
            {assignment && assignment.state !== 'ACCEPTED' && ticket.state !== 'VOID' && (
              <div>
                <TicketClaim ticketId={ticket.id} />
              </div>
            )}
          </div>
        </div>
      )}
    </StlyedContainer>
  )
}

export default ticketDetails
