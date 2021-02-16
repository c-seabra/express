import { gql } from '@apollo/client';

export default gql`
  query MyAssignmentDashboard {
    assignmentUser {
      email
    }
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
