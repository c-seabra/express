import jwt from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import styled, { createGlobalStyle } from 'styled-components'

import withApollo from '../../lib/apollo/withApollo'
import OrderDetails from '../order/OrderDetails'
import TicketDashboard from '../ticketDashboard/TicketDashboard'
import OrdersDashboard from '../ordersDashboard/OrdersDashboard'
import TicketDetails from '../ticketDetails/TicketDetails'
import AppContext from './AppContext'

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: "Inter";
    src: url('https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,300;0,400;0,700;1,400&display=swap')
  }
  html {
    font-size: 16px;
  }
  body {
    font-family: 'Inter', sans-serif;
  }
`

const StyledContainer = styled.section`
  padding: 1rem;
  max-width: 1440px;
  margin: 0 auto;
  font-size: 16px;
`

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
      <StyledContainer>
        <Helmet>
          <link rel="stylesheet" href="https://use.typekit.net/vst7xer.css" />
        </Helmet>
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
      </StyledContainer>
    </AppContext.Provider>
  )
}

export default withApollo(App)
