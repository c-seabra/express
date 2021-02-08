import { gql } from '@apollo/client'

export const TICKET_AUDIT_TRAIL = gql`
  query TicketAuditTrail($reference: String!) {
    ticket(reference: $reference) {
      versions {
        itemType
        itemId
        event
        whodunnit
        objectChanges
        context
        reason
        createdAt
        sourceLocation
        id
        command
        object
      }
      assignments {
        edges {
          node {
            versions {
              itemType
              itemId
              event
              whodunnit
              objectChanges
              context
              reason
              createdAt
              sourceLocation
              id
              command
              object
            }
          }
        }
      }
    }
  }
`
export default TICKET_AUDIT_TRAIL
