import { Button } from '@websummit/components/src/atoms/Button';
import ContainerCard from '@websummit/components/src/molecules/ContainerCard';
import { Spacing } from '@websummit/components/src/templates/Spacing';
import { formatFullDate } from '@websummit/components/src/utils/time';
import { Event } from '@websummit/graphql/src/@types/operations';
import React from 'react';
import styled from 'styled-components';

const FlexRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
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

const Text = styled.span`
  color: #0c1439;
  font-size: 14px;
  letter-spacing: 0;
  line-height: 24px;
`;

// Related only to this template
const StyledContainerCard = styled(ContainerCard)`
  margin: 0 3.8125rem 16px 0;
  max-width: 300px;

  &:last-child {
    margin-right: 0;
  }
`;

const ColouredHeader = styled(FlexRow)<{ color?: string }>`
  background-color: ${(props) => props.color || '#F8BA26'};
  border-radius: 5px 5px 0 0;
  height: 40px;
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

  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

type UpcomingEventProps = {
  events: any;
  onElementClick?: (item: Event) => void;
};

const UpcomingEvents = ({
  events,
  onElementClick = () => null,
}: UpcomingEventProps) => {
  const colors = ['#F8BA26', '#F15A2C', '#CB1977', '#654DA0'];

  return (
    <FlexCol>
      <Spacing bottom="6rem" top="4.125rem">
        <Spacing bottom="1.5rem">
          <StyledHeader>Upcoming events</StyledHeader>
        </Spacing>
        <FlexRow>
          {events &&
            events.map((event: Event, index: number) => (
              <StyledContainerCard key={event.id} noPadding>
                <ColouredHeader color={colors[index % colors.length]} />
                <StyledFlexCol>
                  <>
                    <Spacing bottom="10px">
                      <ConfNameText>{event.name || 'N/A'}</ConfNameText>
                    </Spacing>
                    <Text>
                      Start date: {formatFullDate(event.startDate) || 'N/A'}
                    </Text>
                    <Text>Location: {event.country?.name || 'N/A'}</Text>
                    {/* TODO Add state representation */}
                    {/* <Text>State: {event. || 'N/A'}</Text> */}
                    <Spacing top="22px">
                      <Button onClick={() => onElementClick(event)}>
                        View event
                      </Button>
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
