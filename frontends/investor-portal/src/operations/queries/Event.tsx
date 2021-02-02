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
          startupPortalOpeningAt: Date
          startupSelectionDeadline: Date
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
      configuration {
        investorMeetingConfiguration {
          defaultStartupSelections
          meetingsPerSession
          notifyOfficeHoursInvitees
          sessionDuration
          startupPortalOpeningAt
          startupSelectionDeadline
          sponsorLogoUrl
        }
      }
    }
  }
`

export default EVENT_QUERY
