import React from 'react'

import { Ticket } from '../app/App'
import TicketItem from '../ticketItem/TicketItem'

const TicketList: React.FC<{ list: Ticket[] | undefined }> = ({ list }) => {
  if (!list || list?.length < 0) return null
  return (
    <>
      {list.map(ticket => (
        <TicketItem {...ticket} />
      ))}
    </>
  )
}

export default TicketList
