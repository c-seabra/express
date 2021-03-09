import { gql } from '@apollo/client';

export const TICKET_MAGIC_LOGIN_LINK_REQUEST = gql`
  mutation TicketMagicLoginLinkRequest(
    $input: AssignmentMagicLinkLoginRequestInput!
  ) {
    assignmentMagicLinkLoginRequest(input: $input) {
      userErrors {
        message
        path
      }
    }
  }
`;

export default TICKET_MAGIC_LOGIN_LINK_REQUEST;
