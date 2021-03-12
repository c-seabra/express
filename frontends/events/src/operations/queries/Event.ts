import { gql } from '@apollo/client';

const EVENT_QUERY = gql`
  query EventQuery($slug: String) {
    event(slug: $slug) {
      id
      name
      description
      slug
      startDate
      endDate
      timezone
      baseUrl
      country {
        id
        name
      }
      currency
    }
  }
`;

export default EVENT_QUERY;
