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
            all {
              count
              active {
                count
                assigned {
                  count
                  accepted {
                    count
                  }
                  checkedIn {
                    count
                  }
                  duplicate {
                    count
                  }
                  locked {
                    count
                  }
                  pending {
                    count
                  }
                }
                unassigned {
                  count
                  neverAssigned {
                    count
                  }
                  rejected {
                    count
                  }
                }
              }
              void {
                count
              }
            }
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
