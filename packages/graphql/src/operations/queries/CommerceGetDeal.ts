import { gql } from '@apollo/client';

export default gql`
  query commerceGetDeal($id: ID!) {
    commerceGetDeal(id: $id) {
      active
      createdAt
      description
      endDate
      id
      lastUpdatedAt
      metadata
      name
      startDate
      dealItems {
        amount
        createdAt
        id
        lastUpdatedAt
        max
        metadata
        min
        #          product: CommerceProduct
        step
        type
      }
    }
  }
`;
