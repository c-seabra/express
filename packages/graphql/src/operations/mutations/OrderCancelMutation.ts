import {gql} from "@apollo/client";

export const COMMERCE_ORDER_UPDATE_MUTATION = gql`
  mutation UpdateCommerceOrder(
    $commerceOrderUpdate: CommerceOrderUpdate!
    $id: ID!
    $storeId: ID
  ) {
    commerceUpdateOrder(
      commerceOrderUpdate: $commerceOrderUpdate
      id: $id
      storeId: $storeId
    ) {
      status
    }
  }
`;

export default COMMERCE_ORDER_UPDATE_MUTATION
