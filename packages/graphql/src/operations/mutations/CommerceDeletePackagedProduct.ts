import { gql } from '@apollo/client';

export default gql`
  mutation CommerceDeletePackagedProduct($id: ID!, $productId: ID!) {
    commerceDeletePackagedProduct(id: $id, productId: $productId) {
      id
    }
  }
`;
