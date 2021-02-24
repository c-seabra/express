import { ApolloError, gql } from '@apollo/client';
import { Order } from '@websummit/graphql/src/@types/operations';

export type OrderByRefQuery = {
  data?: {
    order: Order;
  };
  error?: ApolloError;
  loading?: boolean;
  refetch?: any;
};

const ORDER_QUERY = gql`
  query OrderByRef($reference: String!) {
    order(reference: $reference) {
      completedAt
      lastUpdatedAt
      state
      owner {
        firstName
        lastName
        email
      }
      source
      sourceId
      summary {
        ticketType {
          name
        }
        tickets
      }
      tickets {
        edges {
          node {
            id
            bookingRef
            state
            ticketType {
              name
            }
            order {
              owner {
                firstName
                lastName
                email
              }
            }
            assignment {
              id
              appLoginEmail
              state
              assigner {
                id
                email
                firstName
                lastName
              }
              assignee {
                id
                email
                firstName
                lastName
                lastLoginTokenCreatedAt
              }
            }
          }
        }
      }
    }
  }
`;
export default ORDER_QUERY;
