import { ApolloError, useQuery } from '@apollo/client'
import React from 'react'
import TICKET_AUDIT_TRAIL from '../../operations/queries/AuditTrailByTicketId'
import styled from 'styled-components'
import AuditTrailItem from './AuditTrailItem'

export type TrailVersion = {
  context?: string
  createdAt?: string
  event?: string
  itemId?: string
  itemType?: string
  objectChanges?: string
  reason?: string
  whodunnit?: string
}

export type TicketTrail = {
  versions?: [TrailVersion]
  assignments?: {
    edges?: [{
      node: {
        versions: [TrailVersion]
      }
    }]
  }
}

const TrailsList = styled.div`
  border: 1px solid grey;
  border-radius: 8px;
  overflow: hidden;
  margin: 1rem 0;
`
const Trail = styled.div`
  font-size: 1rem;
  display: flex;
  padding: 1rem 0.75rem;
  background-color: gainsboro;
  &:nth-child(2n + 1) {
    background-color: #fff;
  }
`
const Column = styled.div`
  width: 10%;
  padding: 0 0.25rem;
  word-break: break-word;
`
const MediumColumn = styled(Column)`
  width: 25%;
`
const WideColumn = styled(Column)`
  width: 35%;
`

const AuditTrail = ({bookingRef = "CSRL-1", conferenceSlug = "ws20", token = "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ3ZWJzdW1taXQiLCJhZG1pbiI6dHJ1ZSwic3ViIjoiMjFkN2JkYTEtOGZkNS00MjJiLWFlYjItOWQ4NDMzNjhkZTQ0IiwiYWRtaW5fZW1haWwiOiJ0b21pc2xhdi5zdmVjYWtAd2Vic3VtbWl0LmNvbSIsImNvbmZfaWQiOiJjM2E3ZjQ2Zi1kMjY5LTQ2ZDItYmUzMS0wNWNhNzczMzA4ODYiLCJjb25mX3NsdWciOiJ3czIwIn0.Bqc9CJCwwOjx9GrigMGjy397pK57gqf6DCJY4Ets3KY"}) => {
  const {
    loading,
    error,
    data,
  }: {
    data?: {
      ticket: TicketTrail
    }
    error?: ApolloError
    loading?: boolean
  } = useQuery(TICKET_AUDIT_TRAIL, {
    context: {
      slug: conferenceSlug,
      token,
    },
    variables: {
      reference: bookingRef,
    },
  })

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>
  if (data) {
    let trails: Array<TrailVersion> = []
    const ticketTrails = data.ticket.versions
    if (ticketTrails) trails = trails.concat(ticketTrails)
    const assignmentsTrails = data.ticket.assignments?.edges
    let assignmentTrailsVersions: Array<TrailVersion> = []
    if (assignmentsTrails) {
      for (let index = 0; index < assignmentsTrails.length; index++) {
        const element = assignmentsTrails[index];
        assignmentTrailsVersions = assignmentTrailsVersions.concat(element.node.versions)
      }
      trails = trails.concat(assignmentTrailsVersions)
    }
    const orderedTrails = trails.sort((a,b) => (a.createdAt && b.createdAt && a.createdAt < b.createdAt) ? 1 : ((a.createdAt && b.createdAt && b.createdAt < a.createdAt) ? -1 : 0))
    const Change = ({title, oldValue, newValue}:{title?: string; oldValue?:string, newValue?: string}) => {
      return (
        <div>
          <div>{title}:</div>
          <div>old value - {oldValue || 'undefined'}</div>
          <div>new value - {newValue || 'undefined'}</div>
        </div>
      )
    }
    return (
      <TrailsList>
        <Trail>
          <Column>Created at</Column>
          <Column>Type</Column>
          <Column>Event</Column>
          <Column>Reason</Column>
          <MediumColumn>Who</MediumColumn>
          <WideColumn>Changes</WideColumn>
        </Trail>
        {orderedTrails.map(trail => {
          const objectChanges = trail.objectChanges && JSON.parse(trail.objectChanges)
          console.log(trail.event, objectChanges)
          return (
            <AuditTrailItem
              itemId={trail.itemId}
              createdAt={trail.createdAt}
              itemType={trail.itemType}
              event={trail.event}
              reason={trail.reason}
              whodunnit={trail.whodunnit}
              objectChanges={objectChanges}
            />
          )
        })}
      </TrailsList>
    )}
  return <div>none</div>
}

export default AuditTrail
