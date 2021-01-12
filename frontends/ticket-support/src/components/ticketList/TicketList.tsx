import React, { ReactElement } from 'react'
import { useHistory } from 'react-router-dom'
import { ApolloError } from '@apollo/client'

import { Ticket } from '../../lib/types'
import Loader from '../../lib/Loading'
import TicketItem, { TicketListHeader } from '../ticketItem/TicketItem'

type TicketListProps = {
  error?: ApolloError
  list: Ticket[]
  loading?: boolean
}

const TicketList = ({ list = [], loading, error }: TicketListProps): ReactElement => {
  const history = useHistory()

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <>{error.message}</>
  }

  return (
    <>
      <TicketListHeader />
      {list.map(ticket => (
        <TicketItem
          key={ticket.bookingRef}
          assignment={ticket.assignment}
          bookingRef={ticket.bookingRef}
          handleOnClick={() => history.push(`/tickets/${ticket.bookingRef}`)}
          orderOwner={ticket.order.owner}
          ticketState={ticket.state}
          ticketTypeName={ticket.ticketType.name}
        />
      ))}
    </>
  )
}

export default TicketList
