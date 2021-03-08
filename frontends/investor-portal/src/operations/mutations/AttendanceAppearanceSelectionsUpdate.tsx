import { gql } from '@apollo/client';

const ATTENDANCE_APPEARANCE_SELECTION_UPDATE = gql`
  mutation attendanceAppearanceSelectionsUpdate(
    $attendanceIds: [ID!]!
    $status: String!
  ) {
    attendanceAppearanceSelectionUpdate(
      input: { attendanceIds: $attendanceIds, status: $status }
    ) {
      successMessage
      userErrors {
        path
        message
      }
    }
  }
`;

export default ATTENDANCE_APPEARANCE_SELECTION_UPDATE;
