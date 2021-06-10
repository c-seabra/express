import { gql } from '@apollo/client';

export default gql`
  mutation CommerceCreatePackagedProduct(
    $commercePackagedProductCreate: CommercePackagedProductCreate!
    $productId: ID!
  ) {
    commerceCreatePackagedProduct(
      commercePackagedProductCreate: $commercePackagedProductCreate
      productId: $productId
    ) {
      id
    }
  }
`;
