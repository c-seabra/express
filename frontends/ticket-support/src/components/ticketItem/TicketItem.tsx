import {
  Assignment,
  AssignmentUser,
} from '@websummit/graphql/src/@types/operations';
import React from 'react';
import styled from 'styled-components';

import StatePlate from './StatePlate';

const ColumnStyles = styled.div`
  display: flex;
  align-items: center;
  padding: 0 0.25rem;
  word-break: break-word;
`;
const Column = styled(ColumnStyles)`
  width: 10%;
`;

const TicketReference = styled(ColumnStyles)`
  width: 10%;
  color: #0067e9;
`;

const Email = styled(ColumnStyles)`
  width: 20%;
  white-space: pre-wrap;
`;

const StyledListItem = styled.li`
  font-size: 0.85rem;
  display: flex;
  padding: 1rem 1.5rem;
  background-color: white;
  color: #0c1439;

  border-bottom: 1px solid #dde0e5;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #dde0e5;
    cursor: pointer;
  }
`;

const ListHeaderItem = styled(StyledListItem)`
  font-weight: 600;
  text-align: center;

  &:hover {
    background-color: white;
    cursor: initial;
  }
`;

const BadgeColumn = styled(Column)`
  justify-content: center;
`;

// The list header is kept here along with the ticket item
// When columns displayed in the ticket item change,
// it makes sense to also update the header and having both in one place
// makes the process easier and forgetting more difficult
export const TicketListHeader = () => {
  return (
    <ListHeaderItem>
      <Column>Ticket reference</Column>
      <Column>First name</Column>
      <Column>Last name</Column>
      <Column>Ticket Type</Column>
      <Column>Assigned To</Column>
      <Email>Email Used</Email>
      <Column>Assignment Status</Column>
      <BadgeColumn>Ticket Status</BadgeColumn>
      <Email>Ticket Owner Email</Email>
    </ListHeaderItem>
  );
};

type TicketItemProps = {
  assignment?: Assignment | null;
  bookingRef: string;
  handleOnClick?: () => void;
  orderOwner?: AssignmentUser | null;
  ticketState: string;
  ticketTypeName: string | null;
};

const TicketItem = ({
  assignment,
  bookingRef,
  ticketState,
  orderOwner,
  ticketTypeName,
  handleOnClick,
}: TicketItemProps) => {
  const assignmentState = !assignment ? 'UNASSIGNED' : assignment?.state;

  return (
    <StyledListItem onClick={handleOnClick}>
      <TicketReference>{bookingRef}</TicketReference>
      <Column>{orderOwner?.firstName || ''}</Column>
      <Column>{orderOwner?.lastName || ''}</Column>
      <Column>{ticketTypeName}</Column>
      <Column>
        {assignment?.assignee?.firstName} {assignment?.assignee?.lastName}
      </Column>
      <Email>{assignment?.assignee?.email}</Email>
      <BadgeColumn>
        <StatePlate state={assignmentState} />
      </BadgeColumn>
      <BadgeColumn>
        <StatePlate state={ticketState} />
      </BadgeColumn>
      <Email>{orderOwner?.email}</Email>
    </StyledListItem>
  );
};

export default TicketItem;
