import { ApolloProvider } from '@apollo/client';
import { initApollo } from '@websummit/graphql';
import jwt from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';

import EventCreate from '../eventActions/EventCreate';
import EventUpdate from '../eventActions/EventUpdate';
import LegalEntityCreate from '../legalEntityActions/LegalEntityCreate';
import LegalEntityList from '../legalEntityList/LegalEntityList';
import EventsPage from '../pages/EventsPage';
import AppContext from './AppContext';
import SelectTaxPage from "../pages/SelectTaxPage";

const StyledContainer = styled.section`
  margin: 0 auto;
  max-width: 1440px;
`;

const GlobalStyle = createGlobalStyle`
  html {
    font-size: 16px;
    background-color: #f2f3f6;
  }
  body, input, textarea, select {
    font-family: 'Inter', sans-serif;
  }
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
            <Helmet>
              <link href="https://fonts.gstatic.com" rel="preconnect" />
              <link
                href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
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
                <EventsPage />
              </Route>
              <Route exact path="/new">
                <EventCreate />
              </Route>
              {/*TEST PATH*/}
              <Route exact path="/tax">
                <SelectTaxPage />
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
