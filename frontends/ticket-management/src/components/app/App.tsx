import { ApolloProvider } from '@apollo/client';
import { SnackbarProvider } from '@websummit/components/src/molecules/Snackbar';
import { initApollo } from '@websummit/graphql';
import jwt from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

import IndexPage from '../pages/IndexPage';
import SalesCyclePage from '../pages/SalesCyclePage';
import SalesCyclesPage from '../pages/SalesCyclesPage';
import TicketCategoriesPage from '../pages/TicketCategoriesPage';
import TicketTypesPage from '../pages/TicketTypesPage';
import AppContext from './AppContext';

const StyledContainer = styled.section`
  margin: 0 auto;
  font-size: 16px;
  background-color: #f2f3f6;
`;

type AppProps = {
  apiURL: string;
  token: string;
};

const App = ({ token, apiURL }: AppProps) => {
  const tokenPayload: { conf_slug: string; email: string } = jwt(token);
  const [conferenceSlug, setConferenceSlug] = useState<string>(
    tokenPayload.conf_slug,
  );

  useEffect(() => {
    setConferenceSlug(tokenPayload.conf_slug);
  }, [tokenPayload.conf_slug]);

  if (!token) return null;

  const apolloClient = initApollo({ apiURL });

  return (
    <ApolloProvider client={apolloClient}>
      <SnackbarProvider>
        <Router>
          <AppContext.Provider
            value={{
              conferenceSlug,
              token,
            }}
          >
            <StyledContainer>
              <Switch>
                <Route exact path="/">
                  <IndexPage />
                </Route>
                <Route exact path="/sale-cycles">
                  <SalesCyclesPage />
                </Route>
                <Route exact path="/sale-cycle/:id">
                  <SalesCyclePage />
                </Route>
                <Route exact path="/ticket-categories">
                  <TicketCategoriesPage />
                </Route>
                <Route exact path="/ticket-types">
                  <TicketTypesPage />
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
