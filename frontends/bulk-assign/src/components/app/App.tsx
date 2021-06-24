import { ApolloProvider } from '@apollo/client';
import { SnackbarProvider } from '@websummit/components/src/molecules/Snackbar';
import { GraphQLParams, initApollo } from '@websummit/graphql';
import jwt from 'jwt-decode';
import React, { createContext, useEffect, useState } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import styled from 'styled-components';

import { StatusType } from '../assigneeItem/AssigneeItem';
import TicketsBulkAssignPage from '../pages/TicketsBulkAssignPage';

const StyledContainer = styled.section`
  margin: 0 auto;
  font-size: 16px;
  background-color: #f2f3f6;
`;

export type AssigneesList = Array<Assignee>;
export type SetAssigneesList = (assignees: AssigneesList) => void;
export type Assignee = {
  autoClaim?: string;
  bookingRef: string;
  claimStatus?: StatusType;
  email: string;
  firstName: string;
  lastName: string;
  status?: StatusType;
  ticketId: string;
};

export type BulkAssignContext = GraphQLParams & {
  assigneesList?: AssigneesList;
  setAssigneesList?: SetAssigneesList;
};

export const AppContext = createContext<BulkAssignContext>({});

const App = ({ token, apiURL = '' }: BulkAssignContext) => {
  const tokenPayload: { conf_slug: string; email: string } = token
    ? jwt(token)
    : { conf_slug: '', email: '' };

  const [conferenceSlug, setConferenceSlug] = useState<string>();

  useEffect(() => {
    setConferenceSlug(tokenPayload.conf_slug);
  }, [tokenPayload.conf_slug]);

  const apolloClient = initApollo({ apiURL });

  return (
    <ApolloProvider client={apolloClient}>
      <SnackbarProvider>
        <Router>
          <AppContext.Provider
            value={{
              apiURL,
              slug: conferenceSlug,
              token,
            }}
          >
            <StyledContainer>
              <TicketsBulkAssignPage />
            </StyledContainer>
          </AppContext.Provider>
        </Router>
      </SnackbarProvider>
    </ApolloProvider>
  );
};

export default App;
