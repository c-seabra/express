import { ApolloError, useQuery } from '@apollo/client'
import React from 'react'
import styled from 'styled-components'

import Loader from '../../lib/Loading'
import TICKET_AUDIT_TRAIL from '../../operations/queries/AuditTrailByTicketId'
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
  assignments?: {
    edges?: [
      {
        node: {
          versions: [TrailVersion]
        }
      }
    ]
  }
  versions?: [TrailVersion]
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
export const Column = styled.div`
  width: 10%;
  padding: 0 0.25rem;
  word-break: break-word;
  display: flex;
  align-items: center;
`
export const MediumColumn = styled(Column)`
  width: 15%;
`
export const WideColumn = styled(Column)`
  width: 25%;
`

const AuditTrail = ({
  bookingRef,
  conferenceSlug,
  token,
}: {
  bookingRef: string
  conferenceSlug: string
  token: string
}) => {
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

  if (data && data.ticket) {
    let trails: Array<TrailVersion> = []
    const ticketTrails = data.ticket.versions
    if (ticketTrails) trails = trails.concat(ticketTrails)
    const assignmentsTrails = data.ticket.assignments?.edges
    let assignmentTrailsVersions: Array<TrailVersion> = []
    if (assignmentsTrails) {
      for (let index = 0; index < assignmentsTrails.length; index++) {
        const element = assignmentsTrails[index]
        assignmentTrailsVersions = assignmentTrailsVersions.concat(element.node.versions)
      }
      trails = trails.concat(assignmentTrailsVersions)
    }
    const orderedTrails = trails.sort((a, b) =>
      a.createdAt && b.createdAt && a.createdAt < b.createdAt
        ? 1
        : a.createdAt && b.createdAt && b.createdAt < a.createdAt
        ? -1
        : 0
    )
    return (
      <>
        {!orderedTrails.length && <div>No paper trail records at the moment.</div>}
        {error && <div>{error}</div>}
        {loading && <Loader />}
        <TrailsList>
          <Trail>
            <MediumColumn>Created at</MediumColumn>
            <Column>Type</Column>
            <Column>Event</Column>
            <Column>Intent</Column>
            <Column>Reason</Column>
            <WideColumn>Who</WideColumn>
            <Column>Changes</Column>
          </Trail>
          {orderedTrails.map(trail => (
            <AuditTrailItem key={trail.itemId} trail={trail} />
          ))}
        </TrailsList>
      </>
    )
  }
  return <div>none</div>
}

export default AuditTrail
