import { ApolloProvider } from '@apollo/client';
import { SnackbarProvider } from '@websummit/components/src/molecules/Snackbar';
import { initApollo } from '@websummit/graphql';
import jwt from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Calendar from '../calendar/Calendar';
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
        <AppContext.Provider
          value={{
            conferenceSlug,
            token,
          }}
        >
          <StyledContainer>
            <h1>Calendar</h1>
          </StyledContainer>
        </AppContext.Provider>
      </SnackbarProvider>
    </ApolloProvider>
  );
};

export default App;
