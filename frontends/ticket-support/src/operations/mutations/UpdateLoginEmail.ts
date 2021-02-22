import { gql } from '@apollo/client';

export const TICKET_LOGIN_UPDATE = gql`
  mutation TicketLoginUpdate($appLoginEmail: String!, $bookingRef: String!) {
    assignmentTicketLoginUpdate(
      input: { appLoginEmail: $appLoginEmail, bookingRef: $bookingRef }
    ) {
      ticket {
        assignment {
          appLoginEmail
          assignee {
            email
            firstName
          }
        }
      }
    }
  }
`;

export default TICKET_LOGIN_UPDATE;
