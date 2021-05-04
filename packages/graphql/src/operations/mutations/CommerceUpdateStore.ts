import { gql } from '@apollo/client';

export default gql`
  mutation CommerceUpdateStore($id: ID!, $input: CommerceStoreUpdate!) {
    commerceUpdateStore(id: $id, commerceStoreUpdate: $input) {
      active
      id
      name
    }
  }
`;
