import { gql } from '@apollo/client'

export const TICKET_ASSIGN_MUTATION = gql`
  mutation TicketAssign($firstName: String!, $lastName: String, $email: String!, $ticketId: ID!) {
    ticketAssign(
      input: { firstName: $firstName, lastName: $lastName, email: $email, ticketId: $ticketId }
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
`

export default TICKET_ASSIGN_MUTATION
