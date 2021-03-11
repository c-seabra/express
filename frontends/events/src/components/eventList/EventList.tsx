import React from 'react';

import Loader from '../../lib/Loading';
import EventItem, { EventListHeader } from '../eventItem/EventItem';
import { Event } from '../../lib/types';

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

  return (
    <>
      <h4>All events</h4>
      <EventListHeader />
      {events?.map((event: Event) => (
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
