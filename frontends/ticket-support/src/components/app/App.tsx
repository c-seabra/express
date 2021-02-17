import {
  ApolloClient,
  ApolloProvider,
  NormalizedCacheObject,
} from '@apollo/client';
import { initApollo } from '@websummit/graphql';
import React from 'react';
import { Helmet } from 'react-helmet';
import {
  HashRouter as Router,
  NavLink,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import SnackbarProvider from 'react-simple-snackbar';
import styled, { createGlobalStyle } from 'styled-components';

import Logo from '../../lib/components/atoms/Logo';
import MainNavigation from '../../lib/components/molecules/MainNavigation';
import ROUTES from '../../lib/constants/routes';
import { Conference } from '../../lib/types';
import OrderDetails from '../order/OrderDetails';
import OrdersDashboard from '../ordersDashboard/OrdersDashboard';
import TicketDashboard from '../ticketDashboard/TicketDashboard';
import TicketDetails from '../ticketDetails/TicketDetails';
import AppContext from './AppContext';

const GlobalStyle = createGlobalStyle`
  html {
    font-size: 16px;
  }
  body, input, textarea, select {
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

const StyledMainHeader = styled.section`
  display: flex;
  margin: 20px auto;
  max-width: 1440px;
`;

type AppProps = {
  apiURL: string;
  conference: Conference;
  token: string;
};

const App = ({ token, conference, apiURL }: AppProps) => {
  const apolloClient = initApollo({
    apiURL,
  }) as ApolloClient<NormalizedCacheObject>;

  return (
    <ApolloProvider client={apolloClient}>
      <SnackbarProvider>
        <Router>
          <StyledMainHeader>
            <NavLink to="/">
              <Logo />
            </NavLink>
          </StyledMainHeader>
          <StyledMainNavigationContainer>
            <MainNavigation routes={ROUTES} />
          </StyledMainNavigationContainer>
          <AppContext.Provider
            value={{
              conferenceSlug: conference?.slug,
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
                  <Redirect to="/tickets" />
                </Route>
                <Route path="/tickets">
                  <TicketDashboard />
                </Route>
                <Route path="/ticket/:bookingRef">
                  <TicketDetails />
                </Route>
                <Route path="/order/:orderRef">
                  <OrderDetails />
                </Route>
                <Route exact path="/orders">
                  <OrdersDashboard />
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
