import ApolloAppContextProvider from '@websummit/graphql/src/utils/ApolloAppContextProvider';
import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

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
  return (
    <ApolloAppContextProvider apiURL={apiURL} token={token}>
      <GlobalStyle />

      <StyledContainer>
        <MainNavigation />
      </StyledContainer>
    </ApolloAppContextProvider>
  );
};

export default App;
