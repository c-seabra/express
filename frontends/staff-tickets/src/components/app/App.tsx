import { ApolloProvider } from '@apollo/client';
import { SnackbarProvider } from '@websummit/components/src/molecules/Snackbar';
import { Spacing } from '@websummit/components/src/templates/Spacing';
import { GraphQLParams, initApollo } from '@websummit/graphql';
import jwt from 'jwt-decode';
import React, { createContext, useEffect, useState } from 'react';
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
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  font-size: 16px;
  background-color: #f2f3f6;
`;

const StyledSection = styled.section`
  padding: 1rem;
`;

const Title = styled.span`
  font-size: 24px;
  font-weight: 500;
  color: #0c1439;
`;

const SlimTitle = styled(Title)`
  font-weight: 400;
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
  setTicketsList?: SetTicketList;
  ticketsList?: TicketList;
};

export const AppContext = createContext<StaffTicketContext>({
  apiURL: '',
  slug: '',
  token: '',
});

const App = ({ token, apiURL }: StaffTicketContext) => {
  const [ticketsList, setTicketList] = useState<TicketList>();

  const tokenPayload: { conf_slug: string; email: string } = jwt(token || '');
  const [slug, setSlug] = useState<string>(tokenPayload.conf_slug);

  useEffect(() => {
    setSlug(tokenPayload.conf_slug);
  }, [tokenPayload.conf_slug]);

  if (!token) return null;

  const apolloClient = initApollo({ apiURL });

  const bulkContext: GraphQLParams = {
    apolloClient,
    slug,
    token,
  };
  console.log('ticketsList', ticketsList);

  return (
    <ApolloProvider client={apolloClient}>
      <SnackbarProvider>
        <AppContext.Provider
          value={{
            apiURL,
            apolloClient,
            setTicketsList: setTicketList,
            slug,
            ticketsList,
            token,
          }}
        >
          <StyledContainer>
            <StyledSection>
              <Spacing bottom="2rem">
                <Title>
                  Ticket Assignment
                  <SlimTitle> - Staff ticket creation tool</SlimTitle>
                </Title>
              </Spacing>
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
      </SnackbarProvider>
    </ApolloProvider>
  );
};

export default App;
