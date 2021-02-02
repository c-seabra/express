import { ApolloError, gql } from '@apollo/client'

export type EventQuery = {
  data?: {
    event: {
      timezone: string
      configuration: {
        investorMeetingConfiguration: {
          defaultStartupSelections: number
          meetingsPerSession: number
          notifyOfficeHoursInvitees: number
          sessionDuration: number
          startupPortalOpeningAt: Date
          startupPortalClosingAt: Date
          startupSelectionDeadline: Date
          sponsorLogoUrl: String
        }
      }
    }
  }
  error?: ApolloError
  loading?: boolean
}

export const EVENT_QUERY = gql`
  query {
    event {
      timezone
      configuration {
        investorMeetingConfiguration {
          defaultStartupSelections
          meetingsPerSession
          notifyOfficeHoursInvitees
          sessionDuration
          startupPortalOpeningAt
          startupPortalClosingAt
          startupSelectionDeadline
          sponsorLogoUrl
        }
      }
    }
  }
`

export default EVENT_QUERY
