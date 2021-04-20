import { gql } from '@apollo/client';

const COMMERCE_CREATE_PRODUCT = gql`
  mutation commerceCreateProduct($input: CommerceProductCreate!) {
    commerceCreateProduct(commerceProductCreate: $input) {
      id
      active
    }
  }
`;

export default COMMERCE_CREATE_PRODUCT;
