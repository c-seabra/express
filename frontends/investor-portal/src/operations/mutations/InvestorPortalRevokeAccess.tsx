import { gql } from '@apollo/client';

export const INVESTOR_PORTAL_REVOKE_ACCESS_MUTATION = gql`
  mutation investorPortalRevokeAccess(
    $attendanceId: ID!
  ) {
    investorPortalRevokeAccess(
      input: {
        attendanceId: $attendanceId
      }
    ) {
      successMessage
      userErrors {
        path
        message
      }
    }
  }
`;

export default INVESTOR_PORTAL_REVOKE_ACCESS_MUTATION;
