import { gql } from '@apollo/client';

export const EVENT_CREATE_MUTATION = gql`
  mutation EventCreate($event: EventCreateInput!) {
    eventCreate(input: $event) {
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

export default EVENT_CREATE_MUTATION;
