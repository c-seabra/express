import { gql } from '@apollo/client';

export default gql`
  query CommerceGetCustomer($id: ID!, $orderId: ID!) {
    commerceGetCustomer(id: $id, orderId: $orderId) {
      address {
        city
        country
        id
        line1
        line2
        postalCode
        state
      }
      email
      firstName
      id
      lastName
      vatNumber
    }
  }
`;
