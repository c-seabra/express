import { gql } from '@apollo/client';

const COMMERCE_SALES_LIST = gql`
  query SalesCycles {
    commerceListSales {
      hits {
        active
        createdAt
        createdBy {
          id
          name
          email
        }
        description
        endDate
        id
        lastUpdatedAt
        name
        startDate
      }
      total
    }
  }
`;

export default COMMERCE_SALES_LIST;
