import { gql } from '@apollo/client'

export const EVENT_UPDATE_MUTATION = gql`
  mutation eventUpdate(
    $investorMeetingsDefaultStartupSelections: Int!
    $investorMeetingsMeetingsPerSession: Int!
    $investorMeetingsSessionDuration: Int!
    $investorMeetingsSponsorLogo: Upload
  ) {
    eventUpdate(
      input: {
        investorMeetingConfiguration: {
          investorMeetingsDefaultStartupSelections: $investorMeetingsDefaultStartupSelections
          investorMeetingsMeetingsPerSession: $investorMeetingsMeetingsPerSession
          investorMeetingsSessionDuration: $investorMeetingsSessionDuration
          investorMeetingsSponsorLogo: $investorMeetingsSponsorLogo
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
