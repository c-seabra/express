import { gql } from '@apollo/client'

const ATTENDANCE_APPEARANCE_SELECTION_UPDATE = gql`
  mutation attendanceAppearanceSelectionsUpdate($attendanceIds: [ID!]!) {
    attendanceAppearanceSelectionUpdate(input: { attendanceIds: $attendanceIds }) {
      successMessage
      userErrors {
        path
        message
      }
    }
  }
`

export default ATTENDANCE_APPEARANCE_SELECTION_UPDATE
