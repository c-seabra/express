import { ApolloError, useQuery } from '@apollo/client';
import { Button } from '@websummit/components/src/atoms/Button';
import ContainerCard from '@websummit/components/src/molecules/ContainerCard';
import React from 'react';

import { Event } from '../../lib/types';
import EVENT_LIST from '../../operations/queries/EventList';
import { useAppContext } from '../app/AppContext';
import EventList from '../eventList/EventList';

const NoEventsPlaceholder = () => {
  return (
    <ContainerCard>
      <div>
        <h1>No Events Found</h1>
        <span>
          You haven&apos;t created any events yet, but we are showing you a preview
          of what things will look like when you do.
        </span>
      </div>

      <Button>Create new event</Button>
    </ContainerCard>
  );
};

const EventPage: React.FC = () => {
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
  const hasEvents = false;

  return (
    <>
      {hasEvents ? (
        <EventList error={error} events={data} loading={loading} />
      ) : (
        <NoEventsPlaceholder />
      )}
    </>
  );
};

export default EventPage;
