import { gql } from '@apollo/client';

export default gql`
  mutation CommerceUpdateTag($commerceTagUpdate: CommerceTagUpdate!, $id: ID!) {
    commerceUpdateTag(commerceTagUpdate: $commerceTagUpdate, id: $id) {
      id
      code
      description
    }
  }
`;
