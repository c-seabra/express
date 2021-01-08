import React from 'react'
import styled from 'styled-components'

import { Badge, Tooltip } from '../../lib/components'

const ActiveState = styled(Badge)`
  background-color: #eaf9ea;
  color: #44c242;
`
const UnassignedState = styled(Badge)`
  background-color: #f8ba26;
  opacity: 0.2;
  color: #f8ba26;
`
const VoidState = styled(Badge)`
  background-color: #f14d4c;
  color: #d8d8d8;
`
const LockedState = styled(Badge)`
  background-color: #0d153a;
  color: #fff;
`

const StatePlate = ({ state }: { state: string }) => {
  switch (state) {
    case 'ACTIVE':
      return (
        <Tooltip content="Ticket hasn't yet been used to login, attend physical event or been voided">
          <ActiveState>Active</ActiveState>
        </Tooltip>
      )
    case 'CHECKED_IN':
      return (
        <Tooltip content="Assignee has checked into the physical event">
          <UnassignedState>Checked In</UnassignedState>
        </Tooltip>
      )
    case 'LOCKED':
      return (
        <Tooltip content="Ticket is locked due to logging into our app">
          <LockedState>Locked</LockedState>
        </Tooltip>
      )
    case 'VOID':
      return (
        <Tooltip content="Ticket is voided">
          <VoidState>Void</VoidState>
        </Tooltip>
      )
    case 'ACCEPTED':
      return (
        <Tooltip content="Assignee has accepted(claimed) the ticket">
          <ActiveState>Accepted</ActiveState>
        </Tooltip>
      )
    case 'DUPLICATE':
      return (
        <Tooltip content="This assignee has duplicate tickets assigned">
          <UnassignedState>Duplicate</UnassignedState>
        </Tooltip>
      )
    case 'PENDING':
      return (
        <Tooltip content="Assignment waiting for assignees engagement">
          <UnassignedState>Pending</UnassignedState>
        </Tooltip>
      )
    case 'UNASSIGNED':
      return (
        <Tooltip content="This ticket hasn't yet been assigned">
          <UnassignedState>Unassigned</UnassignedState>
        </Tooltip>
      )
    default:
      return (
        <Tooltip content={`This ticket is in ${state} state`}>
          <UnassignedState>{state}</UnassignedState>
        </Tooltip>
      )
  }
}

export default StatePlate
