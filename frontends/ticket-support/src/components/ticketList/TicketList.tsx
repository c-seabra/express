import React from 'react';
import { useHistory } from 'react-router-dom';

import { Ticket } from '../app/App';
import TicketItem from '../ticketItem/TicketItem';

const TicketList: React.FC<{ list: Ticket[] | undefined }> = ({ list }) => {
  if (!list || list?.length < 0) return null;
  const history = useHistory();

  return (
    <>
      {list.map(ticket => (
        <TicketItem
          assignment={ticket.assignment}
          bookingRef={ticket.bookingRef}
          handleOnClick={() => history.push(`tickets/${ticket.bookingRef}`)}
          orderOwner={ticket.order.owner}
          ticketState={ticket.state}
          ticketTypeName={ticket.ticketType.name}
        />
      ))}
    </>
  );
}

export default TicketList;
