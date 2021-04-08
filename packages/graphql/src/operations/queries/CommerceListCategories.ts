import { gql } from '@apollo/client';

const COMMERCE_LIST_CATEGORIES = gql`
  query CommerceListCategories {
    commerceListCategories {
      hits {
        id
        name
        createdBy {
          id
          name
          email
        }
        lastUpdatedAt
        description
        active
      }
    }
  }
`;

export default COMMERCE_LIST_CATEGORIES;
