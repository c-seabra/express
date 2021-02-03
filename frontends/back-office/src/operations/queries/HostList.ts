import { gql } from "@apollo/client";

const HOST_LIST = gql`
  query HostListQuery {
    hosts {
      edges {
        cursor
        node {
          id
          name
          regNumber
          website
          taxNumber
          email
          invoiceAddress {
            id
            city
            postalCode
            street
            region
            country {
              name
            }
          }
        }
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        endCursor
        startCursor
      }
    }
  }
`;

export default HOST_LIST;
