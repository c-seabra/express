import { ApolloProvider } from '@apollo/client';
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
  const tokenPayload: { conf_slug: string; email: string } = token
    ? jwt(token)
    : { conf_slug: '', email: '' };

  const [assigneesList, setAssigneesList] = useState<AssigneesList>();
  const [conferenceSlug, setConferenceSlug] = useState<string>();

  useEffect(() => {
    setConferenceSlug(tokenPayload.conf_slug);
  }, [tokenPayload.conf_slug]);

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
