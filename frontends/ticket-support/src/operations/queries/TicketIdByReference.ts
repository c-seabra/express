import { gql } from '@apollo/client'

export const TICKET_ID_BY_REFERENCE = gql`
  query GetTicketIdByReference($reference: String!) {
    ticket(reference: $reference) {
      id
      bookingRef
      state
      assignment {
        id
        state
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
`
export default TICKET_ID_BY_REFERENCE