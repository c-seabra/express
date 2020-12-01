import { gql } from '@apollo/client'

export const ORDER = gql`
  query OrderByRef($reference: String!) {
    order(reference: $reference) {
      owner {
        firstName
        lastName
        email
      }
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
`
export default ORDER
