import { gql } from '@apollo/client'

export const TICKET_REJECT_MUTATION = gql`
  mutation TicketReject($ticketId: ID!) {
    ticketReject(input:{ticketId:$ticketId}) {
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
`

export default TICKET_REJECT_MUTATION
