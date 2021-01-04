import { ApolloError, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useHistory, useLocation } from 'react-router-dom'

import SearchIcon from '../../lib/svgs/search'
import TICKET_LIST from '../../operations/queries/TicketList'
import TICKET_TYPES from '../../operations/queries/TickeTypes'
import { Ticket, TicketType } from '../../lib/types'
import TicketList from '../ticketList/TicketList'
import TicketDashboardHeader from './TicketDashboardHeader'
import {
  Select,
  Search,
  SearchFilters,
  Filters,
  MultiSelect,
  StyledList,
} from './TicketDashboard.styled'
import usePaginatedQuery from '../../lib/hooks/usePaginatedQuery'
import Pagination from '../../lib/Pagination'
import { useAppContext } from '../app/AppContext'
import { searchStateToUrl } from '../../lib/utils/url'
import useSearchState, { SearchState } from '../../lib/hooks/useSearchState'

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

const TicketDashboard: React.FC = () => {
  const { conferenceSlug, token } = useAppContext()
  const location = useLocation()
  const history = useHistory()
  const { pathname } = location
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [ticketStatusFilter, setTicketStatusFilter] = useState<string | undefined>()
  const [ticketTypesFilter, setTicketTypesFilter] = useState<Array<string | undefined>>()

  const processInitialSearchState = (state: SearchState) => {
    if (state.search) setSearchQuery(state.search as string)
    if (state.ticketStatus) setTicketStatusFilter(state.ticketStatus as string)
    if (state.ticketTypeIds) {
      const fixTypeTicketTypeIds = state.ticketTypeIds as string
      const ticketTypeIdsArray = fixTypeTicketTypeIds.split(',')
      setTicketTypesFilter(ticketTypeIdsArray)
    }
  }

  const { searchState, setSearchState } = useSearchState({ processInitialSearchState })

  const variables = {
    filter: {
      status: ticketStatusFilter,
      ticketTypeIds: ticketTypesFilter,
    },
    first: TICKETS_PER_PAGE,
    searchQuery: searchState.search,
  }

  const context = {
    slug: conferenceSlug,
    token,
  }

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
  } = usePaginatedQuery<Ticket, 'tickets', typeof variables, typeof context>({
    context,
    initialPage: searchState?.page as string,
    query: TICKET_LIST,
    variables,
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

  const {
    data: ticketTypesData,
  }: {
    data?: {
      ticketTypes: {
        edges: [
          {
            node: TicketType
          }
        ]
      }
    }
    error?: ApolloError
    loading?: boolean
  } = useQuery(TICKET_TYPES, {
    context: {
      slug: conferenceSlug,
      token,
    },
  })
  const ticketTypes = ticketTypesData?.ticketTypes.edges.map(({ node: { id, name } }) => ({
    id,
    name,
  }))

  return (
    <div>
      <Helmet>
        <title>Tickets list - Ticket machine</title>
      </Helmet>
      <SearchFilters>
        <Search>
          <SearchIcon />
          <input
            defaultValue={searchQuery}
            placeholder="Search by name, reference or email of ticket or order"
            type="text"
            onChange={e => setSearchQuery(e.target.value)}
            onKeyDown={handleSearchKey}
          />
        </Search>
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
      <StyledList>
        <TicketDashboardHeader />
        <TicketList error={error} list={results} loading={loading} />
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

export default TicketDashboard
