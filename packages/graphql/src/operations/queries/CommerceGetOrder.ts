import { gql } from '@apollo/client';

const commerceUserFragment = gql`
  fragment CommerceUser on CommerceUser {
    name
    email
    id
  }
`;

const commerceTaxTypeFragment = gql`
  fragment CommerceTaxType on CommerceTaxType {
    createdAt
    createdBy {
      ...CommerceUser
    }
    description
    id
    lastUpdatedAt
    name
  }
  ${commerceUserFragment}
`;

const commerceTaxFragment = gql`
  fragment CommerceTax on CommerceTax {
    country
    createdAt
    createdBy {
      ...CommerceUser
    }
    id
    lastUpdatedAt
    name
    rateAmount
    rateType
    taxType {
      ...CommerceTaxType
    }
  }
  ${commerceTaxTypeFragment}
  ${commerceUserFragment}
`;

const commerceProductFragment = gql`
  fragment CommerceProduct on CommerceProduct {
    active
    createdAt
    createdBy {
      ...CommerceUser
    }
    description
    id
    lastUpdatedAt
    name
    price
    taxMode
  }
  ${commerceUserFragment}
`;

const commerceOrderItemFragment = gql`
  fragment CommerceOrderItem on CommerceOrderItem {
    createdAt
    createdAt
    createdBy {
      ...CommerceUser
    }
    id
    itemName
    lastUpdatedAt
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
    total
  }
  ${commerceProductFragment}
  ${commerceTaxFragment}
  ${commerceUserFragment}
`;

export const commercePaymentMethodFragment = gql`
  fragment CommercePaymentMethod on CommercePaymentMethod {
    id
    name
    configuration
  }
`;

const commerceAddressFragment = gql`
  fragment CommerceAddress on CommerceAddress {
    city
    country
    createdAt
    createdBy {
      ...CommerceUser
    }
    id
    lastUpdatedAt
    line1
    line2
    postalCode
    state
  }
  ${commerceUserFragment}
`;

const commerceCustomerFragment = gql`
  fragment CommerceCustomer on CommerceCustomer {
    address {
      ...CommerceAddress
    }
    companyName
    createdAt
    createdBy {
      ...CommerceUser
    }
    email
    firstName
    id
    lastName
    lastUpdatedAt
    phoneNumber
    vatNumber
    vatVerified
  }
  ${commerceAddressFragment}
  ${commerceUserFragment}
`;

const commerceTransactionFragment = gql`
  fragment CommerceTransaction on CommerceTransaction {
    amount
    createdAt
    createdBy {
      ...CommerceUser
    }
    currency
    id
    lastUpdatedAt
    metadata
    paymentMethod {
      ...CommercePaymentMethod
    }
    refundedTransaction
    status
    timestamp
    type
  }
  ${commercePaymentMethodFragment}
  ${commerceUserFragment}
`;

const COMMERCE_GET_ORDER = gql`
  query commerceGetOrder($id: ID!, $storeId: ID) {
    commerceGetOrder(id: $id, storeId: $storeId) {
      billed
      createdAt
      createdBy {
        ...CommerceUser
      }
      currency
      currencySymbol
      id
      invoiceUrl
      refundReceiptUrl
      refunded
      lastUpdatedAt
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
      transactions {
        ...CommerceTransaction
      }
      url
    }
  }
  ${commerceCustomerFragment}
  ${commercePaymentMethodFragment}
  ${commerceOrderItemFragment}
  ${commerceTransactionFragment}
  ${commerceUserFragment}
`;

export default COMMERCE_GET_ORDER;
