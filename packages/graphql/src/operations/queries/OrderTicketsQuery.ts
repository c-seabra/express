import { gql } from '@apollo/client';

export default gql`
  query OrderTickets($orderId: ID!, $filter: TicketFilter) {
    tickets(orderId: $orderId, filter: $filter) {
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
