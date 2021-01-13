import React, { ChangeEvent, ReactElement, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'

import usePaginatedQuery from '../../lib/hooks/usePaginatedQuery'
import Pagination from '../../lib/Pagination'
import { Order, OrderState } from '../../lib/types'
import ORDER_LIST from '../../operations/queries/OrderList'
import { useAppContext } from '../app/AppContext'
import ContainerCard from '../../lib/components/atoms/ContainerCard'
import OrderList from '../orderList/OrderList'
import { Filters, Select, SearchFilters } from '../ticketDashboard/TicketDashboard.styled'
import useSearchState, { SearchState } from '../../lib/hooks/useSearchState'

const ORDERS_PER_PAGE = 20

const OrdersDashboard = (): ReactElement => {
  const { conferenceSlug, token } = useAppContext()
  const [orderStateFilter, setOrderStateFilter] = useState<string | undefined>()

  const processInitialSearchState = (state: SearchState) => {
    if (state.orderState) setOrderStateFilter(state.orderState as string)
  }
  const { searchState, setSearchState } = useSearchState({ processInitialSearchState })

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
    currentPage,
  } = usePaginatedQuery<Order, 'orders', typeof variables, typeof context>({
    context,
    initialPage: searchState?.page as string,
    query: ORDER_LIST,
    variables,
  })

  useEffect(() => {
    if (currentPage) {
      setSearchState({ ...searchState, page: currentPage })
    }
  }, [currentPage])

  const handleOrderStatusFilterChange = (event: ChangeEvent<HTMLSelectElement>) => {
    if (event?.target?.value) {
      setOrderStateFilter(event.target.value)
    } else {
      setOrderStateFilter(undefined)
    }

    setSearchState({ ...searchState, orderState: event?.target?.value })
  }

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
              onChange={handleOrderStatusFilterChange}
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
