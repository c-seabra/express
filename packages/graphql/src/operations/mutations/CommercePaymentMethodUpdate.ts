import { gql } from '@apollo/client';

const COMMERCE_PAYMENT_METHOD_UPDATE = gql`
  mutation CommerceUpdatePaymentMethod(
    $paymentMethod: CommercePaymentMethodUpdate!
    $id: ID!
  ) {
    commerceUpdatePaymentMethod(
      commercePaymentMethodUpdate: $paymentMethod
      id: $id
    ) {
      id
      gateway
      active
      name
    }
  }
`;

export default COMMERCE_PAYMENT_METHOD_UPDATE;
