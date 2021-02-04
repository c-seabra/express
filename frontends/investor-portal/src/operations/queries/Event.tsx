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
          sponsorLogoUrl: string
          startupPortalOpeningAt: Date
          startupPortalClosingAt: Date
          startupSelectionDeadline: Date
        }
      }
      investorSessionsSummary: [
        {
          available: number
          claimed: number
          count: number
          endsAt: string
          startsAt: string
        }
      ]
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
      investorSessionsSummary {
        available
        claimed
        count
        endsAt
        startsAt
      }
    }
  }
`

export default EVENT_QUERY
