import { gql } from '@apollo/client'

const ORDER_LIST = gql`
  query($first: Int, $after: String) {
    orders(first: $first, after: $after) {
      edges {
        cursor
        node {
          id
          amount
          completedAt
          currency
          owner {
            firstName
            lastName
            email
          }
          state
          reference
          ticketsSummary {
            activeCount
            checkedInCount
            lockedCount
            voidCount
          }
          summary {
            ticketType {
              name
              description
            }
            tickets
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

export default ORDER_LIST
