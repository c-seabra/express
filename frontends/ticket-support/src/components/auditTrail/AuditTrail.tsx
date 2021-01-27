import { ApolloError, useQuery } from '@apollo/client'
import React from 'react'
import styled from 'styled-components'

import Heading from '../../lib/components/atoms/Heading'
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

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const DefaultText = styled.span`
  color: #0c1439;
  font-size: 14px;
  letter-spacing: 0;
  line-height: 24px;
`

const TableHeaderLabel = styled(DefaultText)`
  font-weight: 600;
`

const Table = styled.div`
  margin: 1rem 0 0;
  overflow-y: auto;
  min-width: 70vw;
  max-height: 75vh;
  height: auto;
`
const TableHeader = styled.div`
  display: flex;
  padding: 1rem 0.75rem;
  border-top: 1px solid #dcdfe5;
  border-bottom: 1px solid #dcdfe5;
`
export const Column = styled.div<{ width?: string }>`
  width: ${props => (props.width ? props.width : '25%')};
  display: flex;
  align-items: center;
  padding: 0 0.25rem;
  word-break: break-word;
`
export const LeftSpacing = styled.div`
  padding-left: 16px;
`

type TicketTrailResponse = {
  data?: {
    ticket: TicketTrail
  }
  error?: ApolloError
  loading?: boolean
}

type AuditTrailProps = {
  bookingRef: string
  conferenceSlug: string
  token: string
}

const AuditTrail = ({ bookingRef, conferenceSlug, token }: AuditTrailProps) => {
  const queryOptions = {
    context: {
      slug: conferenceSlug,
      token,
    },
    variables: {
      reference: bookingRef,
    },
  }
  const { loading, error, data }: TicketTrailResponse = useQuery(TICKET_AUDIT_TRAIL, queryOptions)

  let trails: Array<TrailVersion> = []
  const ticketTrails = data?.ticket.versions
  if (ticketTrails) trails = trails.concat(ticketTrails)
  const assignmentsTrails = data?.ticket.assignments?.edges
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
      <StyledContainer>
        <LeftSpacing>
          <Heading>History changes</Heading>
        </LeftSpacing>
        <LeftSpacing>
          <p>Detail log of all changes made to the ticket.</p>
        </LeftSpacing>
        <Table>
          <TableHeader>
            <Column width="20%">
              <TableHeaderLabel>Logged at</TableHeaderLabel>
            </Column>
            <Column width="15%">
              <TableHeaderLabel>Type of change</TableHeaderLabel>
            </Column>
            <Column width="40%">
              <TableHeaderLabel>Initiated by</TableHeaderLabel>
            </Column>
            <Column width="25%">
              <TableHeaderLabel>Reason for change</TableHeaderLabel>
            </Column>
          </TableHeader>

          {!orderedTrails.length && <div>No paper trail records at the moment.</div>}
          {error && <div>{error}</div>}

          {loading && <Loader />}

          {data &&
            data.ticket &&
            orderedTrails.map(trail => <AuditTrailItem key={trail.itemId} trail={trail} />)}
        </Table>
      </StyledContainer>
    </>
  )
}

export default AuditTrail
