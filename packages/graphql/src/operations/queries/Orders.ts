import { gql } from '@apollo/client';

export default gql`
  query Orders(
    $first: Int
    $after: String
    $filter: OrderFilter
    $searchQuery: String
  ) {
    orders(
      first: $first
      after: $after
      filter: $filter
      searchQuery: $searchQuery
    ) {
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
          versions {
            createdAt
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
`;
