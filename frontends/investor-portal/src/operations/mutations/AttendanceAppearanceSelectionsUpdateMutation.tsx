import { gql } from '@apollo/client';

export const ATTENDANCE_APPEARANCE_SELECTIONS_UPDATE_MUTATION = gql`
  mutation attendanceAppearanceSelectionsUpdate(
    $attendanceIds: [ID!]!
    $unlockStartup: Boolean!
  ) {
    attendanceAppearanceSelectionsUpdate(
      input: { attendanceIds: $attendanceIds, unlockStartup: $unlockStartup }
    ) {
      userErrors {
        message
        path
      }
      successMessage
    }
  }
`;

export default ATTENDANCE_APPEARANCE_SELECTIONS_UPDATE_MUTATION;
