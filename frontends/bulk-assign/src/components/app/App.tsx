import { SnackbarProvider } from '@websummit/components/src/molecules/Snackbar';
import ApolloAppContextProvider from '@websummit/graphql/src/utils/ApolloAppContextProvider';
import React from 'react';
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

type AppProps = {
  apiURL: string;
  token: string;
};

const App = ({ token = '', apiURL = '' }: AppProps) => {
  return (
    <ApolloAppContextProvider apiURL={apiURL} token={token}>
      <SnackbarProvider>
        <Router>
          <StyledContainer>
            <TicketsBulkAssignPage />
          </StyledContainer>
        </Router>
      </SnackbarProvider>
    </ApolloAppContextProvider>
  );
};

export default App;
