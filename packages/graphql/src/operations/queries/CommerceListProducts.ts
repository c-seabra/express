import { gql } from '@apollo/client';

const COMMERCE_SALES_LIST = gql`
  query CommerceListProducts {
    commerceListProducts {
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
        name
      }
      total
    }
  }
`;

export default COMMERCE_SALES_LIST;
