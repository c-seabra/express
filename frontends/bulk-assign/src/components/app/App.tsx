import { ApolloProvider } from '@apollo/client';
import {
  Conference,
  SetTicketList,
  StaffList,
  TicketList,
} from '@websummit-micro/staff-tickets/src/components/app/App';
import { GraphQLParams, initApollo } from '@websummit/graphql';
import jwt from 'jwt-decode';
import React, { createContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import AssigneeList from '../assigneeList/AssigneeList';
import Form from '../form/Form';

const StlyedContainer = styled.section`
  padding: 1rem;
  max-width: 1024px;
  width: 100%;
  margin: 0 auto;
  font-size: 16px;
`;
const StyledSection = styled.section`
  padding: 1rem;
`;
export type AssigneesList = Array<Assignee>;
export type SetAssigneesList = (assignees: AssigneesList) => void;
export type Assignee = {
  autoClaim?: string;
  bookingRef: string;
  email: string;
  firstName: string;
  lastName: string;
  ticketId: string;
};

export type BulkAssignContext = GraphQLParams & {
  assigneesList?: AssigneesList;
  setAssigneesList?: SetAssigneesList;
};

export const AppContext = createContext<BulkAssignContext>({});

const App = ({ token, apiURL = '' }: BulkAssignContext) => {
  if (!token) return null;
  const tokenPayload: { conf_slug: string, email: string; } = jwt(token);

  useEffect(() => {
    setConferenceSlug(tokenPayload.conf_slug);
  }, [token]);

  const [assigneesList, setAssigneesList] = useState<AssigneesList>();
  const [conferenceSlug, setConferenceSlug] = useState<string>();

  const apolloClient = initApollo({ apiURL });

  return (
    <ApolloProvider client={apolloClient}>
      <AppContext.Provider
        value={{
          apiURL,
          assigneesList,
          conferenceSlug,
          setAssigneesList,
          token,
        }}
      >
        <StlyedContainer>
          <StyledSection>
            <h2>Ticket Assignment - Bulk upload ticket details</h2>
            <Form />
          </StyledSection>
          <StyledSection>
            {assigneesList && assigneesList?.length > 0 && (
              <AssigneeList list={assigneesList} />
            )}
          </StyledSection>
        </StlyedContainer>
      </AppContext.Provider>
    </ApolloProvider>
  );
};

export default App;
