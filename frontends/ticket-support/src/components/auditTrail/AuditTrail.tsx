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
  overflow: hidden;
  margin: 1rem 0;
`
const TableHeader = styled.div`
  display: flex;
  padding: 1rem 0.75rem;
`
export const Column = styled.div`
  width: 25%;
  display: flex;
  align-items: center;
  padding: 0 0.25rem;
  word-break: break-word;
`
export const WideColumn = styled(Column)`
  width: 20%;
`
export const XlColumn = styled(Column)`
  width: 25%;
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

  console.log(orderedTrails)
  return (
    <>
      <StyledContainer>
        <Heading>History changes</Heading>
        <p>There is a little line below this heading that explains what you can put here</p>
        <Table>
          <TableHeader>
            <WideColumn>
              <TableHeaderLabel>Logged at</TableHeaderLabel>
            </WideColumn>
            <Column>
              <TableHeaderLabel>Type</TableHeaderLabel>
            </Column>
            <WideColumn>
              <TableHeaderLabel>Owner</TableHeaderLabel>
            </WideColumn>
            <WideColumn>
              <TableHeaderLabel>Reason</TableHeaderLabel>
            </WideColumn>
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
  // if (data && data.ticket) {
  //   let trails: Array<TrailVersion> = []
  //   const ticketTrails = data.ticket.versions
  //   if (ticketTrails) trails = trails.concat(ticketTrails)
  //   const assignmentsTrails = data.ticket.assignments?.edges
  //   let assignmentTrailsVersions: Array<TrailVersion> = []
  //   if (assignmentsTrails) {
  //     for (let index = 0; index < assignmentsTrails.length; index++) {
  //       const element = assignmentsTrails[index]
  //       assignmentTrailsVersions = assignmentTrailsVersions.concat(element.node.versions)
  //     }
  //     trails = trails.concat(assignmentTrailsVersions)
  //   }
  //   const orderedTrails = trails.sort((a, b) =>
  //     a.createdAt && b.createdAt && a.createdAt < b.createdAt
  //       ? 1
  //       : a.createdAt && b.createdAt && b.createdAt < a.createdAt
  //       ? -1
  //       : 0
  //   )
  //   return (
  //     <>
  //       {!orderedTrails.length && <div>No paper trail records at the moment.</div>}
  //       {error && <div>{error}</div>}
  //       {loading && <Loader />}
  //
  //       <StyledContainer>
  //         <Heading>History changes</Heading>
  //         <p>There is a little line below this heading that explains what you can put here</p>
  //         <Table>
  //           <TableHeader>
  //             <WideColumn>
  //               <TableHeaderLabel>Logged at</TableHeaderLabel>
  //             </WideColumn>
  //             <Column>
  //               <TableHeaderLabel>Type</TableHeaderLabel>
  //             </Column>
  //             <WideColumn>
  //               <TableHeaderLabel>Owner</TableHeaderLabel>
  //             </WideColumn>
  //             <Column>
  //               <TableHeaderLabel>Reason</TableHeaderLabel>
  //             </Column>
  //           </TableHeader>
  //           {orderedTrails.map(trail => (
  //             <AuditTrailItem key={trail.itemId} trail={trail} />
  //           ))}
  //         </Table>
  //       </StyledContainer>
  //     </>
  //   )
  // }
  // return <div>none</div>
}

export default AuditTrail
