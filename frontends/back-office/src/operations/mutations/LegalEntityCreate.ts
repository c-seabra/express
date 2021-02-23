import { gql } from "@apollo/client";

export const LEGAL_ENTITY_CREATE_MUTATION = gql`
  mutation LegalEntityCreate(
    $name: String!
    $regNumber: String
    $website: String
    $taxNumber: String
    $email: String
    $address: AddressInput
  ) {
    legalEntityCreate(
      input: {
        name: $name
        regNumber: $regNumber
        website: $website
        taxNumber: $taxNumber
        email: $email
        address: $address
      }
    ) {
      legalEntity {
        id
        name
        regNumber
        website
        taxNumber
        email
        address {
          id
          city
          postalCode
          lineOne
          lineTwo
          region
          country {
            name
          }
        }
      }
      userErrors {
        message
        path
      }
    }
  }
`;

export default LEGAL_ENTITY_CREATE_MUTATION;
