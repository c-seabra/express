import { gql } from '@apollo/client';

export default gql`
  query CommerceGetStore {
    commerceGetStore {
      currencySymbol
      country
      taxTypes {
        id
        name
        description
        taxes {
          id
          country
          name
          rateAmount
          rateType
        }
      }
    }
  }
`;
