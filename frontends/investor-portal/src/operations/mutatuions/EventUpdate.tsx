import { gql } from '@apollo/client'

export const EVENT_UPDATE_MUTATION = gql`
  mutation eventUpdate(
    $investorMeetingsDefaultStartupSelections: Int!
    $investorMeetingsMeetingsPerSession: Int!
    $investorMeetingsSessionDuration: Int!
  ) {
    eventUpdate(
      input: {
        investorMeetingsConfigurations: {
          investorMeetingsDefaultStartupSelections: $investorMeetingsDefaultStartupSelections
          investorMeetingsMeetingsPerSession: $investorMeetingsMeetingsPerSession
          investorMeetingsSessionDuration: $investorMeetingsSessionDuration
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

export default EVENT_UPDATE_MUTATION
