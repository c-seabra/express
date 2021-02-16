import { gql } from '@apollo/client';

export const TICKET_TYPE_RELEASE_PHASES_QUERY = gql`
  query TicketTypeReleasePhases($id: ID!) {
    ticketType(id: $id) {
      id
      releasePhases {
        edges {
          node {
            id
            name
            active
            status
            endsAt
          }
        }
      }
    }
  }
`;

export default TICKET_TYPE_RELEASE_PHASES_QUERY;
