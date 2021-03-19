import { gql } from '@apollo/client';

const COUNTRIES = gql`
  query countries {
    countries {
      edges {
        node {
          name
          code
          id
        }
      }
    }
  }
`;

export default COUNTRIES;
