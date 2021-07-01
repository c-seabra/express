import { gql } from '@apollo/client';

export default gql`
  mutation CommerceUpdateTax($commerceTaxUpdate: CommerceTaxUpdate!, $id: ID!) {
    commerceUpdateTax(commerceTaxUpdate: $commerceTaxUpdate, id: $id) {
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
`;
