import React, { createContext, useEffect, useState } from 'react'
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

export type StaffList = { [index:string] : Staff }
export type Staff = {
  email: string
  bookingRef?: string
  firstName: string
  lastName: string
}

export type TicketList = Array<Staff>
export type SetTicketList = (tickets: TicketList) => void
export type Ticket = Staff


export const AppContext = createContext<{ticketsList?: TicketList; setTicketsList?: SetTicketList; conferenceSlug: string; token: string, staffList: StaffList, adminEmail: string}>({
  conferenceSlug: '',
  token: '',
  staffList: {},
  adminEmail: ''
})

const App = ({token, staffList, slug, email}:{token:string, staffList: StaffList, slug: string, email: string}) => {
  if (!token) return null

  const [ticketsList, setTicketList] = useState<TicketList>()

  return (
    <AppContext.Provider
      value={{
        token,
        adminEmail: email,
        ticketsList: ticketsList,
        setTicketsList: setTicketList,
        conferenceSlug: slug,
        staffList: staffList
      }}
    >
      <StlyedContainer>
        <StyledSection>
          <h2>Ticket Assignment - Staff ticket creation tool</h2>
          <Form />
        </StyledSection>
        <StyledSection>
          {ticketsList && ticketsList?.length > 0 && <AssigneeList list={ticketsList} />}
        </StyledSection>
      </StlyedContainer>
    </AppContext.Provider>
  )
}

export default withApollo(App)
