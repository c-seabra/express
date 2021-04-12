import { gql } from '@apollo/client';

export default gql`
  query CommerceListProducts {
    commerceListProducts {
      hits {
        active
        categories
        createdAt
        createdBy {
          name
          email
        }
        defaultPrice
        description
        id
        lastUpdatedAt
        lastUpdatedBy {
          name
          email
        }
        name
        price
        tags {
          id
          code
          name
          description
        }
        taxMode
        taxType {
          id
          description
          name
        }
      }
    }
  }
`;
