import { ApolloError, gql } from '@apollo/client'

export type OrderByRefQuery = {
  data?: {
    order: {
      completedAt: string
      lastUpdatedAt: string
      owner: {
        email: string
        firstName: string
        lastName: string
      }
      source: string
      state: string
      summary: {
        ticketType: {
          name: string
        }
        tickets: number
      }
      tickets: {
        edges: [
          {
            node: {
              assignment: {
                assignee: {
                  email: string
                  firstName: string
                  lastName: string
                }
                state: string
              }
              bookingRef: string
              order: {
                owner: {
                  email: string
                  firstName: string
                  lastName: string
                }
              }
              state: string
              ticketType: {
                name: string
              }
            }
          }
        ]
      }
    }
  }
  error?: ApolloError
  loading?: boolean
}

const ORDER_QUERY = gql`
  query OrderByRef($reference: String!) {
    order(reference: $reference) {
      completedAt
      lastUpdatedAt
      state
      owner {
        firstName
        lastName
        email
      }
      source
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
export default ORDER_QUERY
