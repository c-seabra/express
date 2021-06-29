import { gql } from '@apollo/client';

export default gql`
  mutation TicketUpdate($input: TicketUpdateInput!) {
    ticketUpdate(input: $input) {
      ticket {
        id
        bookingRef
      }
    }
  }
`;
