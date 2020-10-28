import React, { createContext, useEffect, useState } from "react"
import jwt from 'jwt-decode'
import styled, { createGlobalStyle } from 'styled-components'

import AssigneeList from "../assigneeList/AssigneeList"
import withApollo from '../../lib/apollo/withApollo'
import Form from "../form/Form"

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: Arial, Helvetica, sans-serif;
  }
`
const StlyedContainer = styled.section`
  padding: 1rem;
  max-width: 1024px;
  width: 100%;
  margin: 0 auto;
`
const StyledSection = styled.section`
  padding: 1rem;
`

export type AppTypes = {
  assigneesList?: Array<Assignee>
  setAssigneesList?: (assignees: Array<Assignee>) => void
  conferenceSlug?: string
  setConferenceSlug?: (slug: string) => void
}
export type Assignee = {
  firstName: string
  lastName: string
  email: string
  ticketId: string
  bookingRef: string
}


export const AppContext = createContext<AppTypes>({})

const App = ({token}) => {
  if (!token) return null
  const tokenPayload = jwt(token)

  useEffect(() => {
    setConferenceSlug(tokenPayload.conf_slug)
  }, [token])

  const [assigneesList, setAssigneesList] = useState<Array<Assignee>>()
  const [conferenceSlug, setConferenceSlug] = useState<string>()

  return (
    <AppContext.Provider
      value={{
        assigneesList,
        setAssigneesList,
        conferenceSlug
      }}
    >
      <GlobalStyle/>
      <StlyedContainer>
        <StyledSection>
          <Form />
        </StyledSection>
        <StyledSection>
          <AssigneeList list={assigneesList} conferenceSlug={conferenceSlug} />
        </StyledSection>
      </StlyedContainer>
    </AppContext.Provider>
  );
};

export default withApollo(App)
