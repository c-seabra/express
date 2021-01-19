import { ApolloError, useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { useHistory, useParams } from 'react-router-dom'
import styled from 'styled-components'

import { Tooltip } from '../../lib/components'
import { Button, SecondaryButton } from '../../lib/components/atoms/Button'
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
  flex-direction: column;
`

const SpacingBottom = styled.div`
  margin-bottom: 2.5rem;
`

const SpacingBottomSm = styled.div`
  margin-bottom: 1rem;
`

const StyledRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-top: 4rem;
`

const RowContainer = styled.div`
  display: flex;
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

const TicketActionsContainerCard = styled(ContainerCard)`
  margin-right: 60px;
  max-width: 300px;
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

const StyledInnerContainerCard = styled.span`
  display: flex;
  flex-direction: column;
  padding: 32px;
`

const StyledInnerContainerCardWithBorder = styled(StyledInnerContainerCard)`
  border-bottom: 1px solid #dcdfe5;
`

const PrimaryButton = styled(Button)`
  width: 100%;
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
        <PageContainer>
          <SpacingBottom>
            <StyledRow>
              <TextHeading>Manage tickets</TextHeading>
            </StyledRow>
          </SpacingBottom>

          <RowContainer>
            <TicketActionsContainerCard noPadding>
              <StyledInnerContainerCardWithBorder>
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
              </StyledInnerContainerCardWithBorder>

              <StyledInnerContainerCard>
                <SpacingBottomSm>
                  <PrimaryButton>Reassign</PrimaryButton>
                </SpacingBottomSm>

                <SpacingBottomSm>
                  <PrimaryButton>Unassign</PrimaryButton>
                </SpacingBottomSm>

                <Button as={SecondaryButton}>Load history changes</Button>
              </StyledInnerContainerCard>
            </TicketActionsContainerCard>

            <ContainerCard title="User account details">
              {/* {ticket && ticket.state !== 'VOID' && !assignment && ( */}
              {/*  <> */}
              {/*    <div> */}
              {/*      <Heading>Assign ticket:</Heading> */}
              {/*      <TicketAssign resetReassignment={setReassignment} ticketId={ticket.id} /> */}
              {/*    </div> */}
              {/*  </> */}
              {/* )} */}

              {assignee && (
                <>
                  <StyledLabel>Assignment dashboard login link</StyledLabel>
                  {/*<LoginLinkRequest account={assignee} />*/}

                  {/*<StyledLabel>Assignment dashboard login link generate</StyledLabel>*/}
                  {/*<LoginLinkGenerate account={assignee} />*/}

                  {/*<Button as={SecondaryButton}>Generate login link</Button>*/}
                  <LoginLinkGenerate account={assignee} />

                  <Button as={SecondaryButton}>Send assignee login link email</Button>
                </>
              )}
            </ContainerCard>
          </RowContainer>
        </PageContainer>
      )}
    </>
  )
}

export default ticketDetails
