import { gql } from '@apollo/client';

export const TICKET_ASSIGN_MUTATION = gql`
  mutation TicketAssign(
    $firstName: String!
    $lastName: String
    $email: String!
    $ticketId: ID!
    $notify: Boolean
  ) {
    ticketAssign(
      input: {
        firstName: $firstName
        lastName: $lastName
        email: $email
        ticketId: $ticketId
        notify: $notify
      }
    ) {
      ticket {
        id
        assignment {
          id
          state
          assignee {
            id
            firstName
            lastName
            email
            me
          }
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

export default TICKET_ASSIGN_MUTATION;
