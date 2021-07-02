import { gql } from '@apollo/client';

const ticketsSummaryFragment = gql`
  fragment TicketsSummary on TicketsSummary {
    all {
      count
      active {
        count
        assigned {
          count
          accepted {
            count
          }
          checkedIn {
            count
          }
          duplicate {
            count
          }
          locked {
            count
          }
          pending {
            count
          }
        }
        unassigned {
          count
          neverAssigned {
            count
          }
          rejected {
            count
          }
        }
      }
      void {
        count
      }
    }
  }
`;

export default gql`
  query OrderByRef($reference: String!) {
    order(reference: $reference) {
      id
      ticketsSummary {
        ...TicketsSummary
      }
      invoiceUrl
      amount
      currency
      reference
      completedAt
      lastUpdatedAt
      state
      owner {
        id
        firstName
        lastName
        email
      }
      source
      sourceId
      summary {
        ticketType {
          name
        }
        tickets
      }
      tickets {
        edges {
          node {
            id
            bookingRef
            state
            ticketType {
              name
            }
            order {
              owner {
                firstName
                lastName
                email
                id
              }
            }
            assignment {
              id
              appLoginEmail
              state
              assigner {
                id
                email
                firstName
                lastName
              }
              assignee {
                id
                email
                firstName
                lastName
                lastLoginTokenCreatedAt
              }
            }
          }
        }
      }
    }
  }
  ${ticketsSummaryFragment}
`;
