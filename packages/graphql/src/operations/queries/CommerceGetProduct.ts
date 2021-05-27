import { gql } from '@apollo/client';

export default gql`
  query CommerceGetProduct($id: ID!) {
    commerceGetProduct(id: $id) {
      type
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
      packagedProducts {
        packagedProduct {
          id
          name
        }
        createdAt
        id
        lastUpdatedAt
        quantity
      }
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
