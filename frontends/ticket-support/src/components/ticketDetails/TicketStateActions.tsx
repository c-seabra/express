import { Spacing } from '@websummit/components/src/templates/Spacing';
import { TicketQuery } from '@websummit/graphql/src/@types/operations';
import {
  extractTypeFromMaybe,
  GetQueryResult,
} from '@websummit/graphql/src/lib/types';
import React from 'react';
import styled from 'styled-components';

import { TextButton } from '../../lib/components/atoms/Button';
import Icon from '../../lib/components/atoms/Icon';
import { useModalState } from '../../lib/components/molecules/Modal';
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
  ticket: extractTypeFromMaybe<GetQueryResult<TicketQuery, 'ticket'>>;
};

const TicketAction = ({ ticket }: Pick<TicketStateActionsProps, 'ticket'>) => {
  const { isOpen, openModal, closeModal } = useModalState();
  const {
    openModal: openTicketUnlockModal,
    isOpen: isTicketUnlockModalOpen,
    closeModal: closeTicketUnlockModal,
  } = useModalState();

  switch (ticket?.state) {
    case 'PENDING':
    case 'DUPLICATE':
      return (
        <>
          <TextButton onClick={openModal}>
            <StyledWrapper>
              <Icon>content_paste</Icon>
            </StyledWrapper>
            Claim ticket
          </TextButton>
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
  const assignmentStatus =
    ticket?.state === 'REJECTED'
      ? 'ASSIGNMENT_REJECTED'
      : ticket?.assignment?.state || 'UNASSIGNED';

  return (
    <>
      <TicketStateContainer>
        <StyledLabel>Ticket status</StyledLabel>
        <StateActionContainer>
          <StatePlate state={ticket?.state} />
          <TicketAction ticket={ticket} />
        </StateActionContainer>
      </TicketStateContainer>

      <Spacing top="24px">
        <TicketStateContainer>
          <StyledLabel>Assignment status</StyledLabel>
          <StateActionContainer>
            <StatePlate state={assignmentStatus} />
          </StateActionContainer>
        </TicketStateContainer>
      </Spacing>
    </>
  );
};

export default TicketStateActions;
