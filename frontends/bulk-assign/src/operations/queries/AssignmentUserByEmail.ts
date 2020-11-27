import { gql } from '@apollo/client'

export const ASSIGNMENT_USER = gql`
  query GetAssignmentByEmail($email: String!) {
    assignmentUser(
      email: $email
    ) {
      email
    }
  }
`
export default ASSIGNMENT_USER