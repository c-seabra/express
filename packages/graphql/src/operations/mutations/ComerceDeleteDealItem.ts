import { gql } from '@apollo/client';

export default gql`
  mutation CommerceDeleteDealItem($id: ID!, $dealId: ID!) {
    commerceDeleteDealItem(id: $id, dealId: $dealId) {
      id
    }
  }
`;
