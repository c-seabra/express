import jwt from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import styled, { createGlobalStyle } from 'styled-components'

import MainNavigation from '../../lib/components/molecules/MainNavigation'
import ROUTES from '../../lib/constants/routes'
import AttendanceDashboard from '../attendanceDashboard/AttendanceDashboard'
import SettingsDashboard from '../settingsDashboard/SettingsDashboard'
import AppContext from './AppContext'
import { initApollo } from '@websummit/graphql';
import { ApolloProvider } from '@apollo/client';

const GlobalStyle = createGlobalStyle`
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

const StyledMainHeader = styled.section`
  display: flex;
  margin: 20px auto;
  max-width: 1440px;
`

const App = ({ token, apiURL }: { token: string, apiURL: string }) => {
  if (!token) return null

  const [conferenceSlug, setConferenceSlug] = useState<string>()
  const tokenPayload: { conf_slug: string; email: string } = jwt(token) as {
    conf_slug: string
    email: string
  }

  useEffect(() => {
    setConferenceSlug(tokenPayload.conf_slug)
  }, [token])

  const apolloClient = initApollo({apiURL});

  return (
    <ApolloProvider client={apolloClient}>
    <Router>
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
            <link href="https://fonts.gstatic.com" rel="preconnect" />
            <link
              href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
              rel="stylesheet"
            />
            <link href="https://use.typekit.net/vst7xer.css" rel="stylesheet" />

            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
          </Helmet>
          <GlobalStyle />
          <Switch>
            <Route exact path="/">
              <Redirect to="/settings" />
            </Route>
            <Route path="/settings">
              <SettingsDashboard />
            </Route>
            <Route path="/dashboard">
              <AttendanceDashboard />
            </Route>
          </Switch>
        </StyledContainer>
      </AppContext.Provider>
    </Router>
    </ApolloProvider>
  )
}

export default App
