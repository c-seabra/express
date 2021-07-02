import { SnackbarProvider } from '@websummit/components/src/molecules/Snackbar';
import ApolloAppContextProvider from '@websummit/graphql/src/utils/ApolloAppContextProvider';
import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

import EventSettings from '../eventActions/EventSettings';
import EventsPage from '../pages/EventsPage';

const StyledContainer = styled.section`
  margin: 0 auto;
  font-size: 16px;
  background-color: #f2f3f6;
  padding: 1rem;
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
                <EventsPage />
              </Route>
              <Route exact path="/settings">
                <EventSettings />
              </Route>
              <Route exact path="/:slug/settings">
                <EventSettings />
              </Route>
            </Switch>
          </StyledContainer>
        </Router>
      </SnackbarProvider>
    </ApolloAppContextProvider>
  );
};

export default App;
