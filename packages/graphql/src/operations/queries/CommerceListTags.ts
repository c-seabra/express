import { gql } from '@apollo/client';

export default gql`
  query CommerceListTags(
    $page: Int
    $pageSize: Int
    $sort: [CommerceSortTerm!]
    $storeId: ID
    $terms: [CommerceSearchTerm!]
  ) {
    commerceListTags(
      page: $page
      pageSize: $pageSize
      sort: $sort
      storeId: $storeId
      terms: $terms
    ) {
      hits {
        id
        code
        description
        name
      }
    }
  }
`;
