import { SnackbarProvider } from '@websummit/components/src/molecules/Snackbar';
import ApolloAppContextProvider from '@websummit/graphql/src/utils/ApolloAppContextProvider';
import React from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import styled from 'styled-components';

import OrderDetails from '../order/OrderDetails';
import OrdersDashboard from '../ordersDashboard/OrdersDashboard';
import CustomerBillingInfo from '../pages/CustomerBillingInfoPage';
import TicketDashboard from '../ticketDashboard/TicketDashboard';
import TicketDetails from '../ticketDetails/TicketDetails';

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
  return (
    <ApolloAppContextProvider apiURL={apiURL} token={token}>
      <SnackbarProvider>
        <Router>
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
              <Route path="/order/:orderRef/customer-billing/:orderId">
                <CustomerBillingInfo />
              </Route>
              <Route path="/order/:orderRef">
                <OrderDetails />
              </Route>
              <Route exact path="/orders">
                <OrdersDashboard />
              </Route>
            </Switch>
          </StyledContainer>
        </Router>
      </SnackbarProvider>
    </ApolloAppContextProvider>
  );
};

export default App;
