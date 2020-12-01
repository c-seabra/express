import { gql } from '@apollo/client'

export const TICKET = gql`
  query Ticket($reference: String!) {
    ticket(reference: $reference) {
      id
      bookingRef
      state
      ticketType {
        name
      }
      order {
        reference
        owner {
          firstName
          lastName
          email
        }
      }
      assignment {
        id
        appLoginEmail
        state
        assigner {
          id
          email
          firstName
          lastName
        }
        assignee {
          id
          email
          firstName
          lastName
          lastLoginTokenCreatedAt
        }
      }
    }
  }
`
export default TICKET
