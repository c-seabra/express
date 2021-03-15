import React, { ReactElement } from 'react';
import _SnackbarProvider, {
  SnackbarOptions,
  useSnackbar,
} from 'react-simple-snackbar';
import styled from 'styled-components';

import Icon from '../atoms/Icon';

type SnackbarType = 'info' | 'success' | 'error' | 'warning';

export const SnackbarProvider = _SnackbarProvider;

const getSnackbarOptions = (snackbarType: SnackbarType): SnackbarOptions => {
  switch (snackbarType) {
    case 'error':
      return {
        style: {
          backgroundColor: '#E15554',
        },
      };
    case 'success':
      return {
        style: {
          backgroundColor: '#00B66D',
        },
      };
    case 'warning':
      return {
        closeStyle: {
          color: '#333333',
        },
        style: {
          backgroundColor: '#F8BA26',
          color: '#333333',
        },
      };
    case 'info':
    default:
      return {
        style: {
          backgroundColor: '#333333',
        },
      };
  }
};

const SnackbarNode = styled.div`
  display: flex;
  align-items: center;

  & > * {
    margin-right: 1rem;
  }
`;

const SnackbarIcon = ({
  snackbarType,
}: {
  snackbarType: SnackbarType;
}): ReactElement => {
  switch (snackbarType) {
    case 'error':
      return <Icon>error</Icon>;
    case 'success':
      return <Icon>check_circle</Icon>;
    case 'warning':
      return <Icon>warning</Icon>;
    case 'info':
    default:
      return <Icon>info</Icon>;
  }
};

type UseSnackbarMessageArgs = {
  type: SnackbarType;
};

const useSnackbarMessage = ({ type }: UseSnackbarMessageArgs) => {
  const options = getSnackbarOptions(type);
  const [openSnackbar] = useSnackbar(options);
  const duration = 10000;

  return (text: string) => {
    openSnackbar(
      <SnackbarNode>
        <SnackbarIcon snackbarType={type} />
        <div>{text}</div>
      </SnackbarNode>,
      duration,
    );
  };
};

export const useErrorSnackbar = () => {
  return useSnackbarMessage({ type: 'error' });
};

export const useSuccessSnackbar = () => {
  return useSnackbarMessage({ type: 'success' });
};

export const useInfoSnackbar = () => {
  return useSnackbarMessage({ type: 'info' });
};

export const useWarningSnackbar = () => {
  return useSnackbarMessage({ type: 'warning' });
};
