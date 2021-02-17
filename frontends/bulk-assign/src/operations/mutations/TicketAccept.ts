import { gql } from '@apollo/client';

export const TICKET_ACCEPT_MUTATION = gql`
  mutation ticketAccept($ticketId: ID!) {
    ticketAccept(input: { ticketId: $ticketId }) {
      userErrors {
        message
        path
      }
    }
  }
`;

export default TICKET_ACCEPT_MUTATION;
