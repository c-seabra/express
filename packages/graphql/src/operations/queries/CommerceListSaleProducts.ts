import { gql } from '@apollo/client';

const COMMERCE_SALE_PRODUCTS_LIST = gql`
  query CommerceListSaleProducts($saleId: ID!, $sort: [CommerceSortTerm!]) {
    commerceListSaleProducts(saleId: $saleId, sort: $sort) {
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
        type
      }
      total
    }
  }
`;

export default COMMERCE_SALE_PRODUCTS_LIST;
