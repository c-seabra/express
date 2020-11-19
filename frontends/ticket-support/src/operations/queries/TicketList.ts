import { gql } from '@apollo/client'

export const TICKET_LIST = gql`
  query($filter: TicketFilter, $searchQuery: String) {
    tickets(filter: $filter, searchQuery: $searchQuery) {
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
