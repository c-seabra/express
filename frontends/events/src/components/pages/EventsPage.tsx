import { ApolloError, useQuery } from '@apollo/client';
import { Button } from '@websummit/components/src/atoms/Button';
import ContainerCard from '@websummit/components/src/molecules/ContainerCard';
import { Spacing } from '@websummit/components/src/templates/Spacing';
import {
  Event,
  EventListQueryQuery,
} from '@websummit/graphql/src/@types/operations';
import EVENT_LIST from '@websummit/graphql/src/operations/queries/EventList';
import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import NoEventsPlaceholderImage from '../../lib/images/no-events-placeholder.png';
import Loader from '../../lib/Loading';
import { useAppContext } from '../app/AppContext';
import EventList from '../eventList/EventList';
import UpcomingEvents from '../templates/UpcomingEvents';

const FlexRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 26px 36px;
`;

// Good candidate to move to package templates
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

const NoEventsPlaceholder = () => {
  return (
    <FlexCol>
      <Spacing bottom="6rem" top="4.125rem">
        <ContainerCard noPadding>
          <FlexRow>
            <FlexCol>
              <HeaderText>No Events Found</HeaderText>
              <span>
                You haven&apos;t created any events yet, but we are showing you
                a preview of what things will look like when you do.
              </span>
            </FlexCol>
            <Button>Create new event</Button>
          </FlexRow>
        </ContainerCard>
      </Spacing>

      <img alt="events placeholder" src={NoEventsPlaceholderImage} />
    </FlexCol>
  );
};

type EventListQueryResponse = {
  data?: EventListQueryQuery;
  error?: ApolloError;
  loading?: boolean;
};

const EventPage = () => {
  const history = useHistory();
  const { conferenceSlug, token } = useAppContext();
  const { loading, error, data }: EventListQueryResponse = useQuery(
    EVENT_LIST,
    {
      context: {
        slug: conferenceSlug,
        token,
      },
    },
  );
  const hasEvents = data?.events && data?.events?.edges.length;
  const events = data?.events && data?.events.edges.map((node) => node.node);
  const redirectToEvent = (item: Event) => {
    // DO NOT REMOVE - WILL BE USE IN NEXT ITERATION
    history.push(`/${item.slug.toString()}/view`);
  };

  return (
    <>
      {loading && <Loader />}

      {hasEvents ? (
        <>
          <UpcomingEvents events={events} onElementClick={redirectToEvent} />
          <EventList error={error} events={events} />
        </>
      ) : (
        <>{!loading && <NoEventsPlaceholder />}</>
      )}
    </>
  );
};

export default EventPage;
