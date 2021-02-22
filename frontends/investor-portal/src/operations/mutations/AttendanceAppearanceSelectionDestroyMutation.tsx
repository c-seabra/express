import { gql } from '@apollo/client';

export const ATTENDANCE_APPEARANCE_SELECTION_DESTROY_MUTATION = gql`
  mutation attendanceAppearanceSelectionDestroy($selectionId: ID!) {
    attendanceAppearanceSelectionDestroy(input: { id: $selectionId }) {
      userErrors {
        path
        message
      }
      successMessage
    }
  }
`;

export default ATTENDANCE_APPEARANCE_SELECTION_DESTROY_MUTATION;
