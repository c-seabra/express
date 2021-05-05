import { gql } from '@apollo/client';

export default gql`
  mutation commerceUpdateProduct($id: ID!, $input: CommerceProductUpdate!) {
    commerceUpdateProduct(id: $id, commerceProductUpdate: $input) {
      id
      active
    }
  }
`;
