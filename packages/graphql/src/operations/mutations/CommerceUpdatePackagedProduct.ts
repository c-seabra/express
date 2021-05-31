import { gql } from '@apollo/client';

export default gql`
  mutation CommerceUpdatePackagedProduct(
    $commercePackagedProductUpdate: CommercePackagedProductUpdate!
    $id: ID!
    $productId: ID!
  ) {
    commerceUpdatePackagedProduct(
      commercePackagedProductUpdate: $commercePackagedProductUpdate
      id: $id
      productId: $productId
    ) {
      id
    }
  }
`;
