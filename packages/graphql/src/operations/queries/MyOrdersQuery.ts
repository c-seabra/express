import { gql } from '@apollo/client';

export default gql`
  query MyOrders {
    orders {
      edges {
        node {
          id
          reference
          amount
          currency
          summary {
            tickets
            ticketType {
              name
            }
          }
          completedAt
        }
      }
    }
  }
`;
