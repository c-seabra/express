import React from 'react';
import styled from 'styled-components';

const BookingRef = styled.div`
  width: calc(10% + 2rem);
  text-align: center;
  font-weight: 600;
`;
const Name = styled.div`
  width: calc(35% - 1rem);
  font-weight: 600;
`;
const Email = styled.div`
  width: calc(35% - 1rem);
  font-weight: 600;
`;
const Status = styled.div`
  width: calc(10% - 1rem);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
`;
const ClaimStatus = styled.div`
  width: calc(15% - 1rem);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
`;

const StyledListItem = styled.li`
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  padding: 1rem 1.5rem;
  background-color: gainsboro;
  &:nth-child(2n + 1) {
    background-color: white;
  }
`;

const AssigneeListHeader: React.FC = () => {
  return (
    <StyledListItem>
      <BookingRef>Ticket reference</BookingRef>
      <Name>Full name</Name>
      <Email>Email</Email>
      <Status>Status</Status>
      <ClaimStatus>Claim status</ClaimStatus>
    </StyledListItem>
  );
};

export default AssigneeListHeader;
