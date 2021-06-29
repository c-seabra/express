import { gql } from '@apollo/client';

export default gql`
  query CommerceListTaxes {
    commerceListTaxes {
      hits {
        country
        createdAt
        createdBy {
          name
        }
        id
        lastUpdatedAt
        lastUpdatedBy {
          name
        }
        metadata
        name
        note
        rateAmount
        rateType
        taxType {
          id
          name
          taxes {
            name
          }
        }
      }
    }
  }
`;
