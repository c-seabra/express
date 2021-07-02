import { SnackbarProvider } from '@websummit/components/src/molecules/Snackbar';
import ApolloAppContextProvider from '@websummit/graphql/src/utils/ApolloAppContextProvider';
import React from 'react';
import { Helmet } from 'react-helmet';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';

import { MainNavigation } from '../../lib/components/molecules';
import ROUTES from '../../lib/constants/routes';
import AttendanceAppearanceSelectionDetails from '../attendanceAppearanceSelection/AttendanceAppearanceSelectionDetails';
import AttendanceDashboard from '../attendanceDashboard/AttendanceDashboard';
import AttendanceDetailsDashboard from '../attendanceDetailsDashboard';
import InvestorAccessDashboard from '../InvestorAccessDashboard/InvestorAccessDashboard';
import SettingsDashboard from '../settingsDashboard/SettingsDashboard';

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
  return (
    <ApolloAppContextProvider apiURL={apiURL} token={token}>
      <SnackbarProvider>
        <Router>
          <StyledMainNavigationContainer>
            <MainNavigation routes={ROUTES} />
          </StyledMainNavigationContainer>

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
              <Route path="/investor_access">
                <InvestorAccessDashboard />
              </Route>
              <Route path="/dashboard">
                <AttendanceDashboard />
              </Route>
            </Switch>
          </StyledContainer>
        </Router>
      </SnackbarProvider>
    </ApolloAppContextProvider>
  );
};

export default App;
