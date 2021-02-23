import { gql } from '@apollo/client';

export const ATTENDANCE_APPEARANCE_SELECTION_UPDATE_MUTATION = gql`
  mutation attendanceAppearanceSelectionsUpdate($attendanceIds: [ID!]!) {
    attendanceAppearanceSelectionUpdate(
      input: {
    	  attendanceIds: $attendanceIds
  	  }
    ) {
      userErrors {
        message
        path
      }
      successMessage
    }
  }
`;

export default ATTENDANCE_APPEARANCE_SELECTION_UPDATE_MUTATION;
