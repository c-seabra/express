import React from 'react';

import Loader from '../../lib/Loading';
import EventItem, { EventListHeader } from '../eventItem/EventItem';

type EventListProps = {
  error: any;
  events: any,
  loading: boolean;
}
const EventList = ({loading, error, events}: EventListProps) => {

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <>{error.message}</>;
  }

  const mappedEvents = events.edges.map((node) => node.node);

  return (
    <>
      <h4>Events</h4>
      <EventListHeader />
      {mappedEvents?.map((event) => (
        <EventItem
          key={event.id}
          country={event?.country}
          currency={event?.currency}
          description={event?.description}
          endDate={event?.endDate}
          name={event.name}
          slug={event?.slug}
          startDate={event?.startDate}
        />
      ))}
    </>
  );
};

export default EventList;
