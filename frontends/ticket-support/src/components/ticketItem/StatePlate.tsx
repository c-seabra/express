import React from 'react'
import styled from 'styled-components'

import Tooltip from '../../lib/Tooltip'

const State = styled.span`
  border-radius: 8px;
  padding: 0.25rem 0.5rem;
  font-size: 0.825rem;
  font-weight: 400;
  text-transform: uppercase;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
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
const LockedState = styled(State)`
  background-color: #0d153a;
  color: #fff;
`

const StatePlate = ({ state }: { state: string }) => {
  switch (state) {
    case 'ACTIVE':
      return (
        <Tooltip
          content="Ticket hasn't yet been used to login, attend physical event or been voided"
          title={<ActiveState>Active</ActiveState>}
        />
      )
    case 'CHECKED_IN':
      return (
        <Tooltip
          content="Assignee has checked into the physical event"
          title={<UnassignedState>Checked In</UnassignedState>}
        />
      )
    case 'LOCKED':
      return (
        <Tooltip
          content="Ticket is locked due to logging into our app"
          title={<LockedState>Locked</LockedState>}
        />
      )
    case 'VOID':
      return <Tooltip content="Ticket is voided" title={<VoidState>Void</VoidState>} />
    case 'ACCEPTED':
      return (
        <Tooltip
          content="Assignee has accepted(claimed) the ticket"
          title={<ActiveState>Accepted</ActiveState>}
        />
      )
    case 'DUPLICATE':
      return (
        <Tooltip
          content="This assignee has duplicate tickets assigned"
          title={<UnassignedState>Duplicate</UnassignedState>}
        />
      )
    case 'PENDING':
      return (
        <Tooltip
          content="Assignment waiting for assignees engagement"
          title={<UnassignedState>Pending</UnassignedState>}
        />
      )
    case 'UNASSIGNED':
      return (
        <Tooltip
          content="This ticket hasn't yet been assigned"
          title={<UnassignedState>Unassigned</UnassignedState>}
        />
      )
    default:
      return (
        <Tooltip
          content={`This ticket is in ${state} state`}
          title={<UnassignedState>{state}</UnassignedState>}
        />
      )
  }
}

export default StatePlate
