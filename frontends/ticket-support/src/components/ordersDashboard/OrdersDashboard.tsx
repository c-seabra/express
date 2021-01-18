import React, { ChangeEvent, ReactElement, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'

import usePaginatedQuery from '../../lib/hooks/usePaginatedQuery'
import Pagination from '../../lib/Pagination'
import { Order, OrderState } from '../../lib/types'
import ORDER_LIST from '../../operations/queries/OrderList'
import { useAppContext } from '../app/AppContext'
import ContainerCard from '../../lib/components/atoms/ContainerCard'
import OrderList from '../orderList/OrderList'
import {
  Filters,
  Select,
  SearchFilters,
  DashboardContainer,
  StyledSearchInput,
} from '../ticketDashboard/TicketDashboard.styled'
import useSearchState from '../../lib/hooks/useSearchState'
import TextHeading from '../../lib/components/atoms/Heading'

const ORDERS_PER_PAGE = 20

const useOrdersQuery = ({
  initialPage,
  searchQuery,
  status,
}: {
  initialPage: string
  searchQuery: string
  status: string
}) => {
  const { conferenceSlug, token } = useAppContext()

  const context = {
    slug: conferenceSlug,
    token,
  }

  const filter = {
    status,
  }

  const variables = {
    filter,
    first: ORDERS_PER_PAGE,
    searchQuery,
  }

  return usePaginatedQuery<Order, 'orders', typeof variables, typeof context>({
    context,
    initialPage,
    query: ORDER_LIST,
    variables,
  })
}

type OrderSearchState = {
  orderState: string
  page: string
  searchQuery: string
}

const OrdersDashboard = (): ReactElement => {
  const [orderStateFilter, setOrderStateFilter] = useState<string | undefined>()
  const [searchQuery, setSearchQuery] = useState('')

  const processInitialSearchState = (state: OrderSearchState) => {
    if (state.orderState) setOrderStateFilter(state.orderState)
    if (state.searchQuery) setSearchQuery(state.searchQuery)
  }
  const { searchState, setSearchState } = useSearchState<OrderSearchState>({
    processInitialSearchState,
  })

  const {
    loading,
    results,
    error,
    isForwardDisabled,
    isBackwardsDisabled,
    nextPage,
    previousPage,
    currentPage,
  } = useOrdersQuery({
    initialPage: searchState.page,
    searchQuery: searchState.searchQuery,
    status: searchState.orderState,
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

  const handleSearchKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const element = e.currentTarget as HTMLInputElement
      setSearchState({ ...searchState, searchQuery: element.value })
      setSearchQuery(element.value)
    }
  }

  return (
    <DashboardContainer>
      <Helmet>
        <title>Orders list - Ticket machine</title>
      </Helmet>
      <SearchFilters>
        <TextHeading>Manage orders</TextHeading>
        <StyledSearchInput
          defaultValue={searchQuery}
          placeholder="Search by Order number, order owner’s name or email, company name."
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          onKeyDown={handleSearchKey}
        />
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
      <ContainerCard noPadding>
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
    </DashboardContainer>
  )
}

export default OrdersDashboard
