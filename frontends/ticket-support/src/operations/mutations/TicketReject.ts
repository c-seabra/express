import { gql } from '@apollo/client';

const TICKET_REJECT_MUTATION = gql`
  mutation TicketReject($ticketId: ID!, $notify: Boolean) {
    ticketReject(input: { ticketId: $ticketId, notify: $notify }) {
      ticket {
        state
        assignment {
          state
        }
      }
      userErrors {
        message
        path
      }
    }
  }
`;

export default TICKET_REJECT_MUTATION;
