import { gql } from '@apollo/client';

export const TICKET_UNVOID_MUTATION = gql`
  mutation TicketUnvoid($input: TicketUnvoidInput!) {
    ticketUnvoid(input: $input) {
      ticket {
        id
        state
        bookingRef
      }
      userErrors {
        message
        path
      }
    }
  }
`;

export default TICKET_UNVOID_MUTATION;
