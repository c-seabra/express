import { gql } from '@apollo/client'

export const TICKET_LIST = gql`
  query {
    tickets {
      edges {
        node {
          id
          bookingRef
          state
          ticketType {
            name
          }
          order {
            owner {
              firstName
              lastName
              email
            }
          }
          assignment {
            state
            assignee {
              email
              firstName
              lastName
            }
          }
        }
      }
    }
  }
`
export default TICKET_LIST