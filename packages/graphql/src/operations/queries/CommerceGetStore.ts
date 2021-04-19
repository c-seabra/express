import { gql } from '@apollo/client';

export default gql`
  query CommerceGetStore {
    commerceGetStore {
      currencySymbol
      country
    }
  }
`;
