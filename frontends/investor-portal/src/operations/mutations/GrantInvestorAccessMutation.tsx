import { gql } from '@apollo/client'

export const GRANT_INVESTOR_ACCESS_MUTATION = gql`
  mutation grantInvestorAccessMutation(
    $bookingReferencesArray: [String!]!
    $startupSelections: Int!
  ) {
    grantInvestorAccessMutation(
      input: {
        bookingReferencesArray: $bookingReferencesArray
        startupSelections: $startupSelections
      }
    ) {
      successMessage
      errorMessage
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
