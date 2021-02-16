import { gql } from '@apollo/client';

export const ASSIGNMENT_AUTHENTICATE_MUTATION = gql`
  mutation AssignmentAuthenticate($input: AssignmentAuthenticateInput!) {
    assignmentAuthenticate(input: $input) {
      accessToken
      conferenceSlug
      clientMutationId
      userErrors {
        message
        path
      }
    }
  }
`;

export default ASSIGNMENT_AUTHENTICATE_MUTATION;
