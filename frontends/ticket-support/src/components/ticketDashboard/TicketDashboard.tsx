import { ApolloError, useQuery } from '@apollo/client'
import React, { useContext, useState } from 'react'
import styled from 'styled-components'

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
`

const Row = styled.div`
  display: flex;
  padding: 1rem 0 1rem 0;
`

const Search = styled.div`
  flex: 1;
  input {
    height: 2rem;
    width: 100%;
  }
`

const Select = styled.div`
  padding-left: 1.6rem;
  flex: 1;
  select {
    height: 2rem;
    width: 100%;
  }
`

const MultiSelect = styled.label`
  display:block;
  padding-bottom: 1rem;
  select {
    display: block;
    width: 50%;
  }
}
`

const Pagination = styled.div`
  float: right;
`

const PaginationButton = styled.button`
  margin: 1rem 0;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: none;
  border: 1px solid grey;
  background: white;
  cursor: pointer;
  margin: 0.5rem;
  transition: all 0.3s;
  &:hover {
    background-color: grey;
    color: white;
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

const TicketDashboard: React.FC = () => {
  const { conferenceSlug, token } = useContext(AppContext)
  const [searchQuery, setSearchQuery] = useState<String>()
  const [ticketStatusFilter, setTicketStatusFilter] = useState<String | undefined>()
  const [ticketTypesFilter, setTicketTypesFilter] = useState<Array<string | undefined>>()
  const [cursorStack, setCursorStack] = useState<Array<string>>([])
  const [afterCursor, setAfterCursor] = useState<String | undefined>()

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const element = e.currentTarget as HTMLInputElement
      setSearchQuery(element.value)
      setCursorStack([])
      setAfterCursor(undefined)
    }
  }

  const handleTicketStatusFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.target.value ? setTicketStatusFilter(e.target.value) : setTicketStatusFilter(undefined)
    setCursorStack([])
    setAfterCursor(undefined)
  }

  const handleTicketTypeFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const element = e.currentTarget as HTMLSelectElement
    const ticketTypeIds = Array.from(element.selectedOptions, option => option.value);
    ticketTypeIds.length > 0 ? setTicketTypesFilter(ticketTypeIds) : setTicketTypesFilter(undefined)
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
      searchQuery,
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
      <Row>
        <Search>
          <span>Search</span>
          <input
            placeholder="Enter name, reference or email of ticket or order"
            type="text"
            onKeyDown={e => handleSearch(e)}
          />
        </Search>
        <Select>
          <span>Ticket status</span>
          <select name="filter[status]" onChange={e => handleTicketStatusFilterChange(e)}>
            <option></option>
            {Object.entries(TicketFilterStatus).map(([key, value]) => (
              <option value={key}>{value}</option>
            ))}
          </select>
        </Select>
      </Row>
      <MultiSelect>
        Ticket types
        {ticketTypes &&
          <select name="filter[status]" multiple onChange={e => handleTicketTypeFilterChange(e)}>
            { ticketTypes.map((ticketType) => (<option value={ticketType.id}>{ticketType.name}</option>)) }
          </select>
        }
      </MultiSelect>
      <StyledList>
        <TicketDashboardHeader />
        {loading && 'Loading tickets list'}
        {error}
        {!loading && !error && <TicketList list={data?.tickets.edges.map(node => node.node)} />}
      </StyledList>
      <Pagination>
        {!loading && !error && cursorStack.length > 0 && (
          <PaginationButton onClick={() => previousPage()}>Previous</PaginationButton>
        )}
        {!loading && !error && data?.tickets?.pageInfo?.hasNextPage && (
          <PaginationButton onClick={() => nextPage(data?.tickets?.pageInfo?.endCursor)}>
            Next
          </PaginationButton>
        )}
      </Pagination>
    </div>
  )
}

export default TicketDashboard
