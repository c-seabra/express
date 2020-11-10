import React, { createContext, useEffect, useState } from 'react'
import jwt from 'jwt-decode'
import styled from 'styled-components'

import AssigneeList from '../assigneeList/AssigneeList'
import withApollo from '../../lib/apollo/withApollo'
import Form from '../form/Form'

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
}


export const AppContext = createContext<{assigneesList?: AssigneesList; setAssigneesList?: SetAssigneesList; conferenceSlug?: string; token?: string}>({})

const App = ({token}:{token:string}) => {
  if (!token) return null
  const tokenPayload: {email: string; conf_slug: string} = jwt(token)

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
          <h2>Ticket Assignment - Bulk upload ticket details</h2>
          <Form />
        </StyledSection>
        <StyledSection>
          {assigneesList && assigneesList?.length > 0 && <AssigneeList list={assigneesList} />}
        </StyledSection>
      </StlyedContainer>
    </AppContext.Provider>
  )
}

export default withApollo(App)
