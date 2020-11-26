import React from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import { Ticket } from '../app/App'
import StatePlate from './StatePlate'

const ColumnStyles = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.25rem;
  word-break: break-word;
`
const Column = styled(ColumnStyles)`
  width: 10%;
`
const Email = styled(ColumnStyles)`
  width: 20%;
  white-space: pre-wrap;
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

  const assignmentState = !ticket.assignment ? 'Unassigned' : ticket.assignment?.state as string

  return (
    <StyledListItem onClick={() => history.push(`tickets/${ticket.bookingRef}`)}>
      <Column>{ticket.bookingRef}</Column>
      <Column>{ticket.ticketType?.name}</Column>
      <Column>
        {ticket.assignment?.assignee.firstName} {ticket.assignment?.assignee.lastName}
      </Column>
      <Email>{ticket.assignment?.assignee.email}</Email>
      <Column><StatePlate state={assignmentState}/></Column>
      <Column><StatePlate state={ticket.state}/></Column>
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
