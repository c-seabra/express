import BlockMessage from '@websummit/components/src/molecules/BlockMessage';
import BoxMessage from '@websummit/components/src/molecules/BoxMessage';
import Breadcrumbs, {
  Breadcrumb,
} from '@websummit/components/src/molecules/Breadcrumbs';
import ContainerCard from '@websummit/components/src/molecules/ContainerCard';
import { Spacing } from '@websummit/components/src/templates/Spacing';
import { useTicketQuery } from '@websummit/graphql/src/@types/operations';
import { switchCase } from '@websummit/tsutils/src/lib/utils/logic';
import { useRequestContext } from '@websummit/graphql/src/utils/AppContext';
import React, { ReactElement } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { Button, SecondaryButton } from '../../lib/components/atoms/Button';
import TextHeading from '../../lib/components/atoms/Heading';
import ErrorInfoModal from '../../lib/components/molecules/ErrorInfoModal';
import Modal, { useModalState } from '../../lib/components/molecules/Modal';
import useEventDataQuery from '../../lib/hooks/useEventDataQuery';
import useTicketTypes from '../../lib/hooks/useTicketTypes';
import Loader from '../../lib/Loading';
import { switchCase } from '../../lib/utils/logic';
import { useRequestContext } from '../app/AppContext';
import AuditTrail from '../auditTrail/AuditTrail';
import ChangeTicketTypeModal from '../ticketActions/ChangeTicketTypeModal';
import LoginLinkActions from '../ticketActions/LoginLinkActions';
import TicketAssignModal from '../ticketActions/TicketAssignModal';
import TicketUnvoidModal from '../ticketActions/TicketUnvoidModal';
import TicketVoidModal from '../ticketActions/TicketVoidModal';
import UnassignTicketModal from '../ticketActions/UnassignTicketModal';
import UpdateAppLoginEmail from '../ticketActions/UpdateAppLoginEmail';
import UpdateUniqueUserIdentifier from '../ticketActions/UpdateUniqueUserIdentifier';
import UserProfileInformation from '../userProfileInformation/UserProfileInformation';
import TicketStateActions from './TicketStateActions';

const PageContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  font-size: 16px;

  display: flex;
  flex-direction: column;
`;

const BreadcrumbsContainer = styled.div`
  display: flex;
  margin: 20px 0 16px;
`;

const SpacingBottom = styled.div`
  margin-bottom: 2.5rem;
`;

const SpacingBottomSm = styled.div`
  margin-bottom: 1rem;
`;

const StyledHistoryChanges = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  justify-content: center;
  border-top: 1px solid #dcdfe5;
`;

const DefaultStyledRow = styled.div`
  display: flex;
  align-items: center;

  > * {
    margin-right: 20px;
  }
`;

const RowContainer = styled.div`
  display: flex;
`;

const ContainerCardInner = styled.div`
  display: flex;
  flex-direction: column;
`;

const TicketActionsContainerCard = styled(ContainerCard)`
  margin-right: 3.75rem;
  max-width: 300px;
`;

const StyledPairContainer = styled.span`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const StyledLabel = styled.span`
  color: #091a46;
  font-size: 14px;
  font-weight: 300;
  letter-spacing: 0;
  line-height: 24px;
`;

const StyledValue = styled.span`
  color: #0c1439;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 24px;
`;

const StyledInnerContainerCard = styled.span`
  display: flex;
  flex-direction: column;
  padding: 32px;
  border-top: 1px solid #dcdfe5;
`;

const PrimaryButton = styled(Button)`
  width: 100%;
`;

const AccountDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 780px;
  width: 100%;

  & > div {
    margin-bottom: 1rem;
  }
`;

