import { ApolloError } from '@apollo/client';
import { Button } from '@websummit/components/src/atoms/Button';
import ContainerCard from '@websummit/components/src/molecules/ContainerCard';
import TextInputField from '@websummit/components/src/molecules/TextInputField';
import { Spacing } from '@websummit/components/src/templates/Spacing';
import {
  Event,
  EventFilter,
  EventListQueryQuery,
  useEventListQueryQuery,
} from '@websummit/graphql/src/@types/operations';
import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import NoEventsPlaceholderImage from '../../lib/images/no-events-placeholder.png';
import Loader from '../../lib/Loading';
import { useAppContext } from '../app/AppContext';
import EventList from '../organisms/EventList';
import UpcomingEvents from '../templates/UpcomingEvents';

const FlexEnd = styled.div`
  display: flex;
  justify-content: flex-end;
`;

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
  const history = useHistory();
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
            <Button onClick={() => history.push('/settings')}>
              Create new event
            </Button>
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

const todayISO = new Date().toISOString();

const EventPage = () => {
  const history = useHistory();
  const { conferenceSlug, token } = useAppContext();
  const context = {
    conferenceSlug,
    token,
  };

  const {
    loading,
    error,
    data,
  }: EventListQueryResponse = useEventListQueryQuery({ context });

  const hasEvents = data?.events && data?.events?.edges.length;
  const events = data?.events && data?.events.edges.map((node) => node.node);

  const upcomingFilter: EventFilter = {
    startDateAfter: todayISO,
  };

  const {
    loading: loadingUpcoming,
    data: dataUpcoming,
  }: EventListQueryResponse = useEventListQueryQuery({
    context,
    variables: { filter: upcomingFilter },
  });

  const eventsAfter =
    dataUpcoming?.events && dataUpcoming?.events.edges.map((node) => node.node);
  const redirectToEvent = (item: Event) => {
    // DO NOT REMOVE - WILL BE USE IN NEXT ITERATION
    history.push(`/${item.slug.toString()}/view`);
  };

  return (
    <>
      {loading && loadingUpcoming && <Loader />}

      {hasEvents ? (
        <>
          <FlexEnd>
            <Button onClick={() => history.push('/settings')}>
              Create new event
            </Button>
          </FlexEnd>

          <UpcomingEvents
            events={eventsAfter}
            onElementClick={redirectToEvent}
          />
          <EventList error={error} events={events} />
        </>
      ) : (
        <>{!loading && !loadingUpcoming && <NoEventsPlaceholder />}</>
      )}
    </>
  );
};

export default EventPage;
