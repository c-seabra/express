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
        product {
          id
          active
          description
          name
          price
          taxType {
            id
            description
            name
            taxes {
              rateAmount
              rateType
              id
              name
              country
            }
          }
        }
        step
        type
      }
    }
  }
`;