const TicketDetails = (): ReactElement => {
  const {
    openModal: openTicketAssignModal,
    isOpen: isTicketAssignModalOpen,
    closeModal: closeTicketAssignModal,
  } = useModalState();
  const {
    isOpen: isHistoryModalOpen,
    openModal: openHistoryModal,
    closeModal: closeHistoryModal,
  } = useModalState();

  const {
    openModal: openUnassignTicketModal,
    isOpen: isUnassignTicketModalOpen,
    closeModal: closeUnassignTicketModal,
  } = useModalState();

  const {
    openModal: openTicketVoidModal,
    isOpen: isTicketVoidModalOpen,
    closeModal: closeTicketVoidModal,
  } = useModalState();

  const {
    openModal: openTicketUnvoidModal,
    isOpen: isTicketUnvoidModalOpen,
    closeModal: closeTicketUnvoidModal,
  } = useModalState();

  const {
    openModal: openTitoWarningModal,
    isOpen: isTitoWarningModalOpen,
    closeModal: closeTitoWarningModal,
  } = useModalState();

  const {
    openModal: openChangeTicketTypeModal,
    isOpen: isChangeTicketTypeModalOpen,
    closeModal: closeChangeTicketTypeModal,
  } = useModalState();

  const context = useRequestContext();
  const { bookingRef } = useParams<{ bookingRef: string }>();
  const { loading, error, data } = useTicketQuery({
    context,
    variables: {
      reference: bookingRef,
    },
  });

  const ticket = data?.ticket;

  const assignment = ticket?.assignment;
  const orderRef = ticket?.order?.reference || '';
  const assignee = assignment?.assignee;
  const { event } = useEventDataQuery();
  const sourceOfSale = ticket?.order?.source;
  const isFromTito = (source: string): boolean => {
    return switchCase({
      TICKET_MACHINE: false,
      TITO: true,
    })(false)(source);
  };
  const isTitoTicket = sourceOfSale && isFromTito(sourceOfSale);
  const isTicketVoided = ticket?.state === 'VOID';
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
  ];

  const ticketTypes = useTicketTypes();

  let voidUnVoidModal: JSX.Element;
  if (isTitoTicket) {
    voidUnVoidModal = (
      <ErrorInfoModal
        alertHeader={bookingRef}
        alertText="As this ticket was created in Tito, it cannot be voided using Ticket Machine. Please go
        to Tito to void the ticket."
        closeModal={closeTitoWarningModal}
        headerText="Unable to void ticket"
        isOpen={isTitoWarningModalOpen}
      />
    );
  } else if (ticket?.state === 'VOID') {
    voidUnVoidModal = (
      <TicketUnvoidModal
        bookingRef={bookingRef}
        closeModal={closeTicketUnvoidModal}
        isOpen={isTicketUnvoidModalOpen}
      />
    );
  } else {
    voidUnVoidModal = (
      <TicketVoidModal
        bookingRef={bookingRef}
        closeModal={closeTicketVoidModal}
        isOpen={isTicketVoidModalOpen}
      />
    );
  }

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
                <BoxMessage
                  backgroundColor="#333333"
                  color="#fff"
                  dimension="sm"
                >
                  <>
                    As this ticket was sold via Tito, some functionality may be
                    limited
                  </>
                </BoxMessage>
              )}
            </DefaultStyledRow>
          </SpacingBottom>

          <RowContainer>
            <TicketActionsContainerCard noPadding>
              <StyledInnerContainerCard>
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
              </StyledInnerContainerCard>
              <StyledInnerContainerCard>
                {ticket?.state !== 'UNASSIGNED' && assignment && (
                  <>
                    <SpacingBottomSm>
                      <PrimaryButton
                        disabled={isTicketVoided}
                        onClick={openTicketAssignModal}
                      >
                        Reassign
                      </PrimaryButton>
                    </SpacingBottomSm>
                    <SpacingBottomSm>
                      <PrimaryButton
                        disabled={isTicketVoided}
                        onClick={openUnassignTicketModal}
                      >
                        Unassign
                      </PrimaryButton>
                      <UnassignTicketModal
                        isOpen={isUnassignTicketModalOpen}
                        ticket={ticket}
                        onRequestClose={closeUnassignTicketModal}
                      />
                    </SpacingBottomSm>
                  </>
                )}

                <SpacingBottomSm>
                  {isTicketVoided ? (
                    <PrimaryButton
                      onClick={
                        isTitoTicket
                          ? openTitoWarningModal
                          : openTicketUnvoidModal
                      }
                    >
                      Unvoid
                    </PrimaryButton>
                  ) : (
                    <PrimaryButton
                      onClick={
                        isTitoTicket
                          ? openTitoWarningModal
                          : openTicketVoidModal
                      }
                    >
                      Void
                    </PrimaryButton>
                  )}
                </SpacingBottomSm>
                {voidUnVoidModal}

                {ticketTypes?.length > 0 ? (
                  <>
                    <Button onClick={openChangeTicketTypeModal}>
                      Change ticket type
                    </Button>
                    <ChangeTicketTypeModal
                      isOpen={isChangeTicketTypeModalOpen}
                      ticket={ticket}
                      ticketTypes={ticketTypes}
                      onRequestClose={closeChangeTicketTypeModal}
                    />
                  </>
                ) : null}
              </StyledInnerContainerCard>

              <StyledHistoryChanges>
                <SecondaryButton onClick={openHistoryModal}>
                  Load history changes
                </SecondaryButton>
                <Modal
                  noPadding
                  isOpen={isHistoryModalOpen}
                  onRequestClose={closeHistoryModal}
                >
                  <AuditTrail bookingRef={bookingRef} {...context} />
                </Modal>
              </StyledHistoryChanges>
            </TicketActionsContainerCard>

            <AccountDetailsContainer>
              <TicketAssignModal
                closeModal={closeTicketAssignModal}
                isOpen={isTicketAssignModalOpen}
                ticket={ticket}
              />

              {(ticket?.state === 'UNASSIGNED' ||
                ticket?.state === 'REJECTED') && (
                <ContainerCard>
                  <Spacing bottom="36px" left="24px" right="24px" top="36px">
                    <BlockMessage
                      buttonText="Assign now"
                      header="Assign your ticket"
                      message="Please assign this ticket to see the user account details"
                      onClickAction={openTicketAssignModal}
                    />
                  </Spacing>
                </ContainerCard>
              )}

              {ticket?.state === 'VOID' && !assignment && (
                <ContainerCard>
                  <Spacing bottom="36px" left="24px" right="24px" top="36px">
                    <BlockMessage
                      header="This ticket is voided"
                      message="A voided ticket cannot be used for a conference"
                    />
                  </Spacing>
                </ContainerCard>
              )}

              {ticket?.state !== 'UNASSIGNED' && assignment && (
                <ContainerCard title="User account details">
                  <ContainerCardInner>
                    {assignment && assignment.assignee && (
                      <UpdateUniqueUserIdentifier
                        accountId={assignment.assignee.id}
                        email={assignment.assignee?.email}
                        withEditMode={!isTicketVoided}
                      />
                    )}

                    {assignment?.state === 'ACCEPTED' && (
                      <UpdateAppLoginEmail
                        bookingRef={bookingRef}
                        email={assignment?.appLoginEmail || assignee?.email}
                        withEditMode={!isTicketVoided}
                      />
                    )}

                    {assignee && (
                      <SpacingBottomSm>
                        <StyledLabel>
                          Assignment dashboard login link
                        </StyledLabel>
                        <LoginLinkActions
                          assignee={assignee}
                          isTicketVoided={isTicketVoided}
                        />
                      </SpacingBottomSm>
                    )}
                  </ContainerCardInner>
                </ContainerCard>
              )}
              <UserProfileInformation
                account={assignee}
                isDisabled={isTicketVoided}
              />
            </AccountDetailsContainer>
          </RowContainer>
        </PageContainer>
      )}
    </>
  );
};

export default TicketDetails;
