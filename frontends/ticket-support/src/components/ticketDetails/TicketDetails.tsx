import { ApolloError, useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { useHistory, useParams } from 'react-router-dom'
import styled from 'styled-components'

import { Tooltip } from '../../lib/components'
import ContainerCard from '../../lib/components/atoms/ContainerCard'
import TextHeading from '../../lib/components/atoms/Heading'
import Loader from '../../lib/Loading'
import { Ticket } from '../../lib/types'
import TICKET from '../../operations/queries/Ticket'
import { useAppContext } from '../app/AppContext'
import AuditTrail from '../auditTrail/AuditTrail'
import IdentityEmailUpdate from '../ticketActions/IdentityEmailUpdate'
import LoginLinkGenerate from '../ticketActions/LoginLinkGenerate'
import LoginLinkRequest from '../ticketActions/LoginLinkRequest'
import TicketAssign from '../ticketActions/TicketAssign'
import TicketClaim from '../ticketActions/TicketClaim'
import TicketReject from '../ticketActions/TicketReject'
import TicketUnlock from '../ticketActions/TicketUnlock'
import UpdateAppLoginEmail from '../ticketActions/UpdateAppLoginEmail'
import StatePlate from '../ticketItem/StatePlate'

// --- new ---

const PageContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  font-size: 16px;

  display: flex;
`

const SpacingBottom = styled.div`
  margin-bottom: 2.5rem;
`

const StyledRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-top: 4rem;
`

const TicketDetailsActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;

  & > div {
    min-width: 30%;
    margin-bottom: 8px;
  }
`


const StyledContainerCard = styled(ContainerCard)`
  //display: flex;
  //flex-direction: column;
  //margin-bottom: 20px;
  padding: 32px; 
`

const StyledPairContainer = styled.span`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`

const StyledLabel = styled.span`
  color: #959aaa;
  font-size: 14px;
  font-weight: 300;
  letter-spacing: 0;
  line-height: 24px;
`

const StyledValue = styled.span`
  color: #0c1439;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 24px;
`

// --- old ---

const StyledContainer = styled.section`
  padding: 1rem;
  max-width: 1440px;
  margin: 0 auto;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid grey;
  hr {
    border-color: grey;
    margin: 1rem 0;
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

const ticketDetails: React.FC = () => {
  const { bookingRef } = useParams<{ bookingRef: string }>()
  const history = useHistory()
  const { conferenceSlug, token } = useAppContext()
  const [reassignment, setReassignment] = useState(false)
  const [loginEmailChange, setLoginEmailChange] = useState(false)
  const [identityEmailChange, setIdentityEmailChange] = useState(false)
  const [showAuditTrail, setShowAuditTrail] = useState(false)

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
      <Helmet>
        <title>Manage {bookingRef} ticket - Ticket machine</title>
      </Helmet>

      {loading && <Loader />}
      {error && <div>{error}</div>}
      {!loading && !error && ticket && (
        <>
          <PageContainer>
            <SpacingBottom>
              <StyledRow>
                <TextHeading>Manage tickets</TextHeading>
              </StyledRow>
            </SpacingBottom>

            <StyledContainerCard noPadding>
              <StyledPairContainer>
                <StyledLabel>Ticket reference</StyledLabel>
                <StyledValue>{bookingRef}</StyledValue>
              </StyledPairContainer>

              <StyledPairContainer>
                <StyledLabel>Ticket type</StyledLabel>
                <StyledValue>{ticket?.ticketType?.name}</StyledValue>
              </StyledPairContainer>

              <StyledPairContainer>
                <StyledLabel>Ticket status</StyledLabel>
                <StatePlate state={ticket?.state} />
              </StyledPairContainer>
            </StyledContainerCard>

            <ContainerCard title="User account details">
              <TicketDetailsActions>test</TicketDetailsActions>
            </ContainerCard>
          </PageContainer>

          {/* OLD */}
          <StyledContainer>
            <TicketHeader>
              <Heading>
                <Button type="button" onClick={() => history.goBack()}>
                  Back
                </Button>
                Manage Ticket/
                <Tooltip copyToClip value={bookingRef}>
                  <TextHighlight>{bookingRef}</TextHighlight>
                </Tooltip>
              </Heading>
              <Heading>
                <Button
                  type="button"
                  onClick={() => history.push(`/order/${ticket.order.reference}`)}
                >
                  Order Details
                </Button>
              </Heading>
              <TicketStatusBar>
                <TicketStatus>
                  <span>Ticket status</span>
                  <StatePlate state={ticket?.state} />
                </TicketStatus>
                <TicketStatus>
                  <span>Assignment status</span>
                  <StatePlate state={!assignment ? 'Unassigned' : assignment?.state} />
                </TicketStatus>
              </TicketStatusBar>
            </TicketHeader>
            <div>
              <hr />
              {ticket && ticket.state !== 'VOID' && !assignment && (
                <>
                  <div>
                    <Heading>Assign ticket:</Heading>
                    <TicketAssign resetReassignment={setReassignment} ticketId={ticket.id} />
                  </div>
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
                    <Tooltip copyToClip value={assignee.email}>
                      <TextHighlight>{assignee.email}</TextHighlight>
                    </Tooltip>
                  </Text>
                  {ticket && reassignment && (
                    <div>
                      <Heading>Reassign ticket</Heading>
                      <TicketAssign resetReassignment={setReassignment} ticketId={ticket.id} />
                    </div>
                  )}
                  {ticket.state !== 'VOID' && (
                    <Button onClick={() => setReassignment(!reassignment)}>
                      {reassignment ? 'Cancel' : 'Reassign'}
                    </Button>
                  )}
                  {ticket.state !== 'VOID' &&
                    (assignment?.state === 'ACCEPTED' || assignment?.state === 'PENDING') && (
                    <div>
                      <TicketReject ticketId={ticket.id} />
                    </div>
                  )}

                  <hr />

                  <Heading>Assignment dashboard login link</Heading>
                  <LoginLinkRequest account={assignee} />

                  <hr />

                  <Heading>Assignment dashboard login link generate</Heading>
                  <LoginLinkGenerate account={assignee} />

                  <hr />

                  <Heading>Ticket access information</Heading>
                  <Text>
                    Booking reference:
                    <Tooltip copyToClip value={bookingRef}>
                      <TextHighlight>{bookingRef}</TextHighlight>
                    </Tooltip>
                  </Text>
                  {assignment?.state === 'ACCEPTED' && (
                    <>
                      <Text>
                        App login email:
                        <Tooltip copyToClip value={assignment?.appLoginEmail || assignee?.email}>
                          <TextHighlight>
                            {assignment?.appLoginEmail || assignee?.email}
                          </TextHighlight>
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

                  {assignee && (
                    <>
                      <hr />
                      <Heading>User account information</Heading>
                      <Text>
                        Identity email:
                        <Tooltip copyToClip value={assignee?.email}>
                          <TextHighlight>{assignee?.email}</TextHighlight>
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
                </div>
              )}
              {(assignment && assignment.state !== 'ACCEPTED' && ticket.state !== 'VOID') ||
              ticket.state === 'LOCKED' ? (
                <div>
                    <hr />
                    <Heading>Ticket operation</Heading>
                  {ticket.state === 'LOCKED' && <TicketUnlock bookingRef={ticket?.bookingRef} />}
                  {assignment && assignment.state !== 'ACCEPTED' && ticket.state !== 'VOID' && (
                      <div>
                        <TicketClaim ticketId={ticket.id} />
                      </div>
                  )}
                  </div>
                ) : null}
              <div>
                <hr />
                <Heading>History changes</Heading>
                <Button onClick={() => setShowAuditTrail(!showAuditTrail)}>
                  {showAuditTrail ? 'Hide' : 'Load History Changes'}
                </Button>
                {showAuditTrail && (
                  <AuditTrail
                    bookingRef={bookingRef}
                    conferenceSlug={conferenceSlug as string}
                    token={token as string}
                  />
                )}
              </div>
            </div>
          </StyledContainer>
        </>
      )}
    </>
  )
}

export default ticketDetails
