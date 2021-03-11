import { ApolloError, useQuery } from '@apollo/client';
import { Button } from '@websummit/components/src/atoms/Button';
import ContainerCard from '@websummit/components/src/molecules/ContainerCard';
import {
  EventListQueryQuery,
  useEventListQueryQuery,
} from '@websummit/graphql/src/@types/operations';
// import NoEventsPlaceholderImage from '../../lib/images/no-events-placeholder';
// import NoEventsPlaceholderImage from './no-events-placeholder.png';
import EVENT_LIST from '@websummit/graphql/src/operations/queries/EventList';
import React from 'react';
import styled from 'styled-components';

import Loader from '../../lib/Loading';
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
      <FlexCol>
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

        <p>test</p>
        {/* <img alt="events placeholder" src={NoEventsPlaceholderImage} /> */}
      </FlexCol>
  );
};

type EventListQueryResponse = {
  data?: EventListQueryQuery;
  error?: ApolloError;
  loading?: boolean;
};

const EventPage = () => {
  const { loading, error, data }: EventListQueryResponse = useQuery(EVENT_LIST);
  const hasEvents = data?.events && data?.events?.edges.length;
  const events = data?.events && data?.events.edges.map((node) => node.node);

  return (
    <>
      {loading && <Loader />}

      {hasEvents ? (
        <EventList error={error} events={events} />
      ) : (
        <>
          {!loading && <NoEventsPlaceholder />}
        </>
      )}
    </>
  );
};

export default EventPage;
