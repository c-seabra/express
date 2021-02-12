import { gql } from '@apollo/client';

export default gql`
  query MyTickets {
    tickets {
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
