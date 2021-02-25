import { ApolloError, ApolloProvider, useQuery } from '@apollo/client';
import { GraphQLParams, initApollo } from '@websummit/graphql';
import jwt from 'jwt-decode';
import React, { useState } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import styled from 'styled-components';

import { Event } from '../../lib/types';
import EventList from '../eventList/EventList';
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

const App = ({ token, apiURL = '' }: GraphQLParams) => {
  if (!token) return null;
  const tokenPayload: { conf_slug: string; email: string } = jwt(token);
  const [conferenceSlug, setConferenceSlug] = useState<string>(
    tokenPayload.conf_slug,
  );

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
                <Redirect to="/events" />
              </Route>
              <Route path="/events">
                <StyledSection>
                  <EventList />
                </StyledSection>
              </Route>
              <Route path="/legal_entities">
                <LegalEntityList />
              </Route>
            </Switch>
          </StyledContainer>
        </AppContext.Provider>
      </Router>
    </ApolloProvider>
  );
};

export default App;
