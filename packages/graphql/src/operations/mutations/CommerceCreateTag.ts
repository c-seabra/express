import { gql } from '@apollo/client';

export default gql`
  mutation CommerceCreateTag($commerceTagCreate: CommerceTagCreate!) {
    commerceCreateTag(commerceTagCreate: $commerceTagCreate) {
      id
      code
      description
    }
  }
`;
