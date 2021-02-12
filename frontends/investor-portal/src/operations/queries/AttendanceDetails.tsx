import { gql } from '@apollo/client'

export const ATTENDANCE_DETAILS_QUERY = gql`
  query($attendance_id: ID!) {
    attendance(id: $attendance_id) {
      investorSession {
        startsAt
        endsAt
      }
      name
      attendanceAppearanceSelections {
        edges {
          node {
            id
            status
            updatedAt
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
`

export default ATTENDANCE_DETAILS_QUERY
