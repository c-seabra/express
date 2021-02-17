import { gql } from '@apollo/client';

const ATTENDANCES_LIST = gql`
  query(
    $first: Int
    $filter: AttendanceFilter
    $after: String
    $searchQuery: String
  ) {
    attendances(
      first: $first
      filter: $filter
      after: $after
      searchQuery: $searchQuery
    ) {
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
`;

export default ATTENDANCES_LIST;
