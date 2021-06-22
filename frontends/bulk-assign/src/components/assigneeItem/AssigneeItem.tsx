import React from 'react';
import styled from 'styled-components';

import UploadStatus from '../organisms/StatusIcon';

const BookingRef = styled.div`
  width: calc(10% + 2rem);
  text-align: center;
  text-transform: uppercase;
  color: #0067e9;
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
  display: flex;
  align-items: center;
  font-size: 0.85rem;
  padding: 1rem 1.5rem;
  border-top: 1px solid #dde0e5;

  &:hover {
    background-color: #dde0e5;
  }
`;

export type StatusType = {
  message: string;
  type: 'PENDING' | 'SUCCESS' | 'ERROR';
};

type AssigneItemType = {
  bookingRef?: string;
  claimStatus?: StatusType;
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
  claimStatus,
}) => {
  return (
    <StyledListItem>
      <BookingRef>{bookingRef}</BookingRef>
      <Name>
        {firstName} {lastName}
      </Name>
      <Email>{email}</Email>
      <Status>{status && <UploadStatus status={status} />}</Status>
      <ClaimStatus>
        {claimStatus && <UploadStatus status={claimStatus} />}
      </ClaimStatus>
    </StyledListItem>
  );
};

export default AssigneeItem;
