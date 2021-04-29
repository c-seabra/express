import { gql } from '@apollo/client';

export const LEGAL_ENTITY_UPDATE_MUTATION = gql`
  mutation LegalEntityUpdate($input: LegalEntityUpdateInput!) {
    legalEntityUpdate(input: $input) {
      legalEntity {
        id
        name
        regNumber
        website
        taxNumber
        email
        note
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

export default LEGAL_ENTITY_UPDATE_MUTATION;
