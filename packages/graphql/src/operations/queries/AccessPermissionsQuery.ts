import { gql } from '@apollo/client';

export const ACCESS_PERMISSIONS_QUERY = gql`
  query AccessPermissions($ticketTypeIds: [ID!]) {
    accessPermissions(ticketTypeIds: $ticketTypeIds) {
      edges {
        node {
          id
          title
          detail
          ticketTypes(ids: $ticketTypeIds) {
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

export default ACCESS_PERMISSIONS_QUERY;
