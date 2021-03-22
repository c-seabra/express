import { gql } from '@apollo/client';

export default gql`
  query CommerceListPaymentMethods {
    commerceListPaymentMethods {
      hits {
        id
        name
        configuration
      }
    }
  }
`;
