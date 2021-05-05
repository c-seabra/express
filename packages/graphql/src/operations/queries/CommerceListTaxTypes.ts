import { gql } from '@apollo/client';

export default gql`
  query CommerceListTaxTypes {
    commerceListTaxTypes {
      hits {
        id
        description
        name
      }
    }
  }
`;
