import React, { FC } from 'react';
import * as Snackbar from 'react-simple-snackbar';

const MockSnackbarProvider: FC = ({ children }) => {
  // Mocks the open and close functions
  const openSnackbarMock = jest.fn();
  const closeSnackbarMock = jest.fn();
  jest
    .spyOn(Snackbar, 'useSnackbar')
    .mockImplementation(() => [openSnackbarMock, closeSnackbarMock]);

  return <>{children}</>;
};

export default MockSnackbarProvider;
