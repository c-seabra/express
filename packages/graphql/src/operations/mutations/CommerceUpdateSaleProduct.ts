import { gql } from '@apollo/client';

const COMMERCE_UPDATE_SALE_PRODUCT = gql`
  mutation CommerceUpdateSaleProduct(
    $commerceSaleProductUpdate: CommerceSaleProductUpdate!
    $id: ID!
    $saleId: ID!
  ) {
    commerceUpdateSaleProduct(
      commerceSaleProductUpdate: $commerceSaleProductUpdate
      id: $id
      saleId: $saleId
    ) {
      id
      active
    }
  }
`;

export default COMMERCE_UPDATE_SALE_PRODUCT;
