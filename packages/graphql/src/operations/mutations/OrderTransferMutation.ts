import { gql } from '@apollo/client';

export const ORDER_TRANSFER_MUTATION = gql`
  mutation OrderTransfer($input: OrderUpdateInput!) {
    orderUpdate(input: $input) {
      clientMutationId
      order {
        owner {
          email
        }
      }
      userErrors {
        message
        path
      }
    }
  }
`;

export default ORDER_TRANSFER_MUTATION;
