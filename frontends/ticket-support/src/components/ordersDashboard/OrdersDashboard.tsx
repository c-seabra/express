import React, { ReactElement, useState } from 'react'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'

import usePaginatedQuery from '../../lib/hooks/usePaginatedQuery'
import Loader from '../../lib/Loading'
import Pagination from '../../lib/Pagination'
import { Order, OrderState } from '../../lib/types'
import ORDER_LIST from '../../operations/queries/OrderList'
import { useAppContext } from '../app/AppContext'
import OrderItem from '../orderItem/OrderItem'
import { Filters, Select, SearchFilters } from '../ticketDashboard/TicketDashboard.styled'
import OrdersDashboardHeader from './OrdersDashboardHeader'

const StyledList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  overflow: hidden;
  border-radius: 4px;
  border: 1px solid grey;
`

const ORDERS_PER_PAGE = 20

const OrdersDashboard = (): ReactElement => {
  const { conferenceSlug, token } = useAppContext()
  const [orderStateFilter, setOrderStateFilter] = useState<string | undefined>()

  const context = {
    slug: conferenceSlug,
    token,
  }

  const filter = {
    status: orderStateFilter || undefined,
  }

  const variables = {
    filter,
    first: ORDERS_PER_PAGE,
  }

  const {
    loading,
    results,
    error,
    isForwardDisabled,
    isBackwardsDisabled,
    nextPage,
    previousPage,
  } = usePaginatedQuery<Order, 'orders', typeof variables, typeof context>({
    context,
    query: ORDER_LIST,
    variables,
  })

  return (
    <div>
      <Helmet>
        <title>Orders list - Ticket machine</title>
      </Helmet>
      <SearchFilters>
        <Filters>
          <Select>
            <span>Order state</span>
            <select
              name="filter[state]"
              value={orderStateFilter}
              onChange={e => setOrderStateFilter(e?.target?.value)}
            >
              <option value="">All</option>
              {Object.keys(OrderState).map(key => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
          </Select>
        </Filters>
      </SearchFilters>
      <StyledList>
        <OrdersDashboardHeader />
        {loading ? (
          <Loader />
        ) : (
          results.map(result => <OrderItem key={result.reference} order={result} />)
        )}
        {error && error.message}
      </StyledList>
      {!loading && !error && (
        <Pagination
          isForwardDisabled={isForwardDisabled}
          isPreviousDisabled={isBackwardsDisabled}
          nextPage={nextPage}
          previousPage={previousPage}
        />
      )}
    </div>
  )
}

export default OrdersDashboard
