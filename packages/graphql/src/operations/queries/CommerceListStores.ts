import { gql } from '@apollo/client';

export default gql`
  query CommerceListStores {
    commerceListStores {
      hits {
        id
        name
        slug
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
  }
`;
