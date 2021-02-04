import React, { ReactElement } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import { Order, OrderState, TicketsSummary } from '../../lib/types'
import { Badge } from '../../lib/components'

const ColumnStyles = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
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
  font-size: 0.85rem;
  display: flex;
  padding: 0.75rem;
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
  margin-top: 1rem;

  &:hover {
    background-color: white;
    cursor: initial;
  }
`

const ActiveState = styled(Badge)`
  background-color: #eaf9ea;
  color: #44c242;
  max-height: 32px;
`
const CancelledState = styled(Badge)`
  background-color: #f14d4c;
  color: #d8d8d8;
  max-height: 32px;
`

const BadgeColumn = styled(Column)`
  justify-content: center;

  & > span {
    line-height: 16px;
  }
`

export const OrderListHeader = () => {
  return (
    <ListHeaderItem>
      <Column>Order Reference</Column>
      <Column>Ticket Type</Column>
      <Column>Ticket Owner</Column>
      <Email>Email Used</Email>
      <BadgeColumn>Ticket Status</BadgeColumn>
      <BadgeColumn>Order State</BadgeColumn>
    </ListHeaderItem>
  )
}

const StateLabel = ({ state }: { state: OrderState }): ReactElement => {
  switch (state) {
    case OrderState.ACTIVE:
      return <ActiveState>Active</ActiveState>
    case OrderState.CANCELLED:
      return <CancelledState>Cancelled</CancelledState>
    default:
      return <>{state}</>
  }
}

const getTicketStatusesCount = (ticketsSummary: TicketsSummary): string => {
  if (!ticketsSummary) return ''

  const { all } = ticketsSummary

  const assignedCounts = {
    accepted: all?.active?.assigned?.accepted?.count || 0,
    checkedIn: all?.active?.assigned?.checkedIn?.count || 0,
    duplicate: all?.active?.assigned?.duplicate?.count || 0,
    locked: all?.active?.assigned?.locked?.count || 0,
    pending: all?.active?.assigned?.pending?.count || 0,
  }

  const assignedTicketsAmount = Object.entries(assignedCounts).reduce(
    (previousValue, [, value]) => previousValue + value,
    0
  )

  const allStateCounts = {
    ...assignedCounts,
    neverAssigned: all?.active?.unassigned?.neverAssigned?.count || 0,
    rejected: all?.active?.unassigned?.rejected?.count || 0,
    void: all?.void?.count || 0,
  }

  const allTicketsAmount = Object.entries(allStateCounts).reduce(
    (previousValue, [, value]) => previousValue + value,
    0
  )

  return `${assignedTicketsAmount} / ${allTicketsAmount} Assigned`
}

const OrderItem = ({ order }: { order: Order }): ReactElement => {
  const history = useHistory()

  const assignedTicketsCount = getTicketStatusesCount(order.ticketsSummary)
  const ticketCount = order.ticketsSummary?.all?.count

  return (
    <StyledListItem onClick={() => history.push(`/order/${order.reference}`)}>
      <Column>{order.reference}</Column>
      <Column>
        {order.summary?.ticketType?.name || (ticketCount > 0 && `${ticketCount} mixed tickets`)}
      </Column>
      <Column>
        {order?.owner?.firstName} {order?.owner?.lastName}
      </Column>
      <Email>{order.owner?.email}</Email>
      <BadgeColumn>{assignedTicketsCount}</BadgeColumn>
      <BadgeColumn>
        <StateLabel state={order.state} />
      </BadgeColumn>
    </StyledListItem>
  )
}

export default OrderItem
