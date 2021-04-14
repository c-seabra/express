import { gql } from '@apollo/client';

const COMMERCE_CREATE_CATEGORY = gql`
  mutation commerceCreateCategory($input: CommerceCategoryCreate!) {
    commerceCreateCategory(commerceCategoryCreate: $input) {
      id
      active
    }
  }
`;

export default COMMERCE_CREATE_CATEGORY;
