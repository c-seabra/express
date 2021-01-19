import React, { ReactElement, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'

import ContainerCard from '../../lib/components/atoms/ContainerCard'
import FilterButton from '../../lib/components/atoms/FilterButton'
import TextHeading from '../../lib/components/atoms/Heading'
import CategoryList, { CategoryItem } from '../../lib/components/molecules/CategoryList'
import PopupButton from '../../lib/components/molecules/PopupButton'
import usePaginatedQuery from '../../lib/hooks/usePaginatedQuery'
import useSearchState from '../../lib/hooks/useSearchState'
import Pagination from '../../lib/Pagination'
import { Order, OrderState } from '../../lib/types'
import ORDER_LIST from '../../operations/queries/OrderList'
import { useAppContext } from '../app/AppContext'
import OrderList from '../orderList/OrderList'
import {
  DashboardContainer,
  FiltersSearchContainer,
  SearchFilters,
  StyledSearchInput,
} from '../ticketDashboard/TicketDashboard.styled'

const ORDERS_PER_PAGE = 20

const useOrdersQuery = ({
  initialPage,
  searchQuery,
  status,
}: {
  initialPage: string
  searchQuery: string
  status?: string
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
  orderState?: string
  page: string
  searchQuery: string
}

const OrdersDashboard = (): ReactElement => {
  const [searchQuery, setSearchQuery] = useState('')

  const processInitialSearchState = (state: OrderSearchState) => {
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

  const orderStatusOptions = [
    ...Object.keys(OrderState).map(key => ({
      isSelected: key === searchState.orderState,
      label: key.charAt(0).toUpperCase() + key.slice(1).toLowerCase(),
      value: key,
    })),
    { isSelected: false, label: 'All', value: 'all' },
  ]

  const handleOrderStatusFilterChange = ({ isSelected, value }: CategoryItem) => {
    if (!isSelected) {
      if (value === 'all') {
        setSearchState({ ...searchState, orderState: undefined })
      } else {
        setSearchState({ ...searchState, orderState: value })
      }
    } else {
      setSearchState({ ...searchState, orderState: undefined })
    }
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
        <FiltersSearchContainer>
          <StyledSearchInput
            defaultValue={searchQuery}
            placeholder="Search by Order number, order owner’s name or email, company name."
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            onKeyDown={handleSearchKey}
          />
          <PopupButton renderButton={props => <FilterButton {...props} />}>
            <CategoryList
              headerColor="#CB1977"
              items={orderStatusOptions}
              title="Order status"
              onSingleClick={handleOrderStatusFilterChange}
            />
          </PopupButton>
        </FiltersSearchContainer>
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
