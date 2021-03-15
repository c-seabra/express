import { gql } from '@apollo/client';

export const TAX_RATES_LIST = gql`
query TaxRates() {
  taxRates() {
    edges {
      node {
        country {
           name
        }
        event {
          name
          brandName
        }
        id
        name
        rateType
        taxType
        value
      }
    }
  }
}
`;
export default TAX_RATES_LIST;
