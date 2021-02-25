import { gql } from '@apollo/client';

export const SESSION_TIMESLOT_PARTICIPATION_CREATE = gql`
  mutation sessionTimeslotParticipationCreate(
    $attendanceId: ID!
    $sessionTimeslotId: ID!
  ) {
    sessionTimeslotParticipationCreate(
      input: {
        attendanceId: $attendanceId
        sessionTimeslotId: $sessionTimeslotId
      }
    ) {
      participations {
        companyName
        name
      }
      successMessage
      userErrors {
        path
        message
      }
    }
  }
`;

export default SESSION_TIMESLOT_PARTICIPATION_CREATE;
