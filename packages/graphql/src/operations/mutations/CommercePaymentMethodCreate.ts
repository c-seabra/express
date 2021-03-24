import { gql } from '@apollo/client';

const COMMERCE_PAYMENT_METHOD_CREATE = gql`
  mutation CommerceCreatePaymentMethod(
    $paymentMethod: CommercePaymentMethodCreate!
  ) {
    commerceCreatePaymentMethod(commercePaymentMethodCreate: $paymentMethod) {
      id
      gateway
      active
      name
    }
  }
`;

export default COMMERCE_PAYMENT_METHOD_CREATE;
