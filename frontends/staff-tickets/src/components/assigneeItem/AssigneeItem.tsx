import React from 'react';
import styled from 'styled-components';

import { StatusType } from '../../lib/extract/createOrder';
import UploadStatus from '../statusIcon/StatusIcon';

const BookingRef = styled.div`
  width: calc(15% - 1rem);
  text-align: center;
  font-weight: bold;
  text-transform: uppercase;
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

type AssigneItemType = {
  bookingRef?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  status?: StatusType;
};

const AssigneeItem: React.FC<AssigneItemType> = ({
  bookingRef,
  firstName,
  lastName,
  email,
  status,
}) => {
  return (
    <StyledListItem>
      <BookingRef>{bookingRef}</BookingRef>
      <Name>
        {firstName} {lastName}
      </Name>
      <Email>{email}</Email>
      <Status>{status && <UploadStatus status={status} />}</Status>
    </StyledListItem>
  );
};

export default AssigneeItem;
