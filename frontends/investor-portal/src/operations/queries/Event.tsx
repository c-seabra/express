import { ApolloError, gql } from '@apollo/client'

export type EventQuery = {
  data?: {
    event: {
      configuration: {
        investorMeetingConfiguration: {
          defaultStartupSelections: number
          meetingsPerSession: number
          notifyOfficeHoursInvitees: number
          sessionDuration: number
          sponsorLogoUrl: string
          startupPortalClosingAt: Date
          startupPortalOpeningAt: Date
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
      timeZone: {
        ianaName: string
      }
    }
  }
  error?: ApolloError
  loading?: boolean
}

export const EVENT_QUERY = gql`
  query {
    event {
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
      timeZone {
        ianaName
      }
    }
  }
`

export default EVENT_QUERY
