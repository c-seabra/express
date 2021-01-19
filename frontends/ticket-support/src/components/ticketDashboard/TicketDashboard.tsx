import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useHistory, useLocation } from 'react-router-dom'

import ContainerCard from '../../lib/components/atoms/ContainerCard'
import SearchInput from '../../lib/components/molecules/SearchInput'
import usePaginatedQuery from '../../lib/hooks/usePaginatedQuery'
import useSearchState from '../../lib/hooks/useSearchState'
import useTicketTypesQuery from '../../lib/hooks/useTicketTypesQuery'
import Pagination from '../../lib/Pagination'
import { Ticket } from '../../lib/types'
import { searchStateToUrl } from '../../lib/utils/url'
import TICKET_LIST from '../../operations/queries/TicketList'
import { useAppContext } from '../app/AppContext'
import TicketList from '../ticketList/TicketList'
import {
  DashboardContainer,
  Filters,
  MultiSelect,
  SearchFilters,
  Select,
} from './TicketDashboard.styled'

const TICKETS_PER_PAGE = 20

export enum TicketFilterStatus {
  ACCEPTED = 'Accepted',
  ASSIGNED = 'Assigned',
  CHECKED_IN = 'Checked In',
  DUPLICATE = 'Duplicate',
  LOCKED = 'Locked',
  REJECTED = 'Rejected',
  UNASSIGNED = 'Unassigned',
  VOID = 'Void',
}

const useTicketsQuery = ({
  initialPage,
  searchQuery,
  ticketStatusFilter,
  ticketTypesFilter,
}: {
  initialPage: string
  searchQuery: string
  ticketStatusFilter?: string
  ticketTypesFilter?: (string | undefined)[]
}) => {
  const { conferenceSlug, token } = useAppContext()

  const variables = {
    filter: {
      status: ticketStatusFilter,
      ticketTypeIds: ticketTypesFilter,
    },
    first: TICKETS_PER_PAGE,
    searchQuery,
  }

  const context = {
    slug: conferenceSlug,
    token,
  }

  return usePaginatedQuery<Ticket, 'tickets', typeof variables, typeof context>({
    context,
    initialPage,
    query: TICKET_LIST,
    variables,
  })
}

type TicketSearchState = {
  page: string
  search: string
  ticketStatus: string
  ticketTypeIds: string
}

const TicketDashboard: React.FC = () => {
  const location = useLocation()
  const history = useHistory()
  const { pathname } = location
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [ticketStatusFilter, setTicketStatusFilter] = useState<string | undefined>()
  const [ticketTypesFilter, setTicketTypesFilter] = useState<Array<string | undefined>>()

  const processInitialSearchState = (state: TicketSearchState) => {
    if (state.search) setSearchQuery(state.search)
    if (state.ticketStatus) setTicketStatusFilter(state.ticketStatus)
    if (state.ticketTypeIds) {
      const fixTypeTicketTypeIds = state.ticketTypeIds
      const ticketTypeIdsArray = fixTypeTicketTypeIds.split(',')
      setTicketTypesFilter(ticketTypeIdsArray)
    }
  }

  const { searchState, setSearchState } = useSearchState<TicketSearchState>({
    processInitialSearchState,
  })

  const {
    results,
    currentPage,
    error,
    loading,
    isForwardDisabled,
    isBackwardsDisabled,
    nextPage,
    previousPage,
    resetPage,
  } = useTicketsQuery({
    initialPage: searchState.page,
    searchQuery: searchState.search,
    ticketStatusFilter,
    ticketTypesFilter,
  })

  useEffect(() => {
    if (currentPage) {
      setSearchState({ ...searchState, page: currentPage })
    }
  }, [currentPage])

  useEffect(() => {
    const url = searchStateToUrl({ pathname, searchState })
    history.push(url)
  }, [searchState])

  const handleSearchKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const element = e.currentTarget as HTMLInputElement
      setSearchState({ ...searchState, search: element.value })
      resetPage()
    }
  }

  const handleTicketStatusFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value) {
      setTicketStatusFilter(e.target.value)
    } else {
      setTicketStatusFilter(undefined)
    }
    setSearchState({ ...searchState, ticketStatus: e.target.value })
    resetPage()
  }

  const handleTicketTypeFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const element = e.currentTarget as HTMLSelectElement
    const ticketTypeIds = Array.from(element.selectedOptions, option => option.value)
    if (ticketTypeIds.length > 0) {
      setTicketTypesFilter(ticketTypeIds)
    } else {
      setTicketTypesFilter(undefined)
    }
    setSearchState({ ...searchState, ticketTypeIds: ticketTypeIds.toString() })
    resetPage()
  }

  const ticketTypes = useTicketTypesQuery()

  return (
    <DashboardContainer>
      <Helmet>
        <title>Tickets list - Ticket machine</title>
      </Helmet>
      <SearchFilters>
        <SearchInput
          defaultValue={searchQuery}
          placeholder="Search by name, reference or email of ticket or order"
          type="text"
          onChange={e => setSearchQuery(e.target.value)}
          onKeyDown={handleSearchKey}
        />
        <Filters>
          <Select>
            <span>Ticket status</span>
            <select
              name="filter[status]"
              value={ticketStatusFilter}
              onChange={e => handleTicketStatusFilterChange(e)}
            >
              <option value="">All</option>
              {Object.entries(TicketFilterStatus).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>
          </Select>
          {ticketTypes && (
            <MultiSelect>
              <span>Ticket types(ctrl/cmd + click to select/deselect)</span>
              <select
                multiple
                defaultValue={(ticketTypesFilter as string[]) || ([''] as string[])}
                name="filter[status]"
                onChange={e => handleTicketTypeFilterChange(e)}
              >
                {ticketTypes.map(ticketType => (
                  <option key={ticketType.id} value={ticketType.id}>
                    {ticketType.name}
                  </option>
                ))}
              </select>
            </MultiSelect>
          )}
        </Filters>
      </SearchFilters>
      <ContainerCard noPadding>
        <TicketList error={error} list={results} loading={loading} />
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

export default TicketDashboard
