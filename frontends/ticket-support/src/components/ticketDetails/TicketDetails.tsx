import { ApolloError, useQuery } from '@apollo/client'
import React, { ReactElement, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useHistory, useParams } from 'react-router-dom'
import styled from 'styled-components'

import { Input, Tooltip } from '../../lib/components'
import { Button, SecondaryButton } from '../../lib/components/atoms/Button'
import ContainerCard from '../../lib/components/atoms/ContainerCard'
import TextHeading from '../../lib/components/atoms/Heading'
import Breadcrumbs, { Breadcrumb } from '../../lib/components/molecules/Breadcrumbs'
import Modal, { useModalState } from '../../lib/components/molecules/Modal'
import Loader from '../../lib/Loading'
import { Ticket } from '../../lib/types'
import TICKET from '../../operations/queries/Ticket'
import { useAppContext } from '../app/AppContext'
import AuditTrail from '../auditTrail/AuditTrail'
import IdentityEmailUpdate from '../ticketActions/IdentityEmailUpdate'
import LoginLinkActions from '../ticketActions/LoginLinkActions'
import LoginLinkGenerate from '../ticketActions/LoginLinkGenerate'
import TicketAssign from '../ticketActions/TicketAssign'
import TicketClaim from '../ticketActions/TicketClaim'
import TicketReject from '../ticketActions/TicketReject'
import TicketUnlock from '../ticketActions/TicketUnlock'
import UpdateAppLoginEmail from '../ticketActions/UpdateAppLoginEmail'
import StatePlate from '../ticketItem/StatePlate'

// --- new ---
const Text = styled.div`
  border-radius: 8px;
  padding: 0.25rem;
  font-size: 1rem;
  font-weight: 400;
  a {
    color: #337ab7;
    margin: 0 0.25rem;
  }
`

const PageContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  font-size: 16px;

  display: flex;
  flex-direction: column;
`

const BreadcrumbsContainer = styled.div`
  display: flex;
  margin: 20px 0 4px;
`

const SpacingBottom = styled.div`
  margin-bottom: 2.5rem;
`

const SpacingBottomSm = styled.div`
  margin-bottom: 1rem;
`

const SpacingRightSm = styled.div`
  margin-right: 1rem;
`

const StyledRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const RowContainer = styled.div`
  display: flex;
`

const ContainerCardInner = styled.div`
  display: flex;
  flex-direction: column;
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
  margin-right: 3.75rem;
  max-width: 300px;
`

const StyledPairContainer = styled.span`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`

const StyledLabel = styled.span`
  color: #091a46;
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

const TextHighlight = styled.span`
  color: #337ab7;
  margin: 0 0.25rem;
`

const TicketDetails = (): ReactElement => {
  const { bookingRef } = useParams<{ bookingRef: string }>()
  const history = useHistory()
  const { conferenceSlug, token } = useAppContext()
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

  const ticket = data?.ticket
  const assignment = ticket?.assignment
  const assignee = assignment?.assignee
  const breadcrumbsRoutes: Breadcrumb[] = [
    {
      label: 'Web Summit 2020', // TODO get event name
      redirectUrl: '/',
    },
    {
      label: 'Orders',
      redirectUrl: '/orders',
    },
    {
      label: 'Order',
      redirectUrl: '/order',
    },
    {
      label: `Ticket ${bookingRef}`,
    },
  ]
  const {
    isOpen: isHistoryModalOpen,
    openModal: openHistoryModal,
    closeModal: closeHistoryModal,
  } = useModalState()

  return (
    <>
      <Helmet>
        <title>Manage {bookingRef} ticket - Ticket machine</title>
      </Helmet>

      {loading && <Loader />}
      {error && <div>{error}</div>}
      {!loading && !error && ticket && (
        <PageContainer>
          <BreadcrumbsContainer>
            <Breadcrumbs routes={breadcrumbsRoutes} />
          </BreadcrumbsContainer>

          <SpacingBottom>
            <StyledRow>
              <TextHeading>Manage ticket</TextHeading>
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
                <Modal noPadding isOpen={isHistoryModalOpen} onRequestClose={closeHistoryModal}>
                  <AuditTrail
                    bookingRef={bookingRef}
                    conferenceSlug={conferenceSlug as string}
                    token={token as string}
                  />
                </Modal>
                <Button as={SecondaryButton} onClick={openHistoryModal}>
                  Load history changes
                </Button>
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
              <ContainerCardInner>
                <p>There is a little line below this heading that explains what you can put here</p>

                <SpacingBottom>
                  <StyledLabel>Unique user identifier</StyledLabel>
                  <Input disabled value="dylan.hodge@websummit.net" />
                </SpacingBottom>

                <SpacingBottom>
                  <StyledLabel>App login email</StyledLabel>
                  <Input disabled value={assignment?.appLoginEmail || assignee?.email} />

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
                </SpacingBottom>

                {assignee && (
                  <>
                    <SpacingBottomSm>
                      <StyledLabel>Assignment dashboard login link</StyledLabel>
                      <LoginLinkActions assignee={assignee} />
                    </SpacingBottomSm>
                  </>
                )}
              </ContainerCardInner>
            </ContainerCard>
          </RowContainer>
        </PageContainer>
      )}
    </>
  )
}

export default TicketDetails
