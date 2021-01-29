import { gql } from '@apollo/client'

// query($first: Int, $type: Attendees, $after: String, $searchQuery: String) {
//   attendees(first: $first, type: $type, after: $after, searchQuery: $searchQuery) {
export const INVESTORS_LIST = gql`
  query($first: Int, $type: Attendees, $after: String) {
    attendees(first: $first, type: $type, after: $after) {
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
