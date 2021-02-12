import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import fetch from 'isomorphic-unfetch';

import fragmentTypes from '../@types/fragments';
import {
  resolvers as mockResolvers,
  schema as mockSchema,
} from '../operations/mock/mocks';
import { isBrowser, isServer } from './ssrMode';

export const GRAPHQL_API_URL =
  process.env.GRAPHQL_API_URL || 'http://localhost:4040/graphql';
export const CMS_GRAPHQL_API_URL =
  process.env.CMS_GRAPHQL_API_URL || 'https://websummit.com/graphql';
export const DEFAULT_CONFERENCE_SLUG =
  process.env.DEFAULT_CONFERENCE_SLUG || 'cc20';

export type ApolloStateType = NormalizedCacheObject;
export type ApolloClientType = ApolloClient<ApolloStateType>;

const constructContextHeaders = (
  commonHeaders: Record<string, unknown>,
  eventSlug: string,
  token?: string,
) => {
  const headers: Record<string, unknown> = {
    ...commonHeaders,
    'x-event-id': eventSlug,
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
};

const createApolloClient = (initialState: ApolloStateType = {}) => {
  const setHeadersLink = new ApolloLink((operation, forward) => {
    const { headers, slug, token } = operation.getContext();
    const eventSlug: string = (slug || DEFAULT_CONFERENCE_SLUG) as string;
    const contextHeaders = constructContextHeaders(headers, eventSlug, token);
    operation.setContext({ headers: contextHeaders });
    return forward(operation);
  });

  const httpLink = ApolloLink.split(
    (operation) => {
      const { wordpress } = operation.getContext();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return wordpress;
    },
    new HttpLink({ fetch, uri: CMS_GRAPHQL_API_URL }),
    new HttpLink({ fetch, uri: GRAPHQL_API_URL }),
  );

  const links = [setHeadersLink, httpLink];
  const link = ApolloLink.from(links);
  const { possibleTypes } = fragmentTypes;

  const requiredOptions = {
    cache: new InMemoryCache({ possibleTypes }).restore(initialState),
    connectToDevTools: isBrowser,
    link,
    resolvers: mockResolvers,
    ssrMode: isServer,
    typedefs: mockSchema,
  };
  return new ApolloClient(requiredOptions);
};

let apolloClient: ApolloClientType | undefined;

export default function initApollo(initialState?: ApolloStateType) {
  if (isServer) {
    return createApolloClient(initialState);
  }

  if (!apolloClient) {
    apolloClient = createApolloClient(initialState);
  }

  return apolloClient;
}
