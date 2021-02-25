import { gql } from '@apollo/client';

export const EVENT_CREATE_MUTATION = gql`
  mutation EventCreate(
    $slug: String
    $name: String!
    $description: String
    $taxNumber: String!
    $startDate: String
    $endDate: String
    $timezone: String
    $currency: CurrencyCode
    $baseUrl: String
    $countryId: ID
    $legalEntityId: ID
  ) {
    eventCreate(
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

export default EVENT_CREATE_MUTATION;
