import { gql } from '@apollo/client'

export const ATTENDANCE_BY_BOOKING_REFERENCE_UPDATE_MUTATION = gql`
  mutation attendanceByBookingReferenceUpdate(
    $bookingReferencesArray: [String!]!
    $startupSelections: Int!
  ) {
    attendanceByBookingReferenceUpdate(
      input: {
        bookingReferencesArray: $bookingReferencesArray
        attendanceConfiguration: { officeHoursStartupSelections: $startupSelections }
      }
    ) {
      successMessage
      errorMessage
      attendances {
        attendanceId
        bookingRef
        name
      }
      invalidBookingReferences
    }
  }
`

export default ATTENDANCE_BY_BOOKING_REFERENCE_UPDATE_MUTATION
