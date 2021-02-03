import { gql } from '@apollo/client'

export const INVESTORS_LIST = gql`
  query($first: Int, $filter: AttendanceFilter, $after: String) {
    attendances(first: $first, filter: $filter, after: $after) {
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
