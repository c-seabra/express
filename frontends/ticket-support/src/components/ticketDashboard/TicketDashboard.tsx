import { ApolloError, useQuery } from '@apollo/client'
import React, { useContext, useState } from 'react'
import styled from 'styled-components'

import TICKET_LIST from '../../operations/queries/TicketList'
import { AppContext, PageInfo, Ticket } from '../app/App'
import TicketList from '../ticketList/TicketList'
import TicketDashboardHeader from './TicketDashboardHeader'

const TICKETS_PER_PAGE = 20

const StyledList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`

const Search = styled.div`
  padding: 1.6rem 1.6rem;
  input {
    width: 100%;
    height: 2rem;
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

const TicketDashboard: React.FC = () => {
  const { conferenceSlug, token } = useContext(AppContext)
  const [searchQuery, setSearchQuery] = useState<String>()
  const [cursorStack, setCursorStack] = useState<Array<string>>([])
  const [afterCursor, setAfterCursor] = useState<String | undefined>()

  const onSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const element = e.currentTarget as HTMLInputElement
      setSearchQuery(element.value)
      setCursorStack([])
      setAfterCursor(undefined)
    }
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
      first: TICKETS_PER_PAGE,
      after: afterCursor,
    },
  })

  return (
    <div>
      <Search>
        <input
          placeholder="Search by name, booking reference or email of ticket or order"
          type="text"
          onKeyDown={e => onSubmit(e)}
        />
      </Search>
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
