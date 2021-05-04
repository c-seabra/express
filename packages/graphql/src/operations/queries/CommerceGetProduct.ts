import { gql } from '@apollo/client';

export default gql`
  query CommerceGetProduct($id: ID!) {
    commerceGetProduct(id: $id) {
      active
      categories {
        id
        active
        name
        description
      }
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
      metadata
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
        taxes {
          rateAmount
          rateType
          name
          country
        }
      }
    }
  }
`;
