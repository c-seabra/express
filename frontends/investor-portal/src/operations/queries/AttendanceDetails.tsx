import { gql } from '@apollo/client'

export const ATTENDANCE_DETAILS_QUERY = gql`
  query($attendance_id: ID!) {
    attendance(id: $attendance_id) {
      name
      attendanceAppearanceSelections {
        edges {
          node {
            id
            status
            createdAt
            updatedAt
            submittedAt
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
