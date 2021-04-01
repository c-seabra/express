import { Button } from '@websummit/components/src/atoms/Button';
import { Spacing } from '@websummit/components/src/templates/Spacing';
import React from 'react';
import styled from 'styled-components';

import { useSalesCyclesQueryQuery } from '../../../../../packages/graphql/src/@types/operations';
import Loader from '../../lib/Loading';
import { useAppContext } from '../app/AppContext';
import SalesCyclesList from '../organisms/SalesCyclesList';
// TODO: Add svg when asset available
// import NoEventsPlaceholderImage from '../../lib/images/no-events-placeholder.png';

export const Container = styled.div`
  max-width: 1440px;
  margin: auto;
  padding-top: 1rem;
`;

const Centered = styled.div`
  display: flex;
  margin: 0 auto;
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

const PlaceholderHeaderText = styled.h1`
  color: #0c1439;
  font-size: 36px;
  font-weight: 500;
  letter-spacing: -1px;
  line-height: 64px;
`;

const PlaceholderText = styled.span`
  color: #0c1439;
  font-size: 20px;
  letter-spacing: 0;
  line-height: 32px;
`;

const NoSalesCyclesPlaceholder = () => {
  return (
    <FlexCol>
      <Spacing bottom="6rem" top="4.125rem">
        <FlexRow>
          <Centered>
            <FlexCol>
              <PlaceholderHeaderText>Create a sale cycle</PlaceholderHeaderText>
              <PlaceholderText>
                Create anything from “super early bird” to “late late” cycles.
              </PlaceholderText>
            </FlexCol>

            <FlexCol>
              {/* <img alt="Sales cycles placeholder" src={NoEventsPlaceholderImage} /> */}
              <img alt="Sales cycles placeholder" src="#" />
            </FlexCol>
          </Centered>
        </FlexRow>
      </Spacing>
    </FlexCol>
  );
};

const SalesCyclesPage = () => {
  const { conferenceSlug, token } = useAppContext();
  const context = {
    conferenceSlug,
    token,
  };

  const { loading, data } = useSalesCyclesQueryQuery({ context });

  const hasCycles =
    data?.commerceListSales?.hits && data?.commerceListSales?.hits?.length;
  const cycles = data?.commerceListSales && data?.commerceListSales?.hits;

  return (
    <Container>
      {loading && <Loader />}

      <FlexCol>
        <FlexRow>
          <HeaderText>Sale cycles</HeaderText>
          <Button>Create new sale cycle</Button>
        </FlexRow>

        {!loading && !hasCycles && <NoSalesCyclesPlaceholder />}

        {hasCycles && (
          <FlexRow>
            <SalesCyclesList cycles={cycles} error={null} />
          </FlexRow>
        )}
      </FlexCol>
    </Container>
  );
};

export default SalesCyclesPage;

// import { ApolloError } from '@apollo/client';
// import { Button } from '@websummit/components/src/atoms/Button';
// import ContainerCard from '@websummit/components/src/molecules/ContainerCard';
// import { Spacing } from '@websummit/components/src/templates/Spacing';
// import {
//   Event,
//   EventFilter,
//   EventListQueryQuery,
//   useEventListQueryQuery,
// } from '@websummit/graphql/src/@types/operations';
// import React from 'react';
// import { useHistory } from 'react-router-dom';
// import styled from 'styled-components';
//
// import NoEventsPlaceholderImage from '../../lib/images/no-events-placeholder.png';
// import Loader from '../../lib/Loading';
// import { useAppContext } from '../app/AppContext';
// import EventList from '../organisms/EventList';
// import UpcomingEvents from '../templates/UpcomingEvents';
//
// export const Container = styled.div`
//   max-width: 1440px;
//   margin: auto;
//   padding-top: 1rem;
// `;
//
// const FlexEnd = styled.div`
//   display: flex;
//   justify-content: flex-end;
// `;
//
// const FlexRow = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   padding: 26px 36px;
// `;
//
// // Good candidate to move to package templates
// const FlexCol = styled.div`
//   display: flex;
//   flex-direction: column;
// `;
//
// const HeaderText = styled.h1`
//   color: #0c1439;
//   font-size: 20px;
//   font-weight: 600;
//   letter-spacing: 0;
//   line-height: 32px;
//   margin: 0;
// `;
//
// const NoEventsPlaceholder = () => {
//   const history = useHistory();
//   return (
//       <FlexCol>
//         <Spacing bottom="6rem" top="4.125rem">
//           <ContainerCard noPadding>
//             <FlexRow>
//               <FlexCol>
//                 <HeaderText>No Events Found</HeaderText>
//                 <span>
//                 You haven&apos;t created any events yet, but we are showing you
//                 a preview of what things will look like when you do.
//               </span>
//               </FlexCol>
//               <Button onClick={() => history.push('/settings')}>
//                 Create new event
//               </Button>
//             </FlexRow>
//           </ContainerCard>
//         </Spacing>
//
//         <img alt="events placeholder" src={NoEventsPlaceholderImage} />
//       </FlexCol>
//   );
// };
//
// type EventListQueryResponse = {
//   data?: EventListQueryQuery;
//   error?: ApolloError;
//   loading?: boolean;
// };
//
// const todayISO = new Date().toISOString();
//
// const EventPage = () => {
//   const history = useHistory();
//   const { conferenceSlug, token } = useAppContext();
//   const context = {
//     conferenceSlug,
//     token,
//   };
//
//   const {
//     loading,
//     error,
//     data,
//   }: EventListQueryResponse = useEventListQueryQuery({ context });
//
//   const hasEvents = data?.events && data?.events?.edges.length;
//   const events = data?.events && data?.events.edges.map((node) => node.node);
//
//   const upcomingFilter: EventFilter = {
//     startDateAfter: todayISO,
//   };
//
//   const {
//     loading: loadingUpcoming,
//     data: dataUpcoming,
//   }: EventListQueryResponse = useEventListQueryQuery({
//     context,
//     variables: { filter: upcomingFilter },
//   });
//
//   const eventsAfter =
//       dataUpcoming?.events && dataUpcoming?.events.edges.map((node) => node.node);
//   const redirectToEvent = (item: Event) => {
//     history.push(`/${item.slug.toString()}/settings`);
//   };
//
//   return (
//       <Container>
//         {loading && loadingUpcoming && <Loader />}
//
//         {hasEvents ? (
//             <>
//               <FlexEnd>
//                 <Button onClick={() => history.push('/settings')}>
//                   Create new event
//                 </Button>
//               </FlexEnd>
//
//               <UpcomingEvents
//                   events={eventsAfter}
//                   onElementClick={redirectToEvent}
//               />
//               <EventList error={error} events={events} />
//             </>
//         ) : (
//             <>{!loading && !loadingUpcoming && <NoEventsPlaceholder />}</>
//         )}
//       </Container>
//   );
// };
//
// export default EventPage;
