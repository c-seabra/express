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
        code
      }
      legalEntity {
        id
        name
        phone
      }
      taxNumber
      currency
      taxRates {
        edges {
          node {
            id
            rateType
            country {
              name
              id
              code
            }
            name
            taxType
            value
          }
        }
      }
    }
  }
`;

export default EVENT;
