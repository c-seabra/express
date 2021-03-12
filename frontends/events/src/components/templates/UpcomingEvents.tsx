import { Button } from '@websummit/components/src/atoms/Button';
import ContainerCard from '@websummit/components/src/molecules/ContainerCard';
import React from 'react';
import styled from 'styled-components';
import { Event } from '@websummit/graphql/src/@types/operations';
import { Spacing } from '@websummit/components/src/templates/Spacing';

const FlexRow = styled.div`
  display: flex;
  align-items: center;
`;

// Good candidate to move to package templates
const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledHeader = styled.span`
  color: #0c1439;
  font-size: 24px;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 24px;
`;

type UpcomingEventProps = {
  events: any;
};

const UpcomingEvents = ({ events }: UpcomingEventProps) => {
  const StyledContainerCard = styled(ContainerCard)`
    margin-right: 3.8125rem;
    max-width: 300px;

    &:last-child {
      margin-right: 0;
    }
  `;

  const ColouredHeader = styled(FlexRow)<{ color?: string }>`
    background-color: ${(props) => props.color || '#F8BA26'};
    border-radius: 5px 5px 0 0;
    height: 72px;
  `;

  const StyledFlexCol = styled(FlexCol)`
    padding: 21px 29px 26px;
  `;

  const ConfNameText = styled.h1`
    color: #0c1439;
    font-size: 20px;
    font-weight: 500;
    letter-spacing: -0.5px;
    line-height: 32px;
    margin: 0;
  `;

  const Text = styled.span`
    color: #0c1439;
    font-size: 14px;
    letter-spacing: 0;
    line-height: 24px;
  `;

  return (
    <FlexCol>
      <Spacing bottom="6rem" top="4.125rem">
        <Spacing bottom="1.5rem">
          <StyledHeader>Upcoming events</StyledHeader>
        </Spacing>
        <FlexRow>
          {events &&
            events.map((event: Event) => (
              <StyledContainerCard key={event.ID} noPadding>
                <ColouredHeader color="red" />
                <StyledFlexCol>
                  <>
                    <Spacing bottom="10px">
                      <ConfNameText>{event.name || 'N/A'}</ConfNameText>
                    </Spacing>
                    <Text>Start date: {event.startDate || 'N/A'}</Text>
                    <Text>Location: {event.location || 'N/A'}</Text>
                    {/* TODO Add state representation */}
                    {/*<Text>State: {event. || 'N/A'}</Text>*/}
                    <Spacing top="22px">
                      <Button>View event</Button>
                    </Spacing>
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

export default UpcomingEvents;
