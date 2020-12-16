import React, { ReactElement, useContext } from 'react'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'

import Loader from '../../lib/Loading'
import usePaginatedQuery from '../../lib/hooks/usePaginatedQuery'
import ORDER_LIST from '../../operations/queries/OrderList'
import { Order } from '../../lib/types'
import { AppContext } from '../app/App'
import OrdersDashboardHeader from './OrdersDashboardHeader'
import Pagination from '../../lib/Pagination'
import OrderItem from '../orderItem/OrderItem'

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
  const { conferenceSlug, token } = useContext(AppContext)

  const context = {
    slug: conferenceSlug,
    token,
  }

  const variables = {
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
