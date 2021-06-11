import './App.css';

import { ApolloProvider } from '@apollo/client';
import { SnackbarProvider } from '@websummit/components/src/molecules/Snackbar';
import { initApollo } from '@websummit/graphql';
import jwt from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import styled from 'styled-components';

import { Attendance, Color } from '../../lib/types';
import AttendanceSearch from '../attendanceSearch/AttendanceSearch';
import Calendar from '../calendar/Calendar';
import AppContext from './AppContext';

const StyledContainer = styled.section`
  padding: 8px;
  display: grid;
  margin: 0 auto;
  background-color: #f2f3f6;
  font: 300 16px 'Inter', 'Lato', Helvetica, Arial, sans-serif;;

  h1 {
    font-size: 2rem;
    font-weight: 300;
    font-family: 'Inter', 'Lato', Helvetica, Arial, sans-serif;
  }
`;

type AppProps = {
  apiURL: string;
  token: string;
};

const App = ({ token, apiURL }: AppProps) => {
  const tokenPayload: { conf_slug: string; email: string } = jwt(token);
  const [slug, setSlug] = useState<string>(tokenPayload.conf_slug);
  const [attendances, setAttendances] = useState<Array<Attendance>>([]);
  const [colors, setColors] = useState<Array<Color>>([]);

  useEffect(() => {
    setSlug(tokenPayload.conf_slug);
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
              colors,
              setAttendances,
              setColors,
              slug,
              token,
            }}
          >
            <StyledContainer>
              <h1>Calendar</h1>
              <AttendanceSearch />
              <Calendar env={process.env.NODE_ENV} token={token} />
            </StyledContainer>
          </AppContext.Provider>
        </Router>
      </SnackbarProvider>
    </ApolloProvider>
  );
};

export default App;
