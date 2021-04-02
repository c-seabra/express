import { gql } from '@apollo/client';

const COMMERCE_CREATE_SALE = gql`
  mutation CommerceCreateSale($commerceSale: CommerceSaleCreate!) {
    commerceCreateSale(commerceSaleCreate: $commerceSale) {
      id
      name
    }
  }
`;

export default COMMERCE_CREATE_SALE;
