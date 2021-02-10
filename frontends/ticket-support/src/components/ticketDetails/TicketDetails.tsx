import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

import { Button, SecondaryButton } from '../../lib/components/atoms/Button'
import ContainerCard from '../../lib/components/atoms/ContainerCard'
import TextHeading from '../../lib/components/atoms/Heading'
import BoxMessage from '../../lib/components/molecules/BoxMessage'
import Breadcrumbs, { Breadcrumb } from '../../lib/components/molecules/Breadcrumbs'
import ErrorInfoModal from '../../lib/components/molecules/ErrorInfoModal'
import Modal, { useModalState } from '../../lib/components/molecules/Modal'
import useEventDataQuery from '../../lib/hooks/useEventDataQuery'
import useSingleTicketQuery from '../../lib/hooks/useSingleTicketQuery'
import Loader from '../../lib/Loading'
import { OrderSource } from '../../lib/types'
import { switchCase } from '../../lib/utils/logic'
import { useAppContext } from '../app/AppContext'
import AuditTrail from '../auditTrail/AuditTrail'
import LoginLinkActions from '../ticketActions/LoginLinkActions'
import TicketAssignModal from '../ticketActions/TicketAssignModal'
import TicketVoidModal from '../ticketActions/TicketVoidModal'
import UnassignTicketModal from '../ticketActions/UnassignTicketModal'
import UpdateAppLoginEmail from '../ticketActions/UpdateAppLoginEmail'
import UpdateUniqueUserIdentifier from '../ticketActions/UpdateUniqueUserIdentifier'
import UserProfileInformation from '../userProfileInformation/UserProfileInformation'
import TicketStateActions from './TicketStateActions'

const PageContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  font-size: 16px;

  display: flex;
  flex-direction: column;
`

const BreadcrumbsContainer = styled.div`
  display: flex;
  margin: 20px 0 16px;
`

const SpacingBottom = styled.div`
  margin-bottom: 2.5rem;
`

const SpacingBottomSm = styled.div`
  margin-bottom: 1rem;
`

const StyledHistoryChanges = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  justify-content: center;
  border-top: 1px solid #dcdfe5;
`

const DefaultStyledRow = styled.div`
  display: flex;
  align-items: center;

  > * {
    margin-right: 20px;
  }
`

const RowContainer = styled.div`
  display: flex;
`

const ContainerCardInner = styled.div`
  display: flex;
  flex-direction: column;
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

const AccountDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 780px;
  width: 100%;

  & > div {
    margin-bottom: 1rem;
  }
`

const TicketDetails = (): ReactElement => {
  const { bookingRef } = useParams<{ bookingRef: string }>()
  const { conferenceSlug, token } = useAppContext()
  const {
    openModal: openTicketAssignModal,
    isOpen: isTicketAssignModalOpen,
    closeModal: closeTicketAssignModal,
  } = useModalState()
  const {
    isOpen: isHistoryModalOpen,
    openModal: openHistoryModal,
    closeModal: closeHistoryModal,
  } = useModalState()

  const {
    openModal: openUnassignTicketModal,
    isOpen: isUnassignTicketModalOpen,
    closeModal: closeUnassignTicketModal,
  } = useModalState()

  const {
    openModal: openTicketVoidModal,
    isOpen: isTicketVoidModalOpen,
    closeModal: closeTicketVoidModal,
  } = useModalState()

  const { loading, error, ticket } = useSingleTicketQuery({ reference: bookingRef })
  const assignment = ticket?.assignment
  const orderRef = ticket?.order?.reference || ''
  const assignee = assignment?.assignee
  const { event } = useEventDataQuery()
  const sourceOfSale = ticket?.order?.source
  const isFromTito = (source: string): boolean => {
    return switchCase({
      TICKET_MACHINE: false,
      TITO: true,
    })(false)(source)
  }
  const isTitoTicket = sourceOfSale && isFromTito(sourceOfSale)
  const breadcrumbsRoutes: Breadcrumb[] = [
    {
      label: event?.name || 'Home',
      redirectUrl: '/',
    },
    {
      label: 'Orders',
      redirectUrl: '/orders',
    },
    {
      label: `Order ${orderRef}`,
      redirectUrl: `/order/${orderRef}`,
    },
    {
      label: `Ticket ${bookingRef}`,
    },
  ]

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
            <DefaultStyledRow>
              <TextHeading>Manage ticket</TextHeading>
              {isTitoTicket && (
                <BoxMessage backgroundColor="#333333" color="#fff" dimension="sm">
                  <>As this ticket was sold via Tito, some functionality may be limited</>
                </BoxMessage>
              )}
            </DefaultStyledRow>
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
                  <TicketStateActions ticket={ticket} />
                </StyledPairContainer>
              </StyledInnerContainerCardWithBorder>

              <StyledInnerContainerCard>
                <SpacingBottomSm>
                  <PrimaryButton onClick={openTicketAssignModal}>Reassign</PrimaryButton>
                  <TicketAssignModal
                    closeModal={closeTicketAssignModal}
                    isOpen={isTicketAssignModalOpen}
                    ticket={ticket}
                  />
                </SpacingBottomSm>
                <SpacingBottomSm>
                  <PrimaryButton onClick={openUnassignTicketModal}>Unassign</PrimaryButton>
                  <UnassignTicketModal
                    isOpen={isUnassignTicketModalOpen}
                    ticket={ticket}
                    onRequestClose={closeUnassignTicketModal}
                  />
                </SpacingBottomSm>
                {ticket?.state === 'VOID' ? (
                  <Button disabled>Unvoid</Button>
                ) : (
                  <PrimaryButton onClick={openTicketVoidModal}>Void</PrimaryButton>
                )}

                {!isTitoTicket && (
                  <TicketVoidModal
                    closeModal={closeTicketVoidModal}
                    isOpen={isTicketVoidModalOpen}
                    ticket={ticket}
                  />
                )}
                {isTitoTicket && (
                  <ErrorInfoModal
                    alertHeader={bookingRef}
                    alertText="As this ticket was created in Tito, it cannot be voided using Ticket Machine. Please go
            to Tito to void the ticket."
                    closeModal={closeTicketVoidModal}
                    headerText="Unable to void ticket"
                    isOpen={isTicketVoidModalOpen}
                  />
                )}

                <Modal noPadding isOpen={isHistoryModalOpen} onRequestClose={closeHistoryModal}>
                  <AuditTrail
                    bookingRef={bookingRef}
                    conferenceSlug={conferenceSlug as string}
                    token={token as string}
                  />
                </Modal>
              </StyledInnerContainerCard>
              <StyledHistoryChanges>
                <Button as={SecondaryButton} onClick={openHistoryModal}>
                  Load history changes
                </Button>
              </StyledHistoryChanges>
            </TicketActionsContainerCard>

            <AccountDetailsContainer>
              <ContainerCard title="User account details">
                <ContainerCardInner>
                  {assignment && assignment.assignee && (
                    <UpdateUniqueUserIdentifier
                      accountId={assignment.assignee.id}
                      email={assignment.assignee?.email}
                    />
                  )}

                  {assignment?.state === 'ACCEPTED' && (
                    <UpdateAppLoginEmail
                      bookingRef={bookingRef}
                      email={assignment?.appLoginEmail || assignee?.email}
                    />
                  )}

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
              <UserProfileInformation account={assignee} />
            </AccountDetailsContainer>
          </RowContainer>
        </PageContainer>
      )}
    </>
  )
}

export default TicketDetails
