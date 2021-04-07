import { gql } from '@apollo/client';

const COMMERCE_LIST_CATEGORIES = gql`
  query CommerceListCategories {
    commerceListCategories {
      hits {
        id
        name
        createdBy
        lastUpdatedAt
        description
        active
      }
    }
  }
`;

export default COMMERCE_LIST_CATEGORIES;
