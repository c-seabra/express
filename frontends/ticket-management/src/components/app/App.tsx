import { SnackbarProvider } from '@websummit/components/src/molecules/Snackbar';
import ApolloAppContextProvider from '@websummit/graphql/src/utils/ApolloAppContextProvider';
import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

import DiscountTemplatePage from '../pages/DiscountTemplatePage';
import DiscountTemplatesPage from '../pages/DiscountTemplatesPage';
import PackagePage from '../pages/PackagePage';
import PackagesPage from '../pages/PackagesPage';
import SalesCyclePage from '../pages/SalesCyclePage';
import SalesCyclesPage from '../pages/SalesCyclesPage';
import TagsPage from '../pages/TagsPage';
import TicketCategoriesPage from '../pages/TicketCategoriesPage';
import TicketTypePage from '../pages/TicketTypePage';
import TicketTypesPage from '../pages/TicketTypesPage';

const StyledContainer = styled.section`
  margin: 0 auto;
  font-size: 16px;
  background-color: #f2f3f6;
`;

type AppProps = {
  apiURL: string;
  token: string;
};

const App = ({ token, apiURL }: AppProps) => {
  return (
    <ApolloAppContextProvider apiURL={apiURL} token={token}>
      <SnackbarProvider>
        <Router>
          <StyledContainer>
            <Switch>
              <Route exact path="/">
                <SalesCyclesPage />
              </Route>
              <Route exact path="/sale-cycles">
                <SalesCyclesPage />
              </Route>
              <Route exact path="/sale-cycle/:id">
                <SalesCyclePage />
              </Route>
              <Route exact path="/ticket-categories">
                <TicketCategoriesPage />
              </Route>
              <Route exact path="/ticket-types">
                <TicketTypesPage />
              </Route>
              <Route exact path="/ticket-type/:id">
                <TicketTypePage />
              </Route>
              <Route exact path="/deals">
                <PackagesPage />
              </Route>
              <Route exact path="/deal/:id">
                <PackagePage />
              </Route>
              <Route exact path="/discounts">
                <DiscountTemplatesPage />
              </Route>
              <Route exact path="/discount/:id">
                <DiscountTemplatePage />
              </Route>
              <Route exact path="/tags">
                <TagsPage />
              </Route>
            </Switch>
          </StyledContainer>
        </Router>
      </SnackbarProvider>
    </ApolloAppContextProvider>
  );
};

export default App;
