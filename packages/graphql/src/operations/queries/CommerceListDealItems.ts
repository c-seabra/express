import { gql } from '@apollo/client';

export default gql`
  query CommerceListDealItems($dealId: ID!) {
    commerceListDealItems(dealId: $dealId) {
      hits {
        amount
        createdAt
        createdBy {
          name
          id
        }
        id
        lastUpdatedAt
        lastUpdatedBy {
          name
          id
        }
        max
        metadata
        min
        product {
          id
          name
        }
        step
        type
      }
    }
  }
`;
