import React from 'react'
import styled from 'styled-components'

import { Ticket } from '../app/App'
import TicketItem from '../ticketItem/TicketItem'
import TicketListHeader from './TicketListHeader'

const StyledList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`

const TicketList: React.FC<{ list: Ticket[] | undefined }> = ({ list }) => {
  if (!list || list?.length < 0) return null
  return (
    <StyledList>
      <TicketListHeader />
      {list.map(ticket => (
        <TicketItem {...ticket} />
      ))}
    </StyledList>
  )
}

export default TicketList
