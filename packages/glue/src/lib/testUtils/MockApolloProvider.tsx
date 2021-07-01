import { ApolloProvider } from '@apollo/client';
import { initApollo } from '@websummit/graphql';
import React, { FC } from 'react';

type MockApolloProviderProps = {
  apiURL?: string;
};

const MockApolloProvider: FC<MockApolloProviderProps> = ({
  apiURL,
  children,
}) => (
  <ApolloProvider
    client={initApollo({ apiURL: apiURL || 'http://localhost:0000' })}
  >
    {children}
  </ApolloProvider>
);

export default MockApolloProvider;
