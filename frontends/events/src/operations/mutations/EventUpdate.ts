import { gql } from '@apollo/client';

export const EVENT_UPDATE_MUTATION = gql`
  mutation EventUpdate(
    $slug: String!
    $name: String
    $description: String
    $taxNumber: String
    $startDate: String
    $endDate: String
    $timezone: String
    $currency: CurrencyCode
    $baseUrl: String
    $countryId: ID
    $legalEntityId: ID
  ) {
    eventUpdate(
      input: {
        slug: $slug
        name: $name
        description: $description
        taxNumber: $taxNumber
        startDate: $startDate
        endDate: $endDate
        timezone: $timezone
        currency: $currency
        baseUrl: $baseUrl
        countryId: $countryId
        legalEntityId: $legalEntityId
      }
    ) {
      event {
        id
        name
        description
        taxNumber
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
      userErrors {
        message
        path
      }
    }
  }
`;

export default EVENT_UPDATE_MUTATION;
