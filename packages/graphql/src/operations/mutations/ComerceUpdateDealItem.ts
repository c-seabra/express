import { gql } from '@apollo/client';

export default gql`
  mutation CommerceUpdateDealItem(
    $commerceDealItemUpdate: CommerceDealItemUpdate!
    $id: ID!
    $dealId: ID!
  ) {
    commerceUpdateDealItem(
      commerceDealItemUpdate: $commerceDealItemUpdate
      dealId: $dealId
      id: $id
    ) {
      id
    }
  }
`;
