import { gql } from '@apollo/client';

export const TICKET_REJECT_MUTATION = gql`
  mutation TicketReject($ticketId: ID!) {
    ticketReject(input: { ticketId: $ticketId }) {
      ticket {
        id
        assignment {
          id
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

export default TICKET_REJECT_MUTATION;
