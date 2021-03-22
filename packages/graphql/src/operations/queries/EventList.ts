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
          taxRates {
            edges {
              node {
                id
                rateType
                country {
                  name
                }
                name
                taxType
                value
              }
            }
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
