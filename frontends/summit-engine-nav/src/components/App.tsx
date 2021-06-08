import { ApolloProvider } from '@apollo/client';
import { initApollo } from '@websummit/graphql';
import jwt from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import AppContext from './AppContext';
import MainNavigation from './MainNavigation';

const StyledContainer = styled.section`
  margin: 0 auto;
  font-size: 16px;
  padding: 0 1rem;
`;

const GlobalStyle = createGlobalStyle`
  html {
    font-size: 16px;
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
  const [slug, setSlug] = useState<string>(tokenPayload.conf_slug);

  useEffect(() => {
    setSlug(tokenPayload.conf_slug);
  }, [tokenPayload.conf_slug]);

  if (!token) return null;

  const apolloClient = initApollo({ apiURL });

  return (
    <ApolloProvider client={apolloClient}>
      <AppContext.Provider
        value={{
          slug,
          token,
        }}
      >
        <GlobalStyle />

        <StyledContainer>
          <MainNavigation />
        </StyledContainer>
      </AppContext.Provider>
    </ApolloProvider>
  );
};

export default App;
