import React, { FC } from 'react';
import { MemoryRouter, Route } from 'react-router-dom';

type InitialEntries = string[] | string;

const getInitialEntries = (initialEntries?: InitialEntries) => {
  if (initialEntries) {
    if (Array.isArray(initialEntries)) {
      return initialEntries;
    }

    return [initialEntries];
  }

  return [''];
};

type MockRouterProps = {
  initialEntries?: InitialEntries;
  path?: string;
};

const MockRouter: FC<MockRouterProps> = ({
  children,
  initialEntries,
  path,
}) => (
  <MemoryRouter initialEntries={getInitialEntries(initialEntries)}>
    <Route path={path}>{children}</Route>
  </MemoryRouter>
);

export default MockRouter;
