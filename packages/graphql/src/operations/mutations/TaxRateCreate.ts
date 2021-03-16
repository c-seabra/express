import { gql } from '@apollo/client';

export const TAX_RATE_CREATE_MUTATION = gql`
  mutation taxRateCreate($input: TaxRateCreateInput!) {
    taxRateCreate(input: $input) {
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

export default TAX_RATE_CREATE_MUTATION;
