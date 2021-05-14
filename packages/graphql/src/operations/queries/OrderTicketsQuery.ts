import { gql } from '@apollo/client';

export default gql`
  query OrderTickets(
    $orderId: ID
    $filter: TicketFilter
    $after: String
    $before: String
    $first: Int
    $last: Int
  ) {
    tickets(
      orderId: $orderId
      filter: $filter
      after: $after
      before: $before
      first: $first
      last: $last
    ) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        endCursor
        startCursor
      }
      edges {
        node {
          id
          bookingRef
          ticketType {
            name
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
          order {
            reference
          }
          state
          context {
            assignable
            editable
            acceptable
            rejectable
          }
        }
      }
    }
  }
`;
