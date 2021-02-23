import { gql } from '@apollo/client';

const MAGIC_LINK_GENERATE = gql`
  mutation MagicLinkGenerate($input: AssignmentMagicLinkGenerateInput!) {
    assignmentMagicLinkGenerate(input: $input) {
      email
      loginLink
      userErrors {
        message
        path
      }
    }
  }
`;

export default MAGIC_LINK_GENERATE;
