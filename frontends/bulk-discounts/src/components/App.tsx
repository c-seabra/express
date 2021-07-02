import { ApolloProvider } from '@apollo/client';
import { SnackbarProvider } from '@websummit/components/src/molecules/Snackbar';
import { Spacing } from '@websummit/components/src/templates/Spacing';
import {
  BulkOperationTool,
  dummyProcess,
  dummyRender,
} from '@websummit/glue/src/lib/operations/BulkOperationTool';
import { GraphQLParams, initApollo } from '@websummit/graphql';
import jwt from 'jwt-decode';
import React, { createContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import { processCreateDiscountWorkUnit } from '../lib/bulkOperation/process';
import { CreateDiscountWorkUnit } from '../lib/bulkOperation/workUnit';
import PrepareSummary from './PrepareSummary';
import ProcessSummary from './ProcessSummary';

const StyledContainer = styled.section`
  padding: 1rem;
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  font-size: 16px;
  background-color: #f2f3f6;
`;

const StyledSection = styled.section`
  padding: 1rem;
`;

const Title = styled.span`
  font-size: 24px;
  font-weight: 500;
  color: #0c1439;
`;

const SubHeader = styled.div`
  color: #0c1439;
  font-size: 16px;
  letter-spacing: 0;
  line-height: 21px;
`;

export type StaffList = { [index: string]: Staff };
export type Staff = {
  bookingRef?: string;
  email: string;
  firstName: string;
  lastName: string;
};

export type DiscountList = Array<CreateDiscountWorkUnit>;
export type SetTicketList = (tickets: DiscountList) => void;
export type Ticket = Staff;

export type Conference = {
  guestProductId?: string;
  slug: string;
  staffProductId?: string;
  storeId?: string;
};

export const AppContext = createContext<GraphQLParams>({
  apiURL: '',
  slug: '',
  token: '',
});

const App = ({ token, apiURL }: GraphQLParams) => {
  const tokenPayload: { conf_slug: string; email: string } = jwt(token || '');
  const [slug, setSlug] = useState<string>(tokenPayload.conf_slug);

  useEffect(() => {
    setSlug(tokenPayload.conf_slug);
  }, [tokenPayload.conf_slug]);

  if (!token) return null;

  const apolloClient = initApollo({ apiURL });

  const bulkContext: GraphQLParams = {
    apolloClient,
    slug,
    token,
  };

  return (
    <ApolloProvider client={apolloClient}>
      <SnackbarProvider>
        <AppContext.Provider
          value={{
            apiURL,
            apolloClient,
            slug,
            token,
          }}
        >
          <StyledContainer>
            <StyledSection>
              <Spacing bottom="2rem">
                <Title>Discount creation</Title>
                <SubHeader>
                  Allows fast and easy way to create one or more discounts from
                  a template. This feature is accelerating bulk creation of
                  discount codes
                </SubHeader>
              </Spacing>
            </StyledSection>
            <StyledSection>
              <BulkOperationTool
                RenderContextForm={dummyRender}
                RenderContextSummary={dummyRender}
                RenderList={dummyRender}
                RenderListForm={dummyRender}
                RenderPrepareSummary={PrepareSummary}
                RenderProcessSummary={ProcessSummary}
                prepare={dummyProcess}
                process={processCreateDiscountWorkUnit}
              />
            </StyledSection>
          </StyledContainer>
        </AppContext.Provider>
      </SnackbarProvider>
    </ApolloProvider>
  );
};

export default App;
