import { gql } from '@apollo/client'

export const ASSIGNMENT_LOGIN_LINK = gql`
  mutation AssignmentMagicLinkLoginRequest($email: String!) {
    assignmentMagicLinkLoginRequest(input: { email: $email }) {
      userErrors {
        message
        path
      }
    }
  }
`

export default ASSIGNMENT_LOGIN_LINK
