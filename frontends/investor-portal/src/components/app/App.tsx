import jwt from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import styled, { createGlobalStyle } from 'styled-components'

import withApollo from '../../lib/apollo/withApollo'
import MainNavigation from '../../lib/components/molecules/MainNavigation'
import ROUTES from '../../lib/constants/routes'
import AttendanceDashboard from '../attendanceDashboard/AttendanceDashboard'
import SettingsDashboard from '../settingsDashboard/SettingsDashboard'
import AppContext from './AppContext'

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

const App = ({ token }: { token: string }) => {
  const [conferenceSlug, setConferenceSlug] = useState<string>()
  const tokenPayload: { conf_slug: string; email: string } = jwt(token) as {
    conf_slug: string
    email: string
  }

  useEffect(() => {
    setConferenceSlug(tokenPayload.conf_slug)
  }, [token, tokenPayload.conf_slug])

  if (!token) return null

  return (
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
              <AttendanceDashboard />
            </Route>
            <Route path="/settings">
              <SettingsDashboard />
            </Route>
          </Switch>
        </StyledContainer>
      </AppContext.Provider>
    </Router>
  )
}

export default withApollo(App)
