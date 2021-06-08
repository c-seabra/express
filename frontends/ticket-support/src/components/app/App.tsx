import { ApolloProvider } from '@apollo/client';
import { SnackbarProvider } from '@websummit/components/src/molecules/Snackbar';
import { initApollo } from '@websummit/graphql';
import jwt from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import styled from 'styled-components';

import OrderDetails from '../order/OrderDetails';
import OrdersDashboard from '../ordersDashboard/OrdersDashboard';
import OrderInvoicePage from '../pages/OrderInvoicePage';
import TicketDashboard from '../ticketDashboard/TicketDashboard';
import TicketDetails from '../ticketDetails/TicketDetails';
import AppContext from './AppContext';

const StyledContainer = styled.section`
  margin: 0 auto;
  font-size: 16px;
  background-color: #f2f3f6;
  padding: 0 1rem;
`;

type AppProps = {
  apiURL: string;
  token: string;
};

const App = ({ token, apiURL }: AppProps) => {
  const tokenPayload: { conf_slug: string; email: string } = jwt(token);
  const [slug, setSlug] = useState<string>(tokenPayload.conf_slug);

  useEffect(() => {
    setSlug(tokenPayload.conf_slug);
  }, [tokenPayload.conf_slug]);

  if (!token) return null;

  const apolloClient = initApollo({ apiURL });

  return (
    <ApolloProvider client={apolloClient}>
      <SnackbarProvider>
        <Router>
          <AppContext.Provider
            value={{
              slug,
              token,
            }}
          >
            <StyledContainer>
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
                <Route path="/order/:orderRef/invoice/:orderId">
                  <OrderInvoicePage />
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
