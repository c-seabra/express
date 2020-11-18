import React, { createContext, useEffect, useState } from 'react'
import jwt from 'jwt-decode'
import styled from 'styled-components'

import withApollo from '../../lib/apollo/withApollo'
import {ApolloError, useQuery} from "@apollo/client";
import TICKET_LIST from "../../operations/queries/TicketList";
import TicketList from "../ticketList/TicketList";

const StlyedContainer = styled.section`
  padding: 1rem;
  max-width: 1024px;
  width: 100%;
  margin: 0 auto;
  font-size: 16px;
`
const StyledSection = styled.section`
  padding: 1rem;
`

export type Account = {
  firstName: string
  lastName: string
  email: string
}

export type Ticket = {
  id: string
  bookingRef: string
  state: string
  ticketType: {
    name: string
  }
  order: {
    owner: Account
  }
  assignment?: {
    state: string
    assignee: Account
  }
}


export const AppContext = createContext<{conferenceSlug?: string; token?: string}>({})

const App = ({token, conf_slug}:{token:string, conf_slug:string}) => {
  if (!token) return null
  const tokenPayload: {email: string} = jwt(token) as {email: string}

  useEffect(() => {
    setConferenceSlug(conf_slug)
  }, [token])

  const [conferenceSlug, setConferenceSlug] = useState<string>()

  const {loading, error, data}: {
    loading?: boolean;
    error?: ApolloError;
    data?: {
      tickets: {
        edges: [
          {
            node: Ticket
          }
        ]
      }
    }
  } = useQuery(TICKET_LIST, {
    context: {
      token,
      slug: conferenceSlug
    }
  })

  return (
    <AppContext.Provider
      value={{
        token,
        conferenceSlug
      }}
    >
      <StlyedContainer>
        <StyledSection>
          <h2>Ticket Assignment - Ticket Support Dashboard</h2>
        </StyledSection>
        <StyledSection>
          {loading && "Loading tickets list"}
          {error}
          {!loading && !error && <TicketList list={data?.tickets.edges.map((node) => node.node)} />}
        </StyledSection>
      </StlyedContainer>
    </AppContext.Provider>
  )
}

export default withApollo(App)
