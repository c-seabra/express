import { gql } from '@apollo/client';

export default gql`
  query EventAppearances($slug: String) {
    event(slug: $slug) {
      appearances {
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
