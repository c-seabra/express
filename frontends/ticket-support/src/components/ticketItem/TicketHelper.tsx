import React from 'react'
import styled from 'styled-components'

export const State = styled.div`
  border-radius: 8px;
  padding: .25rem .5rem;
  font-size: .825rem;
  font-weight: 400;
  text-transform: uppercase;
  text-shadow: 0 1px 2px rgba(0,0,0,.5);
`
export const ActiveState = styled(State)`
  background-color: #00ac93;
  color: #fff;
`
export const UnassignedState = styled(State)`
  background-color: #ffb74c;
  color: #fff;
`
export const VoidState = styled(State)`
  background-color: #ed1846;
  color: #fff;
`

export function getAssignmentBadge(state: string | undefined) {
  let assignmentState = <UnassignedState>{state}</UnassignedState>
  switch (state) {
    case 'ACCEPTED':
      assignmentState = <ActiveState>Accepted</ActiveState>
      break;
    case 'DUPLICATE':
      assignmentState = <UnassignedState>Duplicate</UnassignedState>
      break;
    case 'PENDING':
      assignmentState = <UnassignedState>Pending</UnassignedState>
      break;
  }
  return assignmentState
}

export function getTicketBadge(state: string | undefined) {
  let ticketState = <UnassignedState>{state}</UnassignedState>
  switch (state) {
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
  return ticketState
}
