import { gql } from '@apollo/client';

const COMMERCE_CREATE_SALE_PRODUCT = gql`
  mutation CommerceSaleProductCreate(
    $commerceSaleProductCreate: CommerceSaleProductCreate!
    $saleId: ID!
  ) {
    commerceCreateSaleProduct(
      commerceSaleProductCreate: $commerceSaleProductCreate
      saleId: $saleId
    ) {
      id
      active
    }
  }
`;

export default COMMERCE_CREATE_SALE_PRODUCT;
