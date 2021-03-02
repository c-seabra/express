import { gql } from '@apollo/client';

export const INVESTOR_MEETING_CONFIGURATION_UPDATE = gql`
  mutation investorMeetingConfigurationUpdate(
    $investorMeetingsDefaultStartupSelections: Int!
    $investorMeetingsMeetingsPerSession: Int!
    $investorMeetingsSessionDuration: Int!
    $investorMeetingsSponsorLogo: String
    $investorMeetingsStartupPortalOpeningAt: ISO8601DateTime
    $investorMeetingsStartupPortalClosingAt: ISO8601DateTime
    $investorMeetingsStartupSelectionDeadline: ISO8601DateTime
  ) {
    investorMeetingConfigurationUpdate(
      input: {
        investorMeetingConfiguration: {
          investorMeetingsDefaultStartupSelections: $investorMeetingsDefaultStartupSelections
          investorMeetingsMeetingsPerSession: $investorMeetingsMeetingsPerSession
          investorMeetingsSessionDuration: $investorMeetingsSessionDuration
          investorMeetingsSponsorLogo: $investorMeetingsSponsorLogo
          investorMeetingsStartupPortalOpeningAt: $investorMeetingsStartupPortalOpeningAt
          investorMeetingsStartupPortalClosingAt: $investorMeetingsStartupPortalClosingAt
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
`;

export default INVESTOR_MEETING_CONFIGURATION_UPDATE;
