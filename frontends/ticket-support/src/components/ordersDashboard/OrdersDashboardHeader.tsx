import React, { ReactElement } from 'react'
import styled from 'styled-components'

const ColumnStyles = styled.div`
  text-align: center;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.25rem;
`
const Column = styled(ColumnStyles)`
  width: 15%;
`
const Email = styled(ColumnStyles)`
  width: 20%;
  white-space: pre-wrap;
  word-wrap: break-word;
`
const StyledListItem = styled.li`
  font-size: 1rem;
  display: flex;
  margin: 0.5rem 0;
  padding: 0.75rem;
  background-color: gainsboro;
  justify-content: space-between;
  &:nth-child(2n + 1) {
    background-color: white;
  }
`

const OrdersDashboardHeader = (): ReactElement => {
  return (
    <StyledListItem>
      <Column>Order Reference</Column>
      <Column>Ticket Type</Column>
      <Column>Ticket Owner</Column>
      <Email>Email Used</Email>
      {/*  TODO - when fields are added, uncomment these columns */}
      {/* <Column>Ticket Status</Column> */}
      <Column>Order State</Column>
    </StyledListItem>
  )
}

export default OrdersDashboardHeader
