import { gql } from '@apollo/client';

export const TICKET_VOID_MUTATION = gql`
  mutation VoidTicket($input: TicketVoidInput!) {
    ticketVoid(input: $input) {
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
export default TICKET_VOID_MUTATION;
