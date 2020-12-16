import React from 'react'
import styled from 'styled-components'

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

const TicketItem = ({
  assignment,
  bookingRef,
  ticketState,
  orderOwner,
  ticketTypeName,
  handleOnClick,
}: {
  assignment?: {
    assignee?: {
      email?: string
      firstName?: string
      lastName?: string
    }
    state: string
  }
  bookingRef: string
  handleOnClick?: () => void
  orderOwner?: {
    email?: string
    firstName?: string
    lastName?: string
  }
  ticketState: string
  ticketTypeName: string
}) => {
  const assignmentState = !assignment ? 'UNASSIGNED' : assignment?.state

  return (
    <StyledListItem onClick={handleOnClick}>
      <Column>{bookingRef}</Column>
      <Column>{ticketTypeName}</Column>
      <Column>
        {assignment?.assignee?.firstName} {assignment?.assignee?.lastName}
      </Column>
      <Email>{assignment?.assignee?.email}</Email>
      <Column>
        <StatePlate state={assignmentState} />
      </Column>
      <Column>
        <StatePlate state={ticketState} />
      </Column>
      <Column>
        {orderOwner?.firstName} {orderOwner?.lastName}
      </Column>
      <Email>{orderOwner?.email}</Email>
    </StyledListItem>
  )
}

export default TicketItem
