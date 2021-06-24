import { gql } from '@apollo/client';

export default gql`
  query TicketTypes {
    ticketTypes {
      edges {
        cursor
        node {
          id
          name
        }
      }
    }
  }
`;
