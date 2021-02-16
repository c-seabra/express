import { gql } from '@apollo/client';

export default gql`
  query MyDashboard {
    orders {
      edges {
        node {
          id
        }
      }
    }
    tickets {
      edges {
        node {
          id
        }
      }
    }
  }
`;
