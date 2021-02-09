import React, { createContext, useState } from "react";
import styled from "styled-components";

import AssigneeList from "../assigneeList/AssigneeList";
import Form from "../form/Form";
import { ApolloProvider } from "@apollo/client";
import initApollo from "../../lib/apollo/apolloClient";

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

export type StaffList = { [index: string]: Staff };
export type Staff = {
  email: string;
  bookingRef?: string;
  firstName: string;
  lastName: string;
};

export type TicketList = Array<Staff>;
export type SetTicketList = (tickets: TicketList) => void;
export type Ticket = Staff;

export type Conference = {
  slug: string;
  storeId?: string;
  staffProductId?: string;
  guestProductId?: string;
};

export type StaffTicketContext = {
  ticketsList?: TicketList;
  setTicketsList?: SetTicketList;
  conference: Conference;
  token: string;
  staffList: StaffList;
  apiURL: string;
};

export const AppContext = createContext<StaffTicketContext>({
  conference: {
    slug: "",
  },
  token: "",
  staffList: {},
  apiURL: "",
});

const App = ({ token, staffList, conference, apiURL }: StaffTicketContext) => {
  if (!token) return null;

  const [ticketsList, setTicketList] = useState<TicketList>();

  const apolloClient = initApollo(apiURL);

  return (
    <ApolloProvider client={apolloClient}>
      <AppContext.Provider
        value={{
          token,
          ticketsList: ticketsList,
          setTicketsList: setTicketList,
          conference: conference,
          staffList: staffList,
          apiURL: apiURL,
        }}
      >
        <StlyedContainer>
          <StyledSection>
            <h2>Ticket Assignment - Staff ticket creation tool</h2>
            <Form />
          </StyledSection>
          <StyledSection>
            {ticketsList && ticketsList?.length > 0 && (
              <AssigneeList list={ticketsList} />
            )}
          </StyledSection>
        </StlyedContainer>
      </AppContext.Provider>
    </ApolloProvider>
  );
};

export default App;
