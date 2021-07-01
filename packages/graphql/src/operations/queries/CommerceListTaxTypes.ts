import { gql } from '@apollo/client';

export default gql`
  query CommerceListTaxTypes {
    commerceListTaxTypes {
      hits {
        id
        description
        name
        taxes {
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
            name
          }
        }
      }
    }
  }
`;
