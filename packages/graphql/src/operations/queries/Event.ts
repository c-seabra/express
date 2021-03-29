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
        utcOffset
      }
      baseUrl
      country {
        id
        name
        code
      }
      legalEntity {
        address {
          city
          country {
            id
            name
          }
          id
          lineOne
          lineTwo
          postalCode
          region
        }
        email
        id
        name
        phone
        regNumber
        taxNumber
        website
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
