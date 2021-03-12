import { gql } from '@apollo/client';

const EVENT_LIST = gql`
  query EventListQuery($filter: EventFilter) {
    events(filter: $filter) {
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
          versions {
            event
            createdAt
            whodunnit
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
