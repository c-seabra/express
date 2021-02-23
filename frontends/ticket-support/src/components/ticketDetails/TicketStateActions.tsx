import React from 'react';
import styled from 'styled-components';

import { TextButton } from '../../lib/components/atoms/Button';
import Icon from '../../lib/components/atoms/Icon';
import { useModalState } from '../../lib/components/molecules/Modal';
import { Ticket } from '../../lib/types';
import ClaimTicketModal from '../ticketActions/ClaimTicketModal';
import TicketUnlockModal from '../ticketActions/TicketUnlockModal';
import StatePlate from '../ticketItem/StatePlate';

const TicketStateContainer = styled.div``;

const StyledLabel = styled.span`
  color: #091a46;
  font-size: 14px;
  font-weight: 300;
  letter-spacing: 0;
  line-height: 24px;
`;

const StateActionContainer = styled.div`
  margin-top: 8px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledWrapper = styled.span`
  height: 19px;
  margin-right: 8px;

  .material-icons {
    font-size: 16px;
  }
`;

type TicketStateActionsProps = {
  ticket: Ticket;
};

const TicketAction = ({ ticket }: { ticket: Ticket }) => {
  const { isOpen, openModal, closeModal } = useModalState();
  const {
    openModal: openTicketUnlockModal,
    isOpen: isTicketUnlockModalOpen,
    closeModal: closeTicketUnlockModal,
  } = useModalState();

  switch (ticket?.state) {
    case 'PENDING':
      return (
        <>
          <TextButton onClick={openModal}>Claim ticket</TextButton>
          <ClaimTicketModal
            isOpen={isOpen}
            ticket={ticket}
            onRequestClose={closeModal}
          />
        </>
      );
    case 'LOCKED':
      return (
        <>
          <TextButton onClick={openTicketUnlockModal}>
            <StyledWrapper>
              <Icon>lock_open</Icon>
            </StyledWrapper>
            Unlock ticket
          </TextButton>
          <TicketUnlockModal
            closeModal={closeTicketUnlockModal}
            isOpen={isTicketUnlockModalOpen}
            ticket={ticket}
          />
        </>
      );
    default:
      return null;
  }
};

const TicketStateActions = ({ ticket }: TicketStateActionsProps) => {
  return (
    <TicketStateContainer>
      <StyledLabel>Ticket status</StyledLabel>
      <StateActionContainer>
        <StatePlate state={ticket?.state} />
        <TicketAction ticket={ticket} />
      </StateActionContainer>
    </TicketStateContainer>
  );
};

export default TicketStateActions;
