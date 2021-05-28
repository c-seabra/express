import { gql } from '@apollo/client';

export default gql`
  query Tickets(
    $orderId: ID
    $filter: TicketFilter
    $searchQuery: String
    $first: Int
    $after: String
    $before: String
    $last: Int
  ) {
    tickets(
      orderId: $orderId
      filter: $filter
      after: $after
      before: $before
      first: $first
      last: $last
      searchQuery: $searchQuery
    ) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        endCursor
        startCursor
      }
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
            reference
            owner {
              firstName
              lastName
              email
            }
          }
          state
          context {
            assignable
            editable
            acceptable
            rejectable
          }
          assignment {
            id
            state
            appLoginEmail
            assignee {
              id
              me
              firstName
              lastName
              email
              phoneNumber
              city
              companyName
              companySizeId
              industryId
              jobTitle
              marketingConsent
              passportNumber
              personalisationConsent
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
`;
