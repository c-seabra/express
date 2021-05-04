import { gql } from '@apollo/client';

export default gql`
  mutation CommerceCreateTransaction(
    $commerceTransactionCreate: CommerceTransactionCreate!
    $orderId: ID!
  ) {
    commerceCreateTransaction(
      commerceTransactionCreate: $commerceTransactionCreate
      orderId: $orderId
    ) {
      status
    }
  }
`;
