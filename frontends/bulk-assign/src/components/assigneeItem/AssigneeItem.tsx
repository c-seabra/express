import React from 'react'
import styled from 'styled-components'

import UploadStatus from '../statusIcon/StatusIcon'

const BookingRef = styled.div`
  width: calc(15% - 1rem);
  text-align: center;
  font-weight: bold;
`;
const Name = styled.div`
  width: calc(40% - 1rem);
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
  font-size: 1.2rem;
  display: flex;
  margin-bottom: .5rem;
  padding: .75rem;
  background-color: gainsboro;
  &:nth-child(2n + 1) {
    background-color: white;
  }
  ${BookingRef}, ${Name}, ${Email} {
    margin-right: 1rem;
  }
`;

export type StatusType = {
  message: string
  type: 'pending' | 'success' | 'error'
}


const AssigneeItem = ({bookingRef, firstName, lastName, email, status} : {
  bookingRef: string
  firstName: string
  lastName: string
  email: string
  status?: StatusType
}) => {

  return (
    <StyledListItem>
      <BookingRef>{bookingRef}</BookingRef>
      <Name>{firstName} {lastName}</Name>
      <Email>{email}</Email>
      <Status>
        {status ? <UploadStatus status={status} /> : 'Status'}
      </Status>
    </StyledListItem>
  )
}

export default AssigneeItem
