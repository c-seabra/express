import { gql } from '@apollo/client'

export const INVESTOR_SESSIONS_UPDATE_MUTATION = gql`
  mutation investorSessionsUpdate(
    $investorSessionsStartDate: ISO8601DateTime
    $investorSessionsEndDate: ISO8601DateTime
    $investorSessionsCount: Int
  ) {
    investorSessionsUpdate(
      input: {
        investorSessionsConfigurations: {
          investorSessionsStartDate: $investorSessionsStartDate
          investorSessionsEndDate: $investorSessionsEndDate
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

export default INVESTOR_SESSIONS_UPDATE_MUTATION
