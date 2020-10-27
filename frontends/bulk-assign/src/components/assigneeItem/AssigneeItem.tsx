import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { useMutation } from '@apollo/client';
import TICKET_ASSIGN_MUTATION from '../../operations/mutations/TicketAssign'

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


const AssigneeItem = ({bookingRef, firstName, lastName, email, ticketId} : {
  bookingRef: string
  firstName: string
  lastName: string
  email: string
  ticketId?: string
}) => {
  const [status, setStatus] = useState<StatusType>({
    message:'Assignment is still processing.',
    type: 'pending'
  })
  const [ticketAssign] = useMutation(TICKET_ASSIGN_MUTATION, {
    onCompleted: ({ ticketAssign }) => {
      if (ticketAssign?.ticket?.assignment?.assignee) {
        console.log("success", ticketAssign?.ticket?.assignment?.assignee)
        setStatus({
          message: 'Assignment has been successful',
          type: 'success'
        })
      }
      if (ticketAssign?.userErrors.length) {
        console.log(ticketAssign.userErrors[0])
        setStatus({
          message: ticketAssign.userErrors[0].message,
          type: 'error'
        })
      }
    }
  });
  const testis = (firstName, lastName, email, ticketId) => {
    if(firstName && lastName && email && ticketId){
      ticketAssign({
        context: {
          token: 'eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ3ZWJzdW1taXQiLCJqdGkiOiIwMGJlZTY3OS1jZDE0LTQwZWUtYTc3Yi0wZTI1NmQyNjgxNTQiLCJpYXQiOjE2MDM4MDk2NTYsImV4cCI6MTYwNDQxNDQ1NiwiZW1haWwiOiJ0b21pc2xhdi5zdmVjYWtAd2Vic3VtbWl0LmNvbSIsImNvbmZfc2x1ZyI6InJjMjEiLCJzZXJ2ZXIiOiJ0aWNrZXQtYXNzaWdubWVudCJ9.hy7W1DN7C7A2ItcqtrpuWHPXm9xZUipvdDvdGY0s2_I',
          slug: 'rc21'
        },
        variables: {
          firstName,
          lastName,
          email,
          ticketId
        }
      })
    }
  }

  useEffect(() => {
    if(firstName && lastName && email && ticketId) {
      testis(firstName, lastName, email, ticketId)
    }
  }, [firstName, lastName, email, ticketId])

  return (
    <StyledListItem>
      <BookingRef>{bookingRef}</BookingRef>
      <Name>{firstName} {lastName}</Name>
      <Email>{email}</Email>
      <Status>
        {ticketId ? <UploadStatus status={status} /> : 'Status'}
      </Status>
    </StyledListItem>
  )
}

export default AssigneeItem
