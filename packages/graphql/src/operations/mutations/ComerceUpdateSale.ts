import { gql } from '@apollo/client';

const COMMERCE_UPDATE_SALE = gql`
  mutation CommerceUpdateSale($commerceSale: CommerceSaleUpdate!, $id: ID!) {
    commerceUpdateSale(commerceSaleUpdate: $commerceSale, id: $id) {
      id
      name
    }
  }
`;

export default COMMERCE_UPDATE_SALE;
