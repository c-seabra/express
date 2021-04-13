import { gql } from '@apollo/client';

const COMMERCE_SALE_PRODUCTS_LIST = gql`
  query CommerceListSaleProducts($saleId: ID!) {
    commerceListSaleProducts(saleId: $saleId) {
      hits {
        active
        createdAt
        createdBy {
          id
          name
          email
        }
        id
        price
        description
        name
        product {
          id
          name
        }
      }
      total
    }
  }
`;

export default COMMERCE_SALE_PRODUCTS_LIST;
