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
      }
      total
    }
  }
`;
