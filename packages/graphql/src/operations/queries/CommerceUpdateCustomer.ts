import { gql } from '@apollo/client';

export default gql`
  mutation CommerceUpdateCustomer(
    $commerceCustomerUpdate: CommerceCustomerUpdate!
    $id: ID!
    $orderId: ID!
  ) {
    commerceUpdateCustomer(
      commerceCustomerUpdate: $commerceCustomerUpdate
      id: $id
      orderId: $orderId
    ) {
      id
    }
  }
`;
