import { gql } from '@apollo/client';

const ATTENDANCE_APPEARANCE_SELECTION = gql`
  query AttendanceAppearanceSelectionQuery($id: ID!) {
    attendanceAppearanceSelection(id: $id) {
      appearance {
        company {
          name
        }
      }
      participations {
        companyName
        name
      }
      sessionTimeslotId
    }
  }
`;

export default ATTENDANCE_APPEARANCE_SELECTION;
