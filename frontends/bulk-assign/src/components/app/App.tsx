import React from "react"
import AssigneeList from "../assigneeList/AssigneeList"
import { AssigneeProvider } from "../../context/AssigneeContext"
import withApollo from '../../lib/apollo/withApollo'
import styled, { createGlobalStyle } from 'styled-components'
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

const App = () => {
  return (
    <AssigneeProvider>
      <GlobalStyle/>
      <StlyedContainer>
        <StyledSection>
          <Form />
        </StyledSection>
        <StyledSection>
          <AssigneeList />
        </StyledSection>
      </StlyedContainer>
    </AssigneeProvider>
  );
};

export default withApollo(App)
