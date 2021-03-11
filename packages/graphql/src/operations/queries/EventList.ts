import { gql } from '@apollo/client';

const EVENT_LIST = gql`
  query EventListQuery {
    events {
      edges {
        cursor
        node {
          id
          name
          description
          slug
          startDate
          endDate
          timezone
          baseUrl
          country {
            name
          }
        }
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        endCursor
        startCursor
      }
    }
  }
`;

export default EVENT_LIST;
