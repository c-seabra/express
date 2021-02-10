import { gql } from '@apollo/client'

const ORDER_CANCEL_MUTATION = gql`
  mutation cancelOrder($storeId: ID!, $orderId: ID!, $commerceOrderUpdate: CommerceOrderUpdate!) {
    commerceUpdateOrder(
      storeId: $storeId
      id: $orderId
      commerceOrderUpdate: $commerceOrderUpdate
    ) {
      status
      userErrors {
        message
        path
      }
    }
  }
`

// values:
//
// {  "storeId": "b5ff6381-b06f-4558-9e71-a6fc9f8cdd84",
//     "orderId": "3e9e3504-4446-4e87-ac9d-2db4021243c3",
//     "commerceOrderUpdate":{
//     "status": "CANCELLED"
// }}

export default ORDER_CANCEL_MUTATION
