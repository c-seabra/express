import { gql } from '@apollo/client';

const commercePaymentMethodFragment = gql`
  fragment CommercePaymentMethod on CommercePaymentMethod {
    id
    name
  }
`;

export default gql`
  mutation CommerceCreateOrder($commerceOrderCreate: CommerceOrderCreate!) {
    commerceCreateOrder(commerceOrderCreate: $commerceOrderCreate) {
      billed
      currency
      customer {
        firstName
        lastName
        email
      }
      currency
      id
      lastUpdatedAt
      paymentMethod {
        ...CommercePaymentMethod
      }
      status
    }
  }
  ${commercePaymentMethodFragment}
`;
