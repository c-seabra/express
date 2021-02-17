import { gql } from '@apollo/client';

const TICKET_TYPES = gql`
  query {
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
export default TICKET_TYPES;
