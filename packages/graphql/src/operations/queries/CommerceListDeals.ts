import { gql } from '@apollo/client';

export default gql`
  query CommerceListDeals($sort: [CommerceSortTerm!]) {
    commerceListDeals(sort: $sort) {
      hits {
        active
        createdAt
        description
        endDate
        id
        lastUpdatedAt
        metadata
        name
        startDate
        dealItems {
          amount
          createdAt
          id
          lastUpdatedAt
          max
          metadata
          min
          product {
            id
            name
            price
            categories {
              id
              name
              children {
                id
                name
              }
            }
          }
          step
          type
        }
      }
      total
    }
  }
`;
