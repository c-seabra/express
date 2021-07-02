import { ApolloProvider } from '@apollo/client';
import { initApollo } from '@websummit/graphql';
import jwt from 'jwt-decode';
import React, { FC, useEffect, useState } from 'react';

import AppContext from './AppContext';

type ApolloAppContextProviderProps = {
  apiURL: string;
  token: string;
};

const ApolloAppContextProvider: FC<ApolloAppContextProviderProps> = ({
  apiURL,
  children,
  token,
}) => {
  const tokenPayload: { conf_slug: string; email: string } = jwt(token);
  const [slug, setSlug] = useState<string>(tokenPayload.conf_slug);

  useEffect(() => {
    setSlug(tokenPayload.conf_slug);
  }, [tokenPayload.conf_slug]);

  if (!token) return null;

  const apolloClient = initApollo({ apiURL });

  return (
    <ApolloProvider client={apolloClient}>
      <AppContext.Provider value={{ slug, token }}>
        {children}
      </AppContext.Provider>
    </ApolloProvider>
  );
};

export default ApolloAppContextProvider;
