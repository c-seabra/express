import { gql } from '@apollo/client';

export default gql`
  mutation CommerceCreateDeal($commerceDealCreate: CommerceDealCreate!) {
    commerceCreateDeal(commerceDealCreate: $commerceDealCreate) {
      id
      name
      code
    }
  }
`;
