import { gql } from '@apollo/client'

export const IDENTITY_EMAIL_UPDATE = gql`
  mutation assignmentAccountUpdate($accountId: ID!, $email: String!) {
    assignmentAccountUpdate(input: { accountId: $accountId, email: $email }) {
      account {
        id
        email
      }
      userErrors {
        message
        path
      }
    }
  }
`

export default IDENTITY_EMAIL_UPDATE
