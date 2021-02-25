import { gql } from '@apollo/client';

export const ATTENDANCE_DETAILS_QUERY = gql`
  query AttendanceDetailsQuery($attendance_id: ID!) {
    attendance(id: $attendance_id) {
      investorSession {
        startsAt
        endsAt
      }
      name
      attendanceAppearanceSelectionsDetails{
        attendanceAppearanceSelections {
          edges {
            node {
              id
              status
              updatedAt
              startsAt
              endsAt
              appearance {
                id
                company {
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default ATTENDANCE_DETAILS_QUERY;
