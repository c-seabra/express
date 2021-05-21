import { gql } from '@apollo/client';

export default gql`
  mutation OrderInvoiceSend($input: OrderInvoiceSendInput!) {
    orderInvoiceSend(input: $input) {
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
