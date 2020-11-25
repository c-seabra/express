import React from 'react'
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
  margin-bottom: 0.5rem;
  padding: 0.75rem;
  background-color: gainsboro;
  &:nth-child(2n + 1) {
    background-color: #fff;
  }
`

const ticketItem: React.FC<Ticket> = ticket => {

  return (
    <StyledListItem>
      <Column>{ticket.bookingRef}</Column>
      <Column>{ticket.ticketType?.name}</Column>
      <Column>
        {ticket.assignment?.assignee.firstName} {ticket.assignment?.assignee.lastName}
      </Column>
      <Email>{ticket.assignment?.assignee.email}</Email>
      <Column>
        {ticket.assignment?.state === 'ACCEPTED' && <ActiveState>Assigned</ActiveState>}
        {(ticket.assignment === null || ticket.assignment?.state === 'DUPLICATE') && <UnassignedState>Unassigned</UnassignedState>}
        {ticket.assignment?.state === 'PENDING' && <UnassignedState>Pending</UnassignedState>}
      </Column>
      <Column>
        {ticket.state === 'ACTIVE' && <ActiveState>Active</ActiveState>}
        {ticket.state === 'CHECKED_IN' && <UnassignedState>Checked In</UnassignedState>}
        {ticket.state === 'LOCKED' && <ActiveState>Locked</ActiveState>}
        {ticket.state === 'VOID' && <VoidState>Void</VoidState>}
      </Column>
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
