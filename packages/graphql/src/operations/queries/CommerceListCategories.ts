import { gql } from '@apollo/client';

const COMMERCE_LIST_CATEGORIES = gql`
  query CommerceListCategories {
    commerceListCategories {
      hits {
        id
        name
        createdBy
        lastUpdatedAt
      }
    }
  }
`;

export default COMMERCE_LIST_CATEGORIES;
