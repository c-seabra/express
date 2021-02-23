import React, { useEffect, useState } from "react";
import jwt from "jwt-decode";
import styled from "styled-components";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import EVENT_LIST from "../../operations/queries/EventList";
import EventList from "../eventList/EventList";
import AppContext from "./AppContext";

import withApollo from "../../lib/apollo/withApollo";
import { ApolloError, useQuery } from "@apollo/client";
import LegalEntityList from "../legalEntityList/LegalEntityList";
import LEGAL_ENTITY_LIST from "../../operations/queries/LegalEntityList";
import { Event, LegalEntity } from "../../lib/types";

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

export type EventList = Array<Event>;

const App = ({ token }: { token: string }) => {
  if (!token) return null;
  const tokenPayload: { email: string; conf_slug: string } = jwt(token) as {
    email: string;
    conf_slug: string;
  };

  useEffect(() => {
    setConferenceSlug(tokenPayload.conf_slug);
  }, [token]);

  const [conferenceSlug, setConferenceSlug] = useState<string>();

  const {
    loading,
    error,
    data,
  }: {
    loading?: boolean;
    error?: ApolloError;
    data?: {
      events: {
        edges: [
          {
            node: Event;
          }
        ];
      };
    };
  } = useQuery(EVENT_LIST, {
    context: {
      token,
      slug: conferenceSlug,
    },
  });

  const {
    loading: legalEntityLoading,
    error: legalEntityError,
    data: legalEntityData,
  }: {
    loading?: boolean;
    error?: ApolloError;
    data?: {
      legalEntities: {
        edges: [
          {
            node: LegalEntity;
          }
        ];
      };
    };
  } = useQuery(LEGAL_ENTITY_LIST, {
    context: {
      token,
      slug: conferenceSlug,
    },
  });

  return (
    <Router>
      <AppContext.Provider
        value={{
          token,
          conferenceSlug,
        }}
      >
        <StyledContainer>
          <StyledSection>
            <h2>Back Office</h2>
          </StyledSection>
          <Switch>
            <Route exact path="/">
              <Redirect to="/events" />
            </Route>
            <Route path="/events">
              <StyledSection>
                {loading && "Loading events list"}
                {error}
                {!loading && !error && (
                  <EventList
                    list={data?.events.edges.map((node) => node.node)}
                  />
                )}
              </StyledSection>
            </Route>
            <Route path="/legal_entities">
              {legalEntityLoading && "Loading legal entities list"}
              {legalEntityError}
              {!legalEntityLoading && !legalEntityError && (
                <LegalEntityList
                  list={legalEntityData?.legalEntities.edges.map((node) => node.node)}
                />
              )}
            </Route>
          </Switch>
        </StyledContainer>
      </AppContext.Provider>
    </Router>
  );
};

export default withApollo(App);
