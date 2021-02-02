import { gql } from '@apollo/client'

export const EVENT_UPDATE_MUTATION = gql`
  mutation eventUpdate(
    $investorMeetingsDefaultStartupSelections: Int!
    $investorMeetingsMeetingsPerSession: Int!
    $investorMeetingsSessionDuration: Int!
    $investorMeetingsSponsorLogo: Upload
    $investorMeetingsStartupPortalOpeningAt: ISO8601DateTime
    $investorMeetingsStartupSelectionDeadline: ISO8601DateTime
  ) {
    eventUpdate(
      input: {
        investorMeetingConfiguration: {
          investorMeetingsDefaultStartupSelections: $investorMeetingsDefaultStartupSelections
          investorMeetingsMeetingsPerSession: $investorMeetingsMeetingsPerSession
          investorMeetingsSessionDuration: $investorMeetingsSessionDuration
          investorMeetingsSponsorLogo: $investorMeetingsSponsorLogo
          investorMeetingsStartupPortalOpeningAt: $investorMeetingsStartupPortalOpeningAt
          investorMeetingsStartupSelectionDeadline: $investorMeetingsStartupSelectionDeadline
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
