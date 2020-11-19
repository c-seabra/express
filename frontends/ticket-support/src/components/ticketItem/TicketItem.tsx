import React from 'react'
import styled from 'styled-components'

import { Ticket } from '../app/App'

const Column = styled.div`
  width: calc(15% - 1rem);
  text-align: center;
  font-weight: bold;
`
const Email = styled.div`
  width: calc(30% - 1rem);
  text-align: center;
  font-weight: bold;
`
const State = styled.div`
  width: calc(10% - 1rem);
  display: flex;
  align-items: center;
  justify-content: center;
`
const StyledListItem = styled.li`
  font-size: 1.2em;
  display: flex;
  margin-bottom: 0.5rem;
  padding: 0.75rem;
  background-color: gainsboro;
  &:nth-child(2n + 1) {
    background-color: white;
  }
  ${Column}, ${State} {
    margin-right: 1rem;
  }
`

const ticketItem: React.FC<Ticket> = ticket => {
  let state = ticket.state
  if (state == 'ACTIVE') {
    state = ticket.assignment?.state || 'UNASSIGNED'
  }

  return (
    <StyledListItem>
      <Column>{ticket.bookingRef}</Column>
      <Column>{ticket.ticketType?.name}</Column>
      <Column>
        {ticket.assignment?.assignee.firstName} {ticket.assignment?.assignee.lastName}
      </Column>
      <Email>{ticket.assignment?.assignee.email}</Email>
      <State>{state}</State>
      <Column>
        {ticket.order.owner.firstName} {ticket.order.owner.lastName}
      </Column>
    </StyledListItem>
  )
}

export default ticketItem
