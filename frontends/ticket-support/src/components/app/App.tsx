import jwt from 'jwt-decode'
import React, { createContext, useEffect, useState } from 'react'
import styled from 'styled-components'

import withApollo from '../../lib/apollo/withApollo'
import TicketDashboard from '../ticketDashboard/TicketDashboard'

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
  email: string
  firstName: string
  lastName: string
}

export type Ticket = {
  assignment?: {
    assignee: Account
    state: string
  }
  bookingRef: string
  id: string
  order: {
    owner: Account
  }
  state: string
  ticketType: {
    name: string
  }
}

export type PageInfo = {
  hasPreviousPage: string
  hasNextPage: string
  endCursor: string
  startCursor: string
}

export const AppContext = createContext<{ conferenceSlug?: string; token?: string }>({})

const App = ({ token }: { token: string }) => {
  if (!token) return null
  const tokenPayload: { conf_slug: string; email: string } = jwt(token) as {
    conf_slug: string
    email: string
  }

  useEffect(() => {
    setConferenceSlug(tokenPayload.conf_slug)
  }, [token])

  const [conferenceSlug, setConferenceSlug] = useState<string>()

  return (
    <AppContext.Provider
      value={{
        conferenceSlug,
        token,
      }}
    >
      <StlyedContainer>
        <StyledSection>
          <h2>Ticket Assignment - Ticket Support Dashboard</h2>
        </StyledSection>
        <TicketDashboard />
      </StlyedContainer>
    </AppContext.Provider>
  )
}

export default withApollo(App)
