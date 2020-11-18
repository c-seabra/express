import React from 'react'
import styled from 'styled-components'

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
  margin-bottom: .5rem;
  padding: .75rem;
  background-color: gainsboro;
  &:nth-child(2n + 1) {
    background-color: white;
  }
  ${Column}, ${State} {
    margin-right: 1rem;
  }
`

const TicketListHeader: React.FC = () => {
  return (
    <StyledListItem>
      <Column>Booking Ref</Column>
      <Column>Ticket Type</Column>
      <Column>Assigned To</Column>
      <Email>Email Used</Email>
      <State>Status</State>
      <Column>Ticket Owner</Column>
    </StyledListItem>
  )
}

export default TicketListHeader
