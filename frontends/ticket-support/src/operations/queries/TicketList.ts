import { gql } from '@apollo/client'

const TICKET_LIST = gql`
  query($filter: TicketFilter, $searchQuery: String, $first: Int, $after: String) {
    tickets(filter: $filter, searchQuery: $searchQuery, first: $first, after: $after) {
      edges {
        cursor
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
      pageInfo {
        hasPreviousPage
        hasNextPage
        endCursor
        startCursor
      }
    }
  }
`
export default TICKET_LIST
