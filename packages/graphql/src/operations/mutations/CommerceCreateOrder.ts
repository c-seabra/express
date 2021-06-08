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
      id
      billed
      currency
      customer {
        firstName
        lastName
        email
      }
      reference
      locked
      metadata
      items {
        product {
          name
        }
      }
      lastUpdatedAt
      paymentMethod {
        ...CommercePaymentMethod
      }
      status
    }
  }
  ${commercePaymentMethodFragment}
`;
