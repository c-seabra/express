import { ApolloError, useQuery } from '@apollo/client';
import { Button } from '@websummit/components/src/atoms/Button';
import ContainerCard from '@websummit/components/src/molecules/ContainerCard';
import React from 'react';
import styled from 'styled-components';

import { Event } from '../../lib/types';
import EVENT_LIST from '../../operations/queries/EventList';
import { useAppContext } from '../app/AppContext';
import EventList from '../eventList/EventList';

const NoEventsPlaceholder = () => {
  const FlexRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 26px 36px;
  `;

  const FlexCol = styled.div`
    display: flex;
    flex-direction: column;
  `;

  const HeaderText = styled.h1`
    color: #0c1439;
    font-size: 20px;
    font-weight: 600;
    letter-spacing: 0;
    line-height: 32px;
    margin: 0;
  `;

  return (
    <ContainerCard noPadding>
      <FlexRow>
        <FlexCol>
          <HeaderText>No Events Found</HeaderText>
          <span>
            You haven&apos;t created any events yet, but we are showing you a
            preview of what things will look like when you do.
          </span>
        </FlexCol>
        <Button>Create new event</Button>
      </FlexRow>
    </ContainerCard>
  );
};

const EventPage = () => {
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
