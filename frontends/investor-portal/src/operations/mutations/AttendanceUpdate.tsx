import { gql } from '@apollo/client'

export const ATTENDANCE_UPDATE_MUTATION = gql`
  mutation attendanceUpdate($attendanceId: ID, $startsAt: ISO8601DateTime) {
    attendanceUpdate(
      input: { investorSessionConfiguration: { attendanceId: $attendanceId, startsAt: $startsAt } }
    ) {
      successMessage
      userErrors {
        path
        message
      }
    }
  }
`

export default ATTENDANCE_UPDATE_MUTATION
