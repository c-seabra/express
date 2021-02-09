import React from "react";
import styled from "styled-components";

const BookingRef = styled.div`
  width: calc(15% - 1rem);
  text-align: center;
  font-weight: bold;
`;
const Name = styled.div`
  width: calc(35% - 1rem);
`;
const Email = styled.div`
  width: calc(35% - 1rem);
`;
const Status = styled.div`
  width: calc(10% - 1rem);
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ClaimStatus = styled.div`
  width: calc(15% - 1rem);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledListItem = styled.li`
  font-size: 1.2em;
  display: flex;
  margin-bottom: 0.5rem;
  padding: 0.75rem;
  background-color: gainsboro;
  &:nth-child(2n + 1) {
    background-color: white;
  }
  ${BookingRef}, ${Name}, ${Email} {
    margin-right: 1rem;
  }
`;

const AssigneeListHeader: React.FC = () => {
  return (
    <StyledListItem>
      <BookingRef>Booking Ref</BookingRef>
      <Name>First & last name</Name>
      <Email>Email</Email>
      <Status>Status</Status>
      <ClaimStatus>Claim status</ClaimStatus>
    </StyledListItem>
  );
};

export default AssigneeListHeader;
