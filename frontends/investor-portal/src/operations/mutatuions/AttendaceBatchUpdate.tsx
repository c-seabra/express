import { gql } from '@apollo/client'

export const ATTENDANCE_BATCH_UPDATE_MUTATION = gql`
  mutation attendanceBatchUpdate($startupSelections: Int!, $attendanceIDArray: [String!]!) {
    attendanceBatchUpdate(
      input: { startupSelections: $startupSelections, attendanceIDArray: $attendanceIDArray }
    ) {
      successMessage
      userErrors {
        path
        message
      }
    }
  }
`

export default ATTENDANCE_BATCH_UPDATE_MUTATION
