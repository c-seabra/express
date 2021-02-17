import { gql } from '@apollo/client';

const TICKET_UNLOCK_MUTATION = gql`
  mutation UnlockTicket($input: TicketUnlockInput!) {
    ticketUnlock(input: $input) {
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

export default TICKET_UNLOCK_MUTATION;
