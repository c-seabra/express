import { gql } from '@apollo/client';

export const TICKET_ACCEPT_MUTATION = gql`
  mutation TicketAccept($ticketId: ID!) {
    ticketAccept(input: { ticketId: $ticketId }) {
      ticket {
        id
        assignment {
          id
          state
        }
        context {
          assignable
          editable
          acceptable
          rejectable
        }
      }
      userErrors {
        message
        path
      }
    }
  }
`;

export default TICKET_ACCEPT_MUTATION;
