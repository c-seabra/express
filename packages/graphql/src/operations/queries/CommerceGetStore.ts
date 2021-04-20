import { gql } from '@apollo/client';

export default gql`
  query CommerceGetStore {
    commerceGetStore {
      id
      name
      active
      currencySymbol
      country
    }
  }
`;
