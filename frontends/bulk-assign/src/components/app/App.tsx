import React, { createContext, useEffect, useState } from 'react'
import jwt from 'jwt-decode'
import styled from 'styled-components'

import AssigneeList from '../assigneeList/AssigneeList'
import { GraphQLParams, initApollo } from '@websummit/graphql';
import Form from '../form/Form'
import { ApolloProvider } from '@apollo/client';
import {
  Conference,
  SetTicketList,
  StaffList,
  TicketList,
} from '@websummit-micro/staff-tickets/src/components/app/App';

const StlyedContainer = styled.section`
  padding: 1rem;
  max-width: 1024px;
  width: 100%;
  margin: 0 auto;
  font-size: 16px;
`
const StyledSection = styled.section`
  padding: 1rem;
`
export type AssigneesList = Array<Assignee>
export type SetAssigneesList = (assignees: AssigneesList) => void
export type Assignee = {
  firstName: string
  lastName: string
  email: string
  ticketId: string
  bookingRef: string
  autoClaim?: string
}

export type BulkAssignContext = GraphQLParams & {
  assigneesList?: AssigneesList; setAssigneesList?: SetAssigneesList;}


export const AppContext = createContext<BulkAssignContext>({})

const App = ({token, apiURL=''}:BulkAssignContext) => {
  if (!token) return null
  const tokenPayload: {email: string; conf_slug: string} = jwt(token) as {email: string; conf_slug: string}

  useEffect(() => {
    setConferenceSlug(tokenPayload.conf_slug)
  }, [token])

  const [assigneesList, setAssigneesList] = useState<AssigneesList>()
  const [conferenceSlug, setConferenceSlug] = useState<string>()

  const apolloClient = initApollo({apiURL});

  return (
    <ApolloProvider client={apolloClient}>
    <AppContext.Provider
      value={{
        token,
        apiURL,
        assigneesList,
        setAssigneesList,
        conferenceSlug
      }}
    >
      <StlyedContainer>
        <StyledSection>
          <h2>Ticket Assignment - Bulk upload ticket details</h2>
          <Form />
        </StyledSection>
        <StyledSection>
          {assigneesList && assigneesList?.length > 0 && <AssigneeList list={assigneesList} />}
        </StyledSection>
      </StlyedContainer>
    </AppContext.Provider>
    </ApolloProvider>
  )
}

export default App
