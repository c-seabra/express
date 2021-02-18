import { gql } from '@apollo/client';

const commerceTaxTypeFragment = gql`
  fragment CommerceTaxType on CommerceTaxType {
    createdAt
    createdBy
    description
    id
    lastUpdatedAt
    lastUpdatedBy
    name
  }
`;

const commerceTaxFragment = gql`
  fragment CommerceTax on CommerceTax {
    country
    createdAt
    createdBy
    id
    lastUpdatedAt
    lastUpdatedBy
    name
    rateAmount
    rateType
    taxType {
      ...CommerceTaxType
    }
  }
  ${commerceTaxTypeFragment}
`;

const commerceProductFragment = gql`
  fragment CommerceProduct on CommerceProduct {
    active
    createdAt
    createdBy
    description
    id
    lastUpdatedAt
    lastUpdatedBy
    name
    price
    taxMode
  }
`;

const commerceOrderItemFragment = gql`
  fragment CommerceOrderItem on CommerceOrderItem {
    createdAt
    createdAt
    createdBy
    id
    itemName
    lastUpdatedAt
    lastUpdatedBy
    price
    product {
      ...CommerceProduct
    }
    productMetadata
    quantity
    subTotal
    tax {
      ...CommerceTax
    }
    taxTotal
  }
  ${commerceProductFragment}
  ${commerceTaxFragment}
`;

export const commercePaymentMethodFragment = gql`
  fragment CommercePaymentMethod on CommercePaymentMethod {
    id
    name
  }
`;

const commerceAddressFragment = gql`
  fragment CommerceAddress on CommerceAddress {
    city
    country
    createdAt
    createdBy
    id
    lastUpdatedAt
    lastUpdatedBy
    line1
    line2
    postalCode
    state
  }
`;

const commerceCustomerFragment = gql`
  fragment CommerceCustomer on CommerceCustomer {
    address {
      ...CommerceAddress
    }
    companyName
    createdAt
    createdBy
    email
    firstName
    id
    lastName
    lastUpdatedAt
    lastUpdatedBy
    phoneNumber
    vatNumber
    vatVerified
  }
  ${commerceAddressFragment}
`;

const COMMERCE_GET_ORDER = gql`
  query commerceGetOrder($id: ID!, $storeId: ID) {
    commerceGetOrder(id: $id, storeId: $storeId) {
      billed
      createdAt
      createdBy
      currency
      currencySymbol
      id
      invoiceUrl
      lastUpdatedAt
      lastUpdatedBy
      locked
      paid
      customer {
        ...CommerceCustomer
      }
      items {
        ...CommerceOrderItem
      }
      paymentMethod {
        ...CommercePaymentMethod
      }
      paymentStatus
      reference
      status
      subTotal
      taxTotal
      total
      url
    }
  }
  ${commerceCustomerFragment}
  ${commercePaymentMethodFragment}
  ${commerceOrderItemFragment}
`;

export default COMMERCE_GET_ORDER;
