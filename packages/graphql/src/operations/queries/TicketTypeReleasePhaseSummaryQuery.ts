import { gql } from '@apollo/client';

const TICKET_TYPE_RELEASE_PHASE_SUMMARY_QUERY = gql`
  query TicketTypeReleasePhaseSummary($ticketTypeId: ID!, $releasePhaseId: ID) {
    ticketType(id: $ticketTypeId) {
      name
      activeRelease: release {
        releasePhase {
          ...ReleasePhaseSummary
        }
      }
      release(releasePhaseId: $releasePhaseId) {
        releasePhase {
          ...ReleasePhaseSummary
        }
      }
    }
  }

  fragment ReleasePhaseSummary on TicketReleasePhase {
    id
    name
    status
    startsAt
  }
`;
export default TICKET_TYPE_RELEASE_PHASE_SUMMARY_QUERY;
