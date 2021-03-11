import { ApolloError, useQuery } from '@apollo/client';
import React from 'react';

import Loader from '../../lib/Loading';
import { Event } from '../../lib/types';
import EVENT_LIST from '../../operations/queries/EventList';
import { useAppContext } from '../app/AppContext';
import EventItem, { EventListHeader } from '../eventItem/EventItem';

const EventList: React.FC = () => {
  const { conferenceSlug, token } = useAppContext();

  const {
    loading,
    error,
    data,
  }: {
    data?: {
      events: {
        edges: [
          {
            node: Event;
          },
        ];
      };
    };
    error?: ApolloError;
    loading?: boolean;
  } = useQuery(EVENT_LIST, {
    context: {
      slug: conferenceSlug,
      token,
    },
  });

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <>{error.message}</>;
  }

  const events = data?.events.edges.map((node) => node.node);

  return (
    <>
      <h4>Events</h4>
      <EventListHeader />
      {events?.map((event) => (
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
