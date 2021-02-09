import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import fetch from "isomorphic-unfetch";

export const DEFAULT_CONFERENCE_SLUG = "ws20";

const constructContextHeaders = (commonHeaders, eventSlug, token) => {
  const headers = {
    ...commonHeaders,
    "x-event-id": eventSlug,
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
};

const createApolloClient = (apiURL) => {
  const setHeadersLink = new ApolloLink((operation, forward) => {
    const { headers, slug, token } = operation.getContext();
    const eventSlug = slug || DEFAULT_CONFERENCE_SLUG;
    const contextHeaders = constructContextHeaders(headers, eventSlug, token);
    operation.setContext({ headers: contextHeaders });
    return forward(operation);
  });

  const httpLink = new HttpLink({ fetch, uri: apiURL });

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

let apolloClient;

export default function initApollo(apiURL) {
  if (!apolloClient) {
    apolloClient = createApolloClient(apiURL);
  }

  return apolloClient;
}
