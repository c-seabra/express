import React from 'react'
import styled from 'styled-components'

const State = styled.span`
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
const LockedState = styled(State)`
  background-color: #0d153a;
  color: #fff;
`

const StatePlate = ({state}: {state:string}) => {

  switch (state) {
    case 'ACTIVE':
      return <ActiveState>Active</ActiveState>
    case 'CHECKED_IN':
      return <UnassignedState>Checked In</UnassignedState>
    case 'LOCKED':
      return <LockedState>Locked</LockedState>
    case 'VOID':
      return <VoidState>Void</VoidState>
    case 'ACCEPTED':
      return <ActiveState>Accepted</ActiveState>
    case 'DUPLICATE':
      return <UnassignedState>Duplicate</UnassignedState>
    case 'PENDING':
      return <UnassignedState>Pending</UnassignedState>
    default:
      return <UnassignedState>{state}</UnassignedState>
  }
}

export default StatePlate
