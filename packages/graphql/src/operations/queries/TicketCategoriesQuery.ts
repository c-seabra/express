import { gql } from '@apollo/client';

export const TICKET_CATEGORIES_QUERY = gql`
  query TicketCategories {
    ticketCategories {
      edges {
        node {
          id
          name
          ticketTypes {
            edges {
              node {
                id
              }
            }
          }
        }
      }
    }
  }
`;
export default TICKET_CATEGORIES_QUERY;
