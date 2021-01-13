import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet'

import usePaginatedQuery from '../../lib/hooks/usePaginatedQuery'
import ORDER_LIST from '../../operations/queries/OrderList'
import { Order } from '../../lib/types'
import { useAppContext } from '../app/AppContext'
import Pagination from '../../lib/Pagination'
import ContainerCard from '../../lib/components/atoms/ContainerCard'
import OrderList from '../orderList/OrderList'

const ORDERS_PER_PAGE = 20

const OrdersDashboard = (): ReactElement => {
  const { conferenceSlug, token } = useAppContext()

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
      <ContainerCard>
        <OrderList error={error} list={results} loading={loading} />
      </ContainerCard>
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
