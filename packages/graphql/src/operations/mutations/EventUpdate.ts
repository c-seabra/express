import { gql } from '@apollo/client';

export const EVENT_UPDATE_MUTATION = gql`
  mutation EventUpdate($input: EventUpdateInput!) {
    eventUpdate(input: $input) {
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
        legalEntity {
          id
          name
        }
      }
      userErrors {
        message
        path
      }
    }
  }
`;

export default EVENT_UPDATE_MUTATION;
