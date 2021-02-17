import { gql } from '@apollo/client';

export const ASSIGNMENT_USER = gql`
  query GetAssignmentByEmail($email: String!) {
    assignmentUser(email: $email) {
      assigneeAssignments {
        edges {
          node {
            assignee {
              email
            }
          }
        }
      }
    }
  }
`;
export default ASSIGNMENT_USER;
