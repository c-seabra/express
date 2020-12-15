import React from 'react';
import styled from 'styled-components';

const ColumnStyles = styled.div`
  text-align: center;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.25rem;
`;
const Column = styled(ColumnStyles)`
  width: 10%;
`;
const Email = styled(ColumnStyles)`
  width: 20%;
  white-space: pre-wrap;
  word-wrap: break-word;
`;
const StyledListItem = styled.li`
  font-size: 1rem;
  display: flex;
  margin: 0.5rem 0;
  padding: 0.75rem;
  background-color: gainsboro;
  &:nth-child(2n + 1) {
    background-color: white;
  }
`;

const TicketListHeader: React.FC = () => {
  return (
    <StyledListItem>
      <Column>Booking Ref</Column>
      <Column>Ticket Type</Column>
      <Column>Assigned To</Column>
      <Email>Email Used</Email>
      <Column>Assignment Status</Column>
      <Column>Ticket Status</Column>
      <Column>Ticket Owner</Column>
      <Email>Ticket Owner Email</Email>
    </StyledListItem>
  );
}

export default TicketListHeader;
