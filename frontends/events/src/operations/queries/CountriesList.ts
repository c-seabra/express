import { gql } from '@apollo/client';

const COUNTRIES_LIST = gql`
  query CountriesListQuery {
    countries {
      edges {
        cursor
        node {
          id
          name
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

export default COUNTRIES_LIST;
