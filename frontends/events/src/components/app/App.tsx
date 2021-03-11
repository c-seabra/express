import { ApolloProvider } from '@apollo/client';
import { initApollo } from '@websummit/graphql';
import jwt from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

import EventCreate from '../eventActions/EventCreate';
import EventUpdate from '../eventActions/EventUpdate';
import EventList from '../eventList/EventList';
import LegalEntityCreate from '../legalEntityActions/LegalEntityCreate';
import LegalEntityList from '../legalEntityList/LegalEntityList';
import AppContext from './AppContext';

const StyledContainer = styled.section`
  padding: 1rem;
  max-width: 1024px;
  width: 100%;
  margin: 0 auto;
  font-size: 16px;
`;
const StyledSection = styled.section`
  padding: 1rem;
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
      <Router>
        <AppContext.Provider
          value={{
            conferenceSlug,
            token,
          }}
        >
          <StyledContainer>
            <StyledSection>
              <h2>Back Office</h2>
            </StyledSection>
            <Switch>
              <Route exact path="/">
                <EventList />
              </Route>
              <Route exact path="/new">
                <EventCreate />
              </Route>
              <Route exact path="/:slug/edit">
                <EventUpdate />
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
    </ApolloProvider>
  );
};

export default App;
