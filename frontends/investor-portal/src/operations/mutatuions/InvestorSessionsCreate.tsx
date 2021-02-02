import { gql } from '@apollo/client'

export const INVESTOR_SESSIONS_CREATE_MUTATION = gql`
  mutation investorSessionsCreate(
    $investorSessionsStartsAt: ISO8601DateTime
    $investorSessionsEndsAt: ISO8601DateTime
    $investorSessionsCount: Int
  ) {
    investorSessionsCreate(
      input: {
        investorSessionsConfiguration: {
          investorSessionsStartsAt: $investorSessionsStartsAt
          investorSessionsEndsAt: $investorSessionsEndsAt
          investorSessionsCount: $investorSessionsCount
        }
      }
    ) {
      successMessage
      userErrors {
        path
        message
      }
    }
  }
`

export default INVESTOR_SESSIONS_CREATE_MUTATION
