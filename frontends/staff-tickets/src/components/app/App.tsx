import { ApolloProvider } from '@apollo/client';
import { SnackbarProvider } from '@websummit/components/src/molecules/Snackbar';
import { Spacing } from '@websummit/components/src/templates/Spacing';
import { SingleSpaAppProps } from '@websummit/glue/src/@types/single-spa';
import BulkOperation from '@websummit/glue/src/lib/operations/bulkOperation';
import { GraphQLParams, initApollo } from '@websummit/graphql';
import jwt from 'jwt-decode';
import React, { createContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import {
  CreateOrderWorkUnit,
  processCreateOrderWorkUnit,
} from '../../lib/extract/createOrder';
import AssigneeList from '../assigneeList/AssigneeList';
import Form from '../form/Form';

const StyledContainer = styled.section`
  padding: 1rem;yarn
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

const SubHeader = styled.div`
  color: #0c1439;
  font-size: 16px;
  letter-spacing: 0;
  line-height: 21px;
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

const App = ({ token, apiURL }: SingleSpaAppProps) => {
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
                <Title>Ticket creation</Title>
                <SubHeader>
                  Allows fast and easy way to create one or more tickets in an
                  order. This feature is accelerating bulk creation of free
                  tickets
                </SubHeader>
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
