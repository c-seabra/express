import { ApolloError, useQuery } from '@apollo/client'
import qs from 'qs'
import React, { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useHistory, useLocation } from 'react-router-dom'
import styled from 'styled-components'

import Loader from '../../lib/Loading'
import SearchIcon from '../../lib/svgs/search'
import TICKET_LIST from '../../operations/queries/TicketList'
import TICKET_TYPES from '../../operations/queries/TickeTypes'
import { AppContext, PageInfo, Ticket, TicketType } from '../app/App'
import TicketList from '../ticketList/TicketList'
import TicketDashboardHeader from './TicketDashboardHeader'

const TICKETS_PER_PAGE = 20

const StyledList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  overflow: hidden;
  border-radius: 4px;
  border: 1px solid grey;
`

const SearchFilters = styled.div`
  display: flex;
  padding-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;
  select,
  input {
    height: 2rem;
    width: 100%;
  }
`

const Search = styled(StyledLabel)`
  width: 30%;
  position: relative;
  svg {
    width: 20px;
    height: 20px;
    position: absolute;
    left: 0.5rem;
    top: 0.5rem;
  }
  input {
    padding-left: 2rem;
    border: none;
    border-bottom: 1px solid grey;
  }
`

const Filters = styled.div`
  display: flex;
  align-items: flex-start;
`

const Select = styled(StyledLabel)`
  margin-right: 1rem;
  select {
    padding-right: 1rem;
  }
`

const MultiSelect = styled(StyledLabel)`
  select {
    height: 4rem;
  }
}
`

const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`

const PaginationButton = styled.button`
  margin: 1rem 0;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: none;
  border: 1px solid grey;
  background: white;
  color: #000;
  cursor: pointer;
  margin: 0.5rem;
  transition: all 0.3s;
  &:hover {
    background-color: grey;
    color: white;
  }
  &:disabled {
    background: white;
    color: grey;
    cursor: not-allowed;
  }
`

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

const filterEmptyStrings = (_: unknown, val: string) => val || undefined

const createURL = (state: Record<string, unknown>) =>
  `?${qs.stringify(state, {
    encodeValuesOnly: true,
    filter: filterEmptyStrings,
    skipNulls: true,
  })}`

const searchStateToUrl = ({
  pathname,
  searchState,
}: {
  pathname: string
  searchState: Record<string, unknown>
}) =>
  searchState !== null &&
  typeof searchState === 'object' &&
  Object.keys(searchState ?? {}).length > 0
    ? `${pathname}${createURL(searchState)}`
    : pathname

const pathToSearchState = (path: string): Record<string, unknown> =>
  path.includes('?') ? qs.parse(path.substring(path.indexOf('?') + 1)) : {}

const TicketDashboard: React.FC = () => {
  const { conferenceSlug, token } = useContext(AppContext)
  const location = useLocation()
  const history = useHistory()
  const { pathname } = location
  const asPath = window.location.href
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [ticketStatusFilter, setTicketStatusFilter] = useState<string | undefined>()
  const [ticketTypesFilter, setTicketTypesFilter] = useState<Array<string | undefined>>()
  const [cursorStack, setCursorStack] = useState<Array<string>>([])
  const [afterCursor, setAfterCursor] = useState<string | undefined>()
  const [searchState, setSearchState] = useState<Record<string, unknown>>(pathToSearchState(asPath))

  useEffect(() => {
    if (searchState.search) setSearchQuery(searchState.search as string)
    if (searchState.ticketStatus) setTicketStatusFilter(searchState.ticketStatus as string)
    if (searchState.ticketTypeIds) {
      const fixTypeTicketTypeIds = searchState.ticketTypeIds as string
      const ticketTypeIdsArray = fixTypeTicketTypeIds.split(',')
      setTicketTypesFilter(ticketTypeIdsArray)
    }
    if (searchState.page) setAfterCursor(searchState.page as string)
  }, [])

  useEffect(() => {
    onSearchStateChange(searchState)
  }, [searchState])

  const onSearchStateChange = (updatedSearchState: Record<string, unknown>) => {
    const url = searchStateToUrl({ pathname, searchState: updatedSearchState })
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    history.push(url)
  }

  const handleSearchKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const element = e.currentTarget as HTMLInputElement
      setSearchState({ ...searchState, search: element.value })
      setCursorStack([])
      setAfterCursor(undefined)
    }
  }

  const handleTicketStatusFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value) {
      setTicketStatusFilter(e.target.value)
    } else {
      setTicketStatusFilter(undefined)
    }
    setSearchState({ ...searchState, ticketStatus: e.target.value })
    setCursorStack([])
    setAfterCursor(undefined)
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
    setCursorStack([])
    setAfterCursor(undefined)
  }

  const previousPage = () => {
    cursorStack.pop()
    const endCursor = cursorStack[cursorStack.length - 1]
    setAfterCursor(endCursor)
    setSearchState({ ...searchState, page: endCursor })
  }

  const nextPage = (endCursor: string) => {
    cursorStack.push(endCursor)
    setAfterCursor(endCursor)
    setSearchState({ ...searchState, page: endCursor })
  }

  const {
    loading,
    error,
    data,
  }: {
    data?: {
      tickets: {
        edges: [
          {
            node: Ticket
          }
        ]
        pageInfo: PageInfo
      }
    }
    error?: ApolloError
    loading?: boolean
  } = useQuery(TICKET_LIST, {
    context: {
      slug: conferenceSlug,
      token,
    },
    variables: {
      after: afterCursor,
      filter: {
        status: ticketStatusFilter,
        ticketTypeIds: ticketTypesFilter,
      },
      first: TICKETS_PER_PAGE,
      searchQuery: searchState.search,
    },
  })

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
            onKeyDown={e => handleSearchKey(e)}
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
                <option value={key}>{value}</option>
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
                  <option value={ticketType.id}>{ticketType.name}</option>
                ))}
              </select>
            </MultiSelect>
          )}
        </Filters>
      </SearchFilters>
      <StyledList>
        <TicketDashboardHeader />
        {loading && <Loader />}
        {error && error.message}
        {!loading &&
          !error &&
          data?.tickets?.edges !== undefined &&
          data?.tickets?.edges?.length > 0 && (
            <TicketList list={data?.tickets?.edges?.map(node => node.node)} />
          )}
      </StyledList>
      {!loading && !error && (
        <Pagination>
          <PaginationButton
            disabled={cursorStack.length <= 0}
            onClick={cursorStack.length > 0 ? () => previousPage() : () => {}}
          >
            Previous
          </PaginationButton>
          <PaginationButton
            disabled={!data?.tickets?.pageInfo?.hasNextPage}
            onClick={
              data?.tickets?.pageInfo?.hasNextPage
                ? () => nextPage(data?.tickets?.pageInfo?.endCursor)
                : () => {}
            }
          >
            Next
          </PaginationButton>
        </Pagination>
      )}
    </div>
  )
}

export default TicketDashboard
