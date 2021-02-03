import { gql } from "@apollo/client";

export const HOST_CREATE_MUTATION = gql`
  mutation HostCreate(
    $name: String!
    $regNumber: String
    $website: String
    $taxNumber: String
    $email: String
    $invoiceAddress: AddressInput
  ) {
    hostCreate(
      input: {
        name: $name
        regNumber: $regNumber
        website: $website
        taxNumber: $taxNumber
        email: $email
        invoiceAddress: $invoiceAddress
      }
    ) {
      host {
        id
        name
        regNumber
        website
        taxNumber
        email
        invoiceAddress {
          id
          city
          postalCode
          street
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

export default HOST_CREATE_MUTATION;
