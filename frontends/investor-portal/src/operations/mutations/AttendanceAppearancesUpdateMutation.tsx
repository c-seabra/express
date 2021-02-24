import { gql } from '@apollo/client';

export const ATTENDANCE_APPEARANCES_UPDATE_MUTATION = gql`
  mutation attendanceAppearancesUpdate(
    $appearanceIds: [ID!]!
    $unlockStartup: Boolean!
  ) {
    attendanceAppearancesUpdate(
      input: { appearanceIds: $appearanceIds, unlockStartup: $unlockStartup }
    ) {
      userErrors {
        message
        path
      }
      successMessage
    }
  }
`;

export default ATTENDANCE_APPEARANCES_UPDATE_MUTATION;
