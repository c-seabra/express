import { gql } from '@apollo/client'

export const INVESTORS_LIST = gql`
  query($first: Int, $type: Attendees, $after: String, $searchQuery: String) {
    attendees(first: $first, type: $type, after: $after, searchQuery: $searchQuery) {
      edges {
        cursor
        node {
          id
          name
          pendingSelectionCount
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
