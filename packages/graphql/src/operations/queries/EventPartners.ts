import { gql } from '@apollo/client';

export default gql`
  query EventPartners($slug: String) {
    event(slug: $slug) {
      partners {
        edges {
          node {
            id
            company {
              name
            }
          }
        }
      }
    }
  }
`;
