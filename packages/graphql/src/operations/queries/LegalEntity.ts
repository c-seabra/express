import { gql } from '@apollo/client';

const LEGAL_ENTITY = gql`
  query legalEntity($id: ID!) {
    legalEntity(id: $id) {
      address {
        city
        country {
          code
          id
          name
        }
        id
        lineOne
        lineTwo
        postalCode
        region
      }
      email
      id
      name
      phone
      regNumber
      taxNumber
      website
    }
  }
`;

export default LEGAL_ENTITY;
