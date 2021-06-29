import { gql } from '@apollo/client';

export default gql`
  mutation CommerceCreateTax($commerceTaxCreate: CommerceTaxCreate!) {
    commerceCreateTax(commerceTaxCreate: $commerceTaxCreate) {
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
