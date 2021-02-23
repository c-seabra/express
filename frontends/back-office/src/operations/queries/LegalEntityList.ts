import { gql } from "@apollo/client";

const LEGAL_ENTITY_LIST = gql`
  query LegalEntityListQuery {
    legalEntities {
      edges {
        cursor
        node {
          id
          name
          regNumber
          website
          taxNumber
          email
          address {
            id
            city
            postalCode
            lineOne
            lineTwo
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

export default LEGAL_ENTITY_LIST;
