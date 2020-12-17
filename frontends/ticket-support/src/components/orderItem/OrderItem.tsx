import React, { ReactElement } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import { Order } from '../../lib/types'

const ColumnStyles = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.25rem;
  word-break: break-word;
`
const Column = styled(ColumnStyles)`
  width: 15%;
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
  justify-content: space-between;
  &:nth-child(2n + 1) {
    background-color: #fff;
  }
  &:hover {
    background-color: lightgrey;
    cursor: pointer;
  }
`

const OrderItem = ({ order }: { order: Order }): ReactElement => {
  const history = useHistory()

  return (
    <StyledListItem onClick={() => history.push(`/order/${order.reference}`)}>
      <Column>{order.reference}</Column>
      <Column>{order.summary.ticketType.name}</Column>
      <Column>
        {order.owner.firstName} {order.owner.lastName}
      </Column>
      <Email>{order.owner.email}</Email>
      {/* TODO: add ticket status - number of assigned tickets / all tickets */}
      {/* <Column>ticket status</Column> */}
      {/* TODO: add order status - ACTIVE/CANCELLED */}
      {/* <Column>order state</Column> */}
    </StyledListItem>
  )
}

export default OrderItem
