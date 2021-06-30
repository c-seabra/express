import { gql } from '@apollo/client';

export default gql`
  mutation OrderRefundReceiptSend($input: RefundReceiptSendInput!) {
    orderRefundReceiptSend(input: $input) {
      order {
        id
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
