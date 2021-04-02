import { gql } from '@apollo/client';

const COMMERCE_UPDATE_CATEGORY = gql`
  mutation commerceUpdateCategory($id: ID!, $input: CommerceCategoryUpdate!) {
    commerceUpdateCategory(id: $id, commerceCategoryUpdate: $input) {
      id
      active
    }
  }
`;

export default COMMERCE_UPDATE_CATEGORY;
