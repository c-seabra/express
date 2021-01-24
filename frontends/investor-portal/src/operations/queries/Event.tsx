import { ApolloError, gql } from '@apollo/client'

export type EventQuery = {
  data?: {
    event: {
      id: string
      name: string
      slug: string
    }
  }
  error?: ApolloError
  loading?: boolean
}

export const EVENT_QUERY = gql`
  query {
    event {
      id
      name
      slug
    }
  }
`

export default EVENT_QUERY
