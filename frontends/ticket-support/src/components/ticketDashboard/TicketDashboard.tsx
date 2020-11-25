import { ApolloError, useQuery } from '@apollo/client'
import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import qs from 'qs'

import TICKET_LIST from '../../operations/queries/TicketList'
import TICKET_TYPES from '../../operations/queries/TickeTypes'
import { AppContext, PageInfo, Ticket, TicketType } from '../app/App'
import TicketList from '../ticketList/TicketList'
import TicketDashboardHeader from './TicketDashboardHeader'
import SearchIcon from '../../lib/svgs/search'
import Loader from '../../lib/Loading'

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
  padding: 1rem 0 1rem 0;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`

const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;
  select, input {
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
    left: .5rem;
    top: .5rem;
  }
  input {
    padding-left: 2rem;
    border: none;
    border-bottom: 1px solid grey;
  }
`

const Filters = styled.div`
  display: flex;
  align-items: flex-end;
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
  ASSIGNED = "Assigned",
  UNASSIGNED = "Unassigned",
  ACCEPTED = "Accepted",
  VOID = "Void",
  DUPLICATE = "Duplicate",
  LOCKED = "Locked",
  REJECTED = "Rejected",
  CHECKED_IN = "Checked In",
}

const filterEmptyStrings = (_: unknown, val: string) => val || undefined

const createURL = (state: Record<string, unknown>) =>
  `?${qs.stringify(state, { encodeValuesOnly: true, filter: filterEmptyStrings, skipNulls: true })}`

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
  const pathname = location.pathname
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
      setSearchState({...searchState, search:element.value})
      setCursorStack([])
      setAfterCursor(undefined)
    }
  }

  const handleTicketStatusFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value) {
      setTicketStatusFilter(e.target.value)
      setSearchState({...searchState, ticketStatus:e.target.value})
    } else {
      setTicketStatusFilter(undefined)
    }
    setCursorStack([])
    setAfterCursor(undefined)
  }

  const handleTicketTypeFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const element = e.currentTarget as HTMLSelectElement
    const ticketTypeIds = Array.from(element.selectedOptions, option => option.value);
    if (ticketTypeIds.length > 0) {
      setTicketTypesFilter(ticketTypeIds)
      setSearchState({...searchState, ticketTypeIds:ticketTypeIds.toString()})
    } else {
      setTicketTypesFilter(undefined)
    }
    setCursorStack([])
    setAfterCursor(undefined)
  }

  const previousPage = () => {
    cursorStack.pop()
    const endCursor = cursorStack[cursorStack.length - 1]
    setAfterCursor(endCursor)
  }

  const nextPage = (endCursor: string) => {
    cursorStack.push(endCursor)
    console.log({endCursor})
    setAfterCursor(endCursor)
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
      searchQuery: searchState.search,
      filter: {
        status: ticketStatusFilter,
        ticketTypeIds: ticketTypesFilter
      },
      first: TICKETS_PER_PAGE,
      after: afterCursor,
    },
  })

  const { data: ticketTypesData }: {
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
    }
  })
  const ticketTypes = ticketTypesData?.ticketTypes.edges.map(({ node: { id, name } }) => ({id, name}))

  return (
    <div>
      <h2>Manage Tickets - Ticket Assignment - Ticket Support Dashboard</h2>
      <SearchFilters>
        <Search>
          <SearchIcon />
            <input
              placeholder="Search by name, reference or email of ticket or order"
              type="text"
              defaultValue={searchQuery}
              onKeyDown={e => handleSearchKey(e)}
              onChange={e => setSearchQuery(e.target.value)}
            />
        </Search>
        <Filters>
          <Select>
            <span>Ticket status</span>
            <select name="filter[status]" onChange={e => handleTicketStatusFilterChange(e)} value={ticketStatusFilter}>
              <option></option>
              {Object.entries(TicketFilterStatus).map(([key, value]) => (
                <option value={key}>{value}</option>
                ))}
            </select>
          </Select>
          <MultiSelect>
            <span>Ticket types</span>
            {ticketTypes &&
              <select name="filter[status]" multiple onChange={e => handleTicketTypeFilterChange(e)} defaultValue={ticketTypesFilter as string[] || [''] as string[]}>
                { ticketTypes.map((ticketType) => (<option value={ticketType.id}>{ticketType.name}</option>)) }
              </select>
            }
          </MultiSelect>
        </Filters>
      </SearchFilters>
      <StyledList>
        <TicketDashboardHeader />
        {loading && <Loader />}
        {error}
        {!loading && !error && <TicketList list={data?.tickets.edges.map(node => node.node)} />}
      </StyledList>
      {!loading && !error && (
        <Pagination>
          <PaginationButton disabled={cursorStack.length <= 0} onClick={cursorStack.length > 0 ? () => previousPage() : ()=>{}}>Previous</PaginationButton>
          <PaginationButton disabled={!data?.tickets?.pageInfo?.hasNextPage}onClick={data?.tickets?.pageInfo?.hasNextPage ? () => nextPage(data?.tickets?.pageInfo?.endCursor) : ()=>{}}>
            Next
          </PaginationButton>
        </Pagination>
      )}
    </div>
  )
}

export default TicketDashboard
