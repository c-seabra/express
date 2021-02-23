import { ApolloProvider } from '@apollo/client';
import { initApollo } from '@websummit/graphql';
import jwt from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import SnackbarProvider from 'react-simple-snackbar';
import styled, { createGlobalStyle } from 'styled-components';

import MainNavigation from '../../lib/components/molecules/MainNavigation';
import ROUTES from '../../lib/constants/routes';
import AttendanceAppearanceSelectionDetails from '../attendanceAppearanceSelection/AttendanceAppearanceSelectionDetails.tsx';
import AttendanceDashboard from '../attendanceDashboard/AttendanceDashboard';
import AttendanceDetailsDashboard from '../attendanceDetailsDashboard';
import SettingsDashboard from '../settingsDashboard/SettingsDashboard';
import AppContext from './AppContext';

const GlobalStyle = createGlobalStyle`
  html {
    font-size: 16px;
  }
  body {
    font-family: 'Inter', sans-serif;
  }
`;

const StyledContainer = styled.section`
  margin: 0 auto;
  font-size: 16px;
  background-color: #f2f3f6;
`;

const StyledMainNavigationContainer = styled.section`
  margin: 20px auto;
  max-width: 1440px;
`;

const App = ({ token, apiURL }: { apiURL: string; token: string }) => {
  if (!token) return null;

  const tokenPayload: { conf_slug: string; email: string } = jwt(token);
  const [conferenceSlug, setConferenceSlug] = useState<string>(
    tokenPayload.conf_slug,
  );

  useEffect(() => {
    setConferenceSlug(tokenPayload.conf_slug);
  }, [token]);

  const apolloClient = initApollo({ apiURL });

  return (
    <ApolloProvider client={apolloClient}>
      <SnackbarProvider>
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
                <link
                  href="https://use.typekit.net/vst7xer.css"
                  rel="stylesheet"
                />

                <link
                  href="https://fonts.googleapis.com/icon?family=Material+Icons"
                  rel="stylesheet"
                />
              </Helmet>
              <GlobalStyle />
              <Switch>
                <Route exact path="/">
                  <Redirect to="/settings" />
                </Route>
                <Route exact path="/dashboard/:attendanceId">
                  <AttendanceDetailsDashboard />
                </Route>
                <Route path="/dashboard/:attendanceId/selection/:selectionId">
                  <AttendanceAppearanceSelectionDetails />
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
      </SnackbarProvider>
    </ApolloProvider>
  );
};

export default App;
