import { ApolloClient, ApolloProvider } from '@apollo/client';
import { GraphQLParams, initApollo } from '@websummit/graphql';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import React, { createContext, useState } from 'react';
import styled from 'styled-components';

import BulkOperation from '../../lib/extract/bulkOperation';
import {
  CreateOrderWorkUnit,
  processCreateOrderWorkUnit,
} from '../../lib/extract/createOrder';
import AssigneeList from '../assigneeList/AssigneeList';
import Form from '../form/Form';

const StyledContainer = styled.section`
  padding: 1rem;
  max-width: 1024px;
  width: 100%;
  margin: 0 auto;
  font-size: 16px;
`;
const StyledSection = styled.section`
  padding: 1rem;
`;

export type StaffList = { [index: string]: Staff };
export type Staff = {
  bookingRef?: string;
  email: string;
  firstName: string;
  lastName: string;
};

export type TicketList = Array<CreateOrderWorkUnit>;
export type SetTicketList = (tickets: TicketList) => void;
export type Ticket = Staff;

export type Conference = {
  guestProductId?: string;
  slug: string;
  staffProductId?: string;
  storeId?: string;
};

export type StaffTicketContext = GraphQLParams & {
  conference: Conference;
  setTicketsList?: SetTicketList;
  staffList: StaffList;
  ticketsList?: TicketList;
};

export const AppContext = createContext<StaffTicketContext>({
  apiURL: '',
  conference: {
    slug: '',
  },
  staffList: {},
  token: '',
});

const App = ({ token, staffList, conference, apiURL }: StaffTicketContext) => {
  const [ticketsList, setTicketList] = useState<TicketList>();

  if (!token) return null;

  const apolloClient = initApollo({ apiURL });

  const bulkContext: GraphQLParams = {
    apolloClient,
    conferenceSlug: conference.slug,
    token,
  };

  return (
    <ApolloProvider client={apolloClient}>
      <AppContext.Provider
        value={{
          apiURL,
          apolloClient,
          conference,
          setTicketsList: setTicketList,
          staffList,
          ticketsList,
          token,
        }}
      >
        <StyledContainer>
          <StyledSection>
            <h2>Ticket Assignment - Staff ticket creation tool</h2>
            <Form />
          </StyledSection>
          <StyledSection>
            {ticketsList && ticketsList?.length > 0 && (
              <BulkOperation
                Display={AssigneeList}
                context={bulkContext}
                input={ticketsList}
                process={processCreateOrderWorkUnit}
              />
            )}
          </StyledSection>
        </StyledContainer>
      </AppContext.Provider>
    </ApolloProvider>
  );
};

export default App;
