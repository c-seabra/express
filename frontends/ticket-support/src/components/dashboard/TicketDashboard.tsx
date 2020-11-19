import { ApolloError, useQuery } from '@apollo/client'
import React, { useContext, useState } from 'react'
import styled from 'styled-components'

import TICKET_LIST from '../../operations/queries/TicketList'
import { AppContext, Ticket } from '../app/App'
import TicketList from '../ticketList/TicketList'

const Search = styled.div`
  padding: 1.6rem 1.6rem;
  input {
    width: 100%;
    height: 2rem;
  }
`

const TicketDashboard: React.FC = () => {
  const { conferenceSlug, token } = useContext(AppContext)
  const [searchQuery, setSearchQuery] = useState()

  const onSubmit = (e: React.FormEvent) => {
    if (e.key === 'Enter') {
      setSearchQuery(e.target?.value)
    }
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
      {loading && 'Loading tickets list'}
      {error}
      {!loading && !error && <TicketList list={data?.tickets.edges.map(node => node.node)} />}
    </div>
  )
}

export default TicketDashboard
