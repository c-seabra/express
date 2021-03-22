import { gql } from '@apollo/client';

export const EVENT_UPDATE_MUTATION = gql`
  mutation EventUpdate($event: EventUpdateInput!) {
    eventUpdate(input: $event) {
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
