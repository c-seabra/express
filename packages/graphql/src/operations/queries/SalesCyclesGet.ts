import { gql } from '@apollo/client';

const COMMERCE_GET_SALE = gql`
  query SaleCycles($id: ID!) {
      commerceGetSale(id: $id) {
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
  }
`;

export default COMMERCE_GET_SALE;
