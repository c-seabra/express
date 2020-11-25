import React from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import { Ticket } from '../app/App'

const ColumnStyles = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.25rem;
`
const Column = styled(ColumnStyles)`
  width: 10%;
`
const Email = styled(ColumnStyles)`
  width: 20%;
  white-space: pre-wrap;
  word-wrap: break-word;
`
const State = styled.div`
  border-radius: 8px;
  padding: .25rem .5rem;
  font-size: .825rem;
  font-weight: 400;
  text-transform: uppercase;
  text-shadow: 0 1px 2px rgba(0,0,0,.5);
`
const ActiveState = styled(State)`
  background-color: #00ac93;
  color: #fff;
`
const UnassignedState = styled(State)`
  background-color: #ffb74c;
  color: #fff;
`
const VoidState = styled(State)`
  background-color: #ed1846;
  color: #fff;
`

const StyledListItem = styled.li`
  font-size: 1rem;
  display: flex;
  padding: 1rem 0.75rem;
  background-color: gainsboro;
  &:nth-child(2n + 1) {
    background-color: #fff;
  }
  &:hover {
    background-color: lightgrey;
    cursor: pointer;
  }
`

const ticketItem: React.FC<Ticket> = ticket => {
  const history = useHistory()
  
  let assignmentState = <UnassignedState>{ticket.assignment?.state}</UnassignedState>
  switch (ticket.assignment?.state) {
    case 'ACCEPTED':
      assignmentState = <ActiveState>Assigned</ActiveState>
      break;
    case 'DUPLICATE':
      assignmentState = <UnassignedState>Duplicate</UnassignedState>
      break;
    case 'PENDING':
      assignmentState = <UnassignedState>Pending</UnassignedState>
      break;
  }

let ticketState = <UnassignedState>{ticket.state}</UnassignedState>
  switch (ticket.state) {
    case 'ACTIVE':
      ticketState = <ActiveState>Active</ActiveState>
      break;
    case 'CHECKED_IN':
      ticketState = <UnassignedState>Checked In</UnassignedState>
      break;
    case 'LOCKED':
      ticketState = <ActiveState>Locked</ActiveState>
      break;
    case 'VOID':
      ticketState = <VoidState>Void</VoidState>
      break;
  }

  return (
    <StyledListItem onClick={() => history.push(`tickets/${ticket.bookingRef}`)}>
      <Column>{ticket.bookingRef}</Column>
      <Column>{ticket.ticketType?.name}</Column>
      <Column>
        {ticket.assignment?.assignee.firstName} {ticket.assignment?.assignee.lastName}
      </Column>
      <Email>{ticket.assignment?.assignee.email}</Email>
      <Column>
        {ticket.assignment === null ? (
          <UnassignedState>Unassigned</UnassignedState>
        ) : assignmentState}
      </Column>
      <Column>{ticketState}</Column>
      <Column>
        {ticket.order.owner.firstName} {ticket.order.owner.lastName}
      </Column>
      <Email>
        {ticket.order.owner.email}
      </Email>
    </StyledListItem>
  )
}

export default ticketItem
