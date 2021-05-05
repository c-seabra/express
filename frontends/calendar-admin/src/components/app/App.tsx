import { ApolloProvider } from '@apollo/client';
import { SnackbarProvider } from '@websummit/components/src/molecules/Snackbar';
import { initApollo } from '@websummit/graphql';
import jwt from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import styled from 'styled-components';

import { Attendance } from '../../lib/types';
import AttendanceSearch from '../attendanceSearch/AttendanceSearch';
import Calendar from '../calendar/Calendar';
import AppContext from './AppContext';

const StyledContainer = styled.section`
  display: grid;
  margin: 0 auto;
  font-size: 16px;
  background-color: #f2f3f6;
`;

type AppProps = {
  apiURL: string;
  token: string;
};

const App = ({ token, apiURL }: AppProps) => {
  const tokenPayload: { conf_slug: string; email: string } = jwt(token);
  const [conferenceSlug, setConferenceSlug] = useState<string>(
    tokenPayload.conf_slug,
  );
  const [attendances, setAttendances] = useState<Array<Attendance>>([]);

  useEffect(() => {
    setConferenceSlug(tokenPayload.conf_slug);
  }, [tokenPayload.conf_slug]);

  if (!token) return null;

  const apolloClient = initApollo({ apiURL });



  return (
    <ApolloProvider client={apolloClient}>
      <SnackbarProvider>
        <Router>
          <AppContext.Provider
            value={{
              attendances,
              conferenceSlug,
              setAttendances,
              token,
            }}
          >
            <StyledContainer>
              <h1>Calendar</h1>
              <AttendanceSearch />
              <Calendar env={process.env.NODE_ENV} token={token}/>
            </StyledContainer>
          </AppContext.Provider>
        </Router>
      </SnackbarProvider>
    </ApolloProvider>
  );
};

export default App;
