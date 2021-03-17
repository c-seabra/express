import { gql } from '@apollo/client';

const EVENT = gql`
  query event($slug: String) {
    event(slug: $slug) {
      id
      name
      description
      slug
      startDate
      endDate
      timezone
      timeZone {
        displayName
        ianaName
      }
      baseUrl
      country {
        id
        name
      }
      currency
    }
  }
`;

export default EVENT;
