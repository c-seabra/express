import { gql } from '@apollo/client';

export const CREATE_ORDER_MUTATION = gql`
  mutation createOrder($storeId: ID!, $input: CommerceOrderCreate!) {
    commerceCreateOrder(storeId: $storeId, commerceOrderCreate: $input) {
      id
      reference
      locked
      status
      metadata
      items {
        product {
          name
        }
      }
    }
  }
`;

export default CREATE_ORDER_MUTATION;
