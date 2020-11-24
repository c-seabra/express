import jwt from 'jwt-decode'
import React, { createContext, useEffect, useState } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import {
  BrowserRouter as Router
} from "react-router-dom"
import withApollo from '../../lib/apollo/withApollo'
import TicketDashboard from '../ticketDashboard/TicketDashboard'

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: "Lato";
    src: url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;0,700;1,400&display=swap')
  }

  body {
    font-family: 'Lato', sans-serif;
  }
`

const StlyedContainer = styled.section`
  padding: 1rem;
  max-width: 1440px;
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

export type TicketType = {
  id: string
  name: string
  description: string
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
      <Router>
        <StlyedContainer>
          <GlobalStyle/>
          <TicketDashboard />
        </StlyedContainer>
      </Router>
    </AppContext.Provider>
  )
}

export default withApollo(App)
