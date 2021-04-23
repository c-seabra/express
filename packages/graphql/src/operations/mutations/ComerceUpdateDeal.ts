import { gql } from '@apollo/client';

export default gql`
  mutation CommerceUpdateDeal(
    $commerceDealUpdate: CommerceDealUpdate!
    $id: ID!
  ) {
    commerceUpdateDeal(commerceDealUpdate: $commerceDealUpdate, id: $id) {
      id
      name
    }
  }
`;
