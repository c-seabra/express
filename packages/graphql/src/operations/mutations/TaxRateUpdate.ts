import { gql } from '@apollo/client';

export const TAX_RATE_UPDATE_MUTATION = gql`
  mutation TaxRateUpdate($input: TaxRateUpdateInput!) {
    taxRateUpdate(input: $input) {
      taxRate {
        id
        name
        value
      }
      userErrors {
        message
        path
      }
    }
  }
`;

export default TAX_RATE_UPDATE_MUTATION;
