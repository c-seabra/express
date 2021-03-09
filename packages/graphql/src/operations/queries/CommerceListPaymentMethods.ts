import { gql } from '@apollo/client';

export default gql`
  query CommerceListPaymentMethods {
    commerceListPaymentMethods {
      id
      name
      configuration
    }
  }
`;
