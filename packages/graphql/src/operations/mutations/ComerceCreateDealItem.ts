import { gql } from '@apollo/client';

export default gql`
  mutation CommerceCreateDealItem(
    $commerceDealItemCreate: CommerceDealItemCreate!
    $dealId: ID!
  ) {
    commerceCreateDealItem(
      commerceDealItemCreate: $commerceDealItemCreate
      dealId: $dealId
    ) {
      id
    }
  }
`;
