import { gql } from '@apollo/client'

export const GRANT_INVESTOR_ACCESS_MUTATION = gql`
  mutation grantInvestorAccessMutation(
    $bookingReferences: [String!]!
    $startupSelectionsCount: Int!
  ) {
    grantInvestorAccessMutation(
      input: {
        bookingReferences: $bookingReferences
        startupSelectionsCount: $startupSelectionsCount
      }
    ) {
      successMessage
      errors {
        message
      }
      invalidBookingReferences
      tickets {
        attendanceId
        bookingRef
        name
      }
    }
  }
`

export default GRANT_INVESTOR_ACCESS_MUTATION
