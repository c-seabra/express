import { gql } from '@apollo/client';

export const INVESTOR_ACCESS_GRANT_MUTATION = gql`
  mutation investorAccessGrant(
    $bookingReferences: [String!]!
    $startupSelectionsCount: Int!
  ) {
    investorAccessGrant(
      input: {
        bookingReferences: $bookingReferences
        startupSelectionsCount: $startupSelectionsCount
      }
    ) {
      successMessage
      errors {
        message
      }
      invalidBookingReferences
      attendances {
        id
        bookingRef
        name
      }
    }
  }
`;

export default INVESTOR_ACCESS_GRANT_MUTATION;
