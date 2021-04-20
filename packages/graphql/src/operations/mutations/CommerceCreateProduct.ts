import { gql } from '@apollo/client';

export default gql`
  mutation commerceCreateProduct($input: CommerceProductCreate!) {
    commerceCreateProduct(commerceProductCreate: $input) {
      id
      active
    }
  }
`;
