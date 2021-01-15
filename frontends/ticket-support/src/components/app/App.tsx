import jwt from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import styled, { createGlobalStyle } from 'styled-components'

import withApollo from '../../lib/apollo/withApollo'
import MainNavigation from '../../lib/components/molecules/MainNavigation'
import ROUTES from '../../lib/constants/routes'
import OrderDetails from '../order/OrderDetails'
import OrdersDashboard from '../ordersDashboard/OrdersDashboard'
import TicketDashboard from '../ticketDashboard/TicketDashboard'
import TicketDetails from '../ticketDetails/TicketDetails'
import AppContext from './AppContext'

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: "Inter";
    src: url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700&display=swap')
  }
  html {
    font-size: 16px;
  }
  body {
    font-family: 'Inter', sans-serif;
  }
`

const StyledContainer = styled.section`
  margin: 0 auto;
  font-size: 16px;
  background-color: #f2f3f6;
`

const StyledMainNavigationContainer = styled.section`
  margin: 20px auto;
  max-width: 1440px;
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
    <>
      <StyledMainNavigationContainer>
        <MainNavigation routes={ROUTES} />
      </StyledMainNavigationContainer>
      <AppContext.Provider
        value={{
          conferenceSlug,
          token,
        }}
      >
        <StyledContainer>
          <Helmet>
            <link href="https://use.typekit.net/vst7xer.css" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
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
    </>
  )
}

export default withApollo(App)
