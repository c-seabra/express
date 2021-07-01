import { gql } from '@apollo/client';

export default gql`
  query Ticket($reference: String!) {
    ticket(reference: $reference) {
      id
      bookingRef
      state
      ticketType {
        id
        name
      }
      order {
        reference
        source
        owner {
          firstName
          lastName
          email
        }
      }
      assignment {
        id
        appLoginEmail
        state
        assigner {
          id
          email
          firstName
          lastName
        }
        assignee {
          id
          email
          firstName
          lastName
          bio
          city
          companyName
          companySizeId
          email
          gender
          industryId
          jobTitle
          phoneNumber
          marketingConsent
          personalisationConsent
          lastLoginTokenCreatedAt
        }
      }
    }
  }
`;
