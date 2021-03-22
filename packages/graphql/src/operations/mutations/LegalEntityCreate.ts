import { gql } from '@apollo/client';

export const LEGAL_ENTITY_CREATE_MUTATION = gql`
  mutation LegalEntityCreate($input: LegalEntityCreateInput!) {
    legalEntityCreate(input: $input) {
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
