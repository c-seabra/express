import React, { createContext, useEffect, useState } from 'react'
import jwt from 'jwt-decode'
import styled from 'styled-components'

import withApollo from '../../lib/apollo/withApollo'
import {intersect} from "@hapi/hoek";

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


export const AppContext = createContext<{assigneesList?: AssigneesList; setAssigneesList?: SetAssigneesList; conferenceSlug?: string; token?: string}>({})

const App = ({token}:{token:string}) => {
  if (!token) return null
  const tokenPayload: {email: string; conf_slug: string} = jwt(token) as {email: string; conf_slug: string}

  useEffect(() => {
    setConferenceSlug(tokenPayload.conf_slug)
  }, [token])

  const [assigneesList, setAssigneesList] = useState<AssigneesList>()
  const [conferenceSlug, setConferenceSlug] = useState<string>()

  return (
    <AppContext.Provider
      value={{
        token,
        assigneesList,
        setAssigneesList,
        conferenceSlug
      }}
    >
      <StlyedContainer>
        <StyledSection>
          <h2>Ticket Assignment - Ticket Support Dashboard</h2>
        </StyledSection>
        <StyledSection>
          hello world
        </StyledSection>
      </StlyedContainer>
    </AppContext.Provider>
  )
}

export default withApollo(App)
