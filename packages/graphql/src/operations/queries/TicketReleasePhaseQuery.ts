import { gql } from '@apollo/client';

export const TICKET_RELEASE_PHASE_QUERY = gql`
  query TicketReleasePhase($id: ID) {
    ticketReleasePhase(id: $id) {
      id
      name
      active
      status
      startsAt
      endsAt
      nextPhase {
        name
      }
    }
  }
`;

export default TICKET_RELEASE_PHASE_QUERY;
