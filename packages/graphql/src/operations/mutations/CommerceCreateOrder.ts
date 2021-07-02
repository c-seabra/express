import { gql } from '@apollo/client';

import { commercePaymentMethodFragment } from '../queries/CommerceGetOrder';

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
