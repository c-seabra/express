import React, { ReactElement } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import { Order, OrderState, TicketsSummary } from '../../lib/types'
import { Badge } from '../../lib/components'

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
const TicketStatusesColumn = styled(Column)`
  flex-direction: column;
  font-size: 12px;

  & > div {
    margin-bottom: 4px;
  }
`

const Email = styled(ColumnStyles)`
  width: 20%;
  white-space: pre-wrap;
`

const StyledListItem = styled.li`
  font-size: 0.85rem;
  display: flex;
  padding: 1rem 0.75rem;
  background-color: #fff;

  border-bottom: 1px solid #dde0e5;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #dde0e5;
    cursor: pointer;
  }
`

const ListHeaderItem = styled(StyledListItem)`
  font-weight: 600;
  text-align: center;

  &:hover {
    background-color: white;
    cursor: initial;
  }
`

const ActiveState = styled(Badge)`
  background-color: #eaf9ea;
  color: #44c242;
`
const CancelledState = styled(Badge)`
  background-color: #f14d4c;
  color: #d8d8d8;
`

export const OrderListHeader = () => {
  return (
    <ListHeaderItem>
      <Column>Order Reference</Column>
      <Column>Ticket Type</Column>
      <Column>Ticket Owner</Column>
      <Email>Email Used</Email>
      <Column>Ticket Status</Column>
      <Column>Order State</Column>
    </ListHeaderItem>
  )
}

const StateLabel = ({ state }: { state: OrderState }): ReactElement => {
  switch (state) {
    case OrderState.ACTIVE:
      return <ActiveState>{state}</ActiveState>
    case OrderState.CANCELLED:
      return <CancelledState>{state}</CancelledState>
    default:
      return <>{state}</>
  }
}

const getTicketStatusesCount = (
  ticketsSummary: TicketsSummary
): { count: number; label: string }[] => {
  if (!ticketsSummary) return []

  const { all } = ticketsSummary

  const allStateCounts = {
    accepted: all?.active?.assigned?.accepted?.count || 0,
    checkedIn: all?.active?.assigned?.checkedIn?.count || 0,
    duplicate: all?.active?.assigned?.duplicate?.count || 0,
    locked: all?.active?.assigned?.locked?.count || 0,
    neverAssigned: all?.active?.unassigned?.neverAssigned?.count || 0,
    pending: all?.active?.assigned?.pending?.count || 0,
    rejected: all?.active?.unassigned?.rejected?.count || 0,
    void: all?.void?.count || 0,
  }

  return Object.entries(allStateCounts)
    .map(([key, value]) => ({
      count: value,
      label: key
        .split(/(?=[A-Z])/) // For object keys like `neverAssigned` to split at a capital letter
        .join(' ')
        .toUpperCase(),
    }))
    .filter(({ count }) => count)
}

const OrderItem = ({ order }: { order: Order }): ReactElement => {
  const history = useHistory()

  const ticketStatuses = getTicketStatusesCount(order.ticketsSummary)

  return (
    <StyledListItem onClick={() => history.push(`/order/${order.reference}`)}>
      <Column>{order.reference}</Column>
      <Column>{order.summary?.ticketType?.name}</Column>
      <Column>
        {order?.owner?.firstName} {order?.owner?.lastName}
      </Column>
      <Email>{order.owner?.email}</Email>
      <TicketStatusesColumn>
        {ticketStatuses.map(({ count, label }) => (
          <div key={label}>
            {count} {label}
          </div>
        ))}
      </TicketStatusesColumn>
      <Column>
        <StateLabel state={order.state} />
      </Column>
    </StyledListItem>
  )
}

export default OrderItem
