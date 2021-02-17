import { gql } from '@apollo/client'

export const ATTENDANCE_INVESTOR_SESSION_UPDATE_MUTATION = gql`
  mutation attendanceInvestorSessionUpdate($unlockInvestor: Boolean, $attendanceId: ID, $startsAt: ISO8601DateTime) {
    attendanceInvestorSessionUpdate(
      input: {
        investorSessionConfiguration: {
          unlockInvestor: $unlockInvestor
          attendanceId: $attendanceId
          startsAt: $startsAt
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

export default ATTENDANCE_INVESTOR_SESSION_UPDATE_MUTATION
