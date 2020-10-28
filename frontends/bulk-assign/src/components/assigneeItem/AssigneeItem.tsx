import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { useMutation } from '@apollo/client';
import TICKET_ASSIGN_MUTATION from '../../operations/mutations/TicketAssign'

import UploadStatus from '../statusIcon/StatusIcon'

import getCookie from '../../lib/utils/getCookieByName'

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


const AssigneeItem = ({conferenceSlug, bookingRef, firstName, lastName, email, ticketId} : {
  conferenceSlug: string
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
  const token = getCookie('token')

  const [ticketAssign] = useMutation(TICKET_ASSIGN_MUTATION, {
    onCompleted: ({ ticketAssign }) => {
      if (ticketAssign?.ticket?.assignment?.assignee) {
        setStatus({
          message: 'Assignment has been successful',
          type: 'success'
        })
      }
      if (ticketAssign?.userErrors.length) {
        setStatus({
          message: ticketAssign.userErrors[0].message,
          type: 'error'
        })
      }
    }
  });
  const reassignTicket = (firstName, lastName, email, ticketId) => {
    if(token && firstName && lastName && email && ticketId){
      ticketAssign({
        context: {
          token,
          slug: conferenceSlug
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
      reassignTicket(firstName, lastName, email, ticketId)
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
