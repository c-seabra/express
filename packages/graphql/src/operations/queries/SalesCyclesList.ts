import { gql } from '@apollo/client';

const COMMERCE_SALES_LIST = gql`
  query SalesCycles {
    commerceListSales {
      hits {
        active
        createdAt
        createdBy
        description
        endDate
        id
        lastUpdatedAt
        lastUpdatedBy
        name
        startDate
      }
      total
    }
  }
`;

export default COMMERCE_SALES_LIST;
