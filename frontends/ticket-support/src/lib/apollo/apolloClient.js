import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client'
import fetch from 'isomorphic-unfetch'

import { isBrowser, isServer } from './ssrMode'

export const GRAPHQL_API_URL = 'https://api.cilabs.com/catalyst'
export const DEFAULT_CONFERENCE_SLUG = 'ws20'

const constructContextHeaders = (commonHeaders, eventSlug, token) => {
  const headers = {
    ...commonHeaders,
    'x-event-id': eventSlug,
  }
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }
  return headers
}

const createApolloClient = (initialState = {}) => {
  const setHeadersLink = new ApolloLink((operation, forward) => {
    const { headers, slug, token } = operation.getContext()
    const eventSlug = slug || DEFAULT_CONFERENCE_SLUG
    const contextHeaders = constructContextHeaders(headers, eventSlug, token)
    operation.setContext({ headers: contextHeaders })
    return forward(operation)
  })

  const httpLink = new HttpLink({ fetch, uri: GRAPHQL_API_URL })

  const links = [setHeadersLink, httpLink]
  const link = ApolloLink.from(links)

  const requiredOptions = {
    cache: new InMemoryCache().restore(initialState),
    connectToDevTools: isBrowser,
    link,
    resolvers: {},
    ssrMode: isServer,
    typedefs: {},
  }
  return new ApolloClient(requiredOptions)
}

let apolloClient

export default function initApollo(initialState) {
  if (isServer) {
    return createApolloClient(initialState)
  }

  if (!apolloClient) {
    apolloClient = createApolloClient(initialState)
  }

  return apolloClient
}
