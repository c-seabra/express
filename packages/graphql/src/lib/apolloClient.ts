import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import fetch from 'isomorphic-unfetch';

import { SingleSpaAppProps } from '../../../glue/src/@types/single-spa';

export const DEFAULT_CONFERENCE_SLUG = 'ws20';

const constructContextHeaders = (
  commonHeaders: Record<string, string>,
  eventSlug: string,
  token?: string,
  owner?: string,
) => {
  let headers: Record<string, string> = {
    'x-event-id': eventSlug,
    ...commonHeaders,
  };
  if (owner) {
    headers = {
      ...headers,
      'x-owner': owner,
    };
  }
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
};

export type GraphQLParams = {
  apiURL?: string;
  apolloClient?: ApolloClient<NormalizedCacheObject>;
  slug?: string;
  token?: string;
};

const createApolloClient = (apiURL: string) => {
  const setHeadersLink = new ApolloLink((operation, forward) => {
    const { headers, slug, token } = operation.getContext() as {
      headers: Record<string, string>;
      slug?: string;
      token?: string;
    };
    const eventSlug = slug || DEFAULT_CONFERENCE_SLUG;
    const owner = headers?.owner;
    const contextHeaders = constructContextHeaders(
      headers,
      eventSlug,
      token,
      owner,
    );
    operation.setContext({ headers: contextHeaders });
    return forward(operation);
  });

  const httpLink = new HttpLink({
    fetch,
    uri: ({ operationName }) => {
      const shortPath = `${apiURL}`;
      const fullPath = `${apiURL}/${operationName}`;
      return operationName ? fullPath : shortPath;
    },
  });

  const links = [setHeadersLink, httpLink];
  const link = ApolloLink.from(links);

  const requiredOptions = {
    cache: new InMemoryCache().restore({}),
    connectToDevTools: true,
    link,
    resolvers: {},
    ssrMode: false,
    typedefs: {},
  };
  return new ApolloClient(requiredOptions);
};

let apolloClient: ApolloClient<NormalizedCacheObject>;

export function initApollo({ apiURL = '' }: GraphQLParams) {
  if (!apolloClient) {
    apolloClient = createApolloClient(apiURL);
  }

  return apolloClient;
}
