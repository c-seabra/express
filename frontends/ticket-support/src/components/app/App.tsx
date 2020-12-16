import jwt from 'jwt-decode'
import React, { createContext, useEffect, useState } from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import styled, { createGlobalStyle } from 'styled-components'

import withApollo from '../../lib/apollo/withApollo'
import OrderDetails from '../order/OrderDetails'
import TicketDashboard from '../ticketDashboard/TicketDashboard'
import OrdersDashboard from '../ordersDashboard/OrdersDashboard'
import TicketDetails from '../ticketDetails/TicketDetails'

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: "Lato";
    src: url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;0,700;1,400&display=swap')
  }
  html {
    font-size: 16px;
  }
  body {
    font-family: 'Lato', sans-serif;
  }
`

const StlyedContainer = styled.section`
  padding: 1rem;
  max-width: 1440px;
  margin: 0 auto;
  font-size: 16px;
`

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
        <GlobalStyle />
        <Router>
          <Switch>
            <Route exact path="/">
              <TicketDashboard />
            </Route>
            <Route path="/tickets/:bookingRef">
              <TicketDetails />
            </Route>
            <Route path="/order/:orderRef">
              <OrderDetails />
            </Route>
            <Route exact path="/orders">
              <OrdersDashboard />
            </Route>
          </Switch>
        </Router>
      </StlyedContainer>
    </AppContext.Provider>
  )
}

export default withApollo(App)
