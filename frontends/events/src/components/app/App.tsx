import { ApolloProvider } from '@apollo/client';
import { SnackbarProvider } from '@websummit/components/src/molecules/Snackbar';
import { initApollo } from '@websummit/graphql';
import jwt from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

import EventSettings from '../eventActions/EventSettings';
import LegalEntityCreate from '../legalEntityActions/LegalEntityCreate';
import LegalEntityList from '../legalEntityList/LegalEntityList';
import EventsPage from '../pages/EventsPage';
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
                  <EventsPage />
                </Route>
                <Route exact path="/settings">
                  <EventSettings />
                </Route>
                <Route exact path="/:slug/settings">
                  <EventSettings />
                </Route>
                <Route exact path="/legal_entities">
                  <LegalEntityList />
                </Route>
                <Route exact path="/legal_entities/new">
                  <LegalEntityCreate />
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
