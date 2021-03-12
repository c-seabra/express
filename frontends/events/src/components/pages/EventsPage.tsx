import { ApolloError, useQuery } from '@apollo/client';
import { Button } from '@websummit/components/src/atoms/Button';
import ContainerCard from '@websummit/components/src/molecules/ContainerCard';
import { EventListQueryQuery } from '@websummit/graphql/src/@types/operations';
import EVENT_LIST from '@websummit/graphql/src/operations/queries/EventList';
import React from 'react';
import styled from 'styled-components';

import { Spacing } from '../../../../../packages/components/src/templates/Spacing';
import NoEventsPlaceholderImage from '../../lib/images/no-events-placeholder.png';
import Loader from '../../lib/Loading';
import EventList from '../eventList/EventList';

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

type UpcomingEventProps = {
  // error: any;
  events: any;
};

const UpcomingEvents = ({ events }: UpcomingEventProps) => {
  const StyledContainerCard = styled(ContainerCard)`
    margin-right: 20px;

    &:last-child {
      margin-right: 0;
    }
  `;

  const StyledHeader = styled(FlexRow)`
    background-color: red;
    //height: 50px;
  `;

  const StyledFlexCol = styled(FlexCol)`
    padding: 21px 29px;
  `;

  const ConfNameText = styled.h1`
    color: #0c1439;
    font-size: 20px;
    font-weight: 500;
    letter-spacing: -0.5px;
    line-height: 32px;
    margin: 0;
  `;

  return (
    <FlexCol>
      <Spacing bottom="6rem" top="4.125rem">
        <HeaderText>Upcoming events</HeaderText>
        <FlexRow>
          {events &&
            events.map((event: any) => (
              <StyledContainerCard key={event.ID} noPadding>
                <StyledHeader />
                <StyledFlexCol>
                  <>
                    <Spacing bottom="10px">
                      <ConfNameText>{event.name || 'N/A'}</ConfNameText>
                    </Spacing>
                    <span>Start date: {event.startDate || 'N/A'}</span>
                    <span>Location: {event.location || 'N/A'}</span>
                  </>
                </StyledFlexCol>
              </StyledContainerCard>
            ))}
        </FlexRow>

        {!events ||
          (events && events.length === 0 && (
            <ContainerCard>
              <>No upcoming events</>
            </ContainerCard>
          ))}
      </Spacing>
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
        <>
          <UpcomingEvents events={events} />
          <EventList error={error} events={events} />
        </>
      ) : (
        <>{!loading && <NoEventsPlaceholder />}</>
      )}
    </>
  );
};

export default EventPage;
