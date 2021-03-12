import { Button } from '@websummit/components/src/atoms/Button';
import ContainerCard from '@websummit/components/src/molecules/ContainerCard';
import React from 'react';
import styled from 'styled-components';

import { Spacing } from '../../../../../packages/components/src/templates/Spacing';

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

type UpcomingEventProps = {
  // error: any;
  events: any;
};

const UpcomingEvents = ({ events }: UpcomingEventProps) => {
  const StyledContainerCard = styled(ContainerCard)`
    margin-right: 20px;
    max-width: 300px;

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

  const Text = styled.span`
    color: #0c1439;
    font-size: 14px;
    letter-spacing: 0;
    line-height: 24px;
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
                    <Text>Start date: {event.startDate || 'N/A'}</Text>
                    <Text>Location: {event.location || 'N/A'}</Text>
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
