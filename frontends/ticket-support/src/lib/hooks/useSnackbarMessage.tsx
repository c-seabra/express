import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ErrorIcon from '@material-ui/icons/Error'
import InfoIcon from '@material-ui/icons/Info'
import React, { ReactElement } from 'react'
import { useSnackbar } from 'react-simple-snackbar'
import styled from 'styled-components'

type SnackbarType = 'info' | 'success' | 'error'

const getSnackbarStyles = (snackbarType: SnackbarType) => {
  switch (snackbarType) {
    case 'error':
      return {
        backgroundColor: '#E15554',
      }
    case 'success':
      return {
        backgroundColor: '#00B66D',
      }
    case 'info':
    default:
      return {
        backgroundColor: '#333333',
      }
  }
}

const SnackbarNode = styled.div`
  display: flex;
  align-items: center;

  & > * {
    margin-right: 1rem;
  }
`

const SnackbarIcon = ({ snackbarType }: { snackbarType: SnackbarType }): ReactElement => {
  switch (snackbarType) {
    case 'error':
      return <ErrorIcon />
    case 'success':
      return <CheckCircleIcon />
    case 'info':
    default:
      return <InfoIcon />
  }
}

type UseSnackbarMessageArgs = {
  type: SnackbarType
}

const useSnackbarMessage = ({ type }: UseSnackbarMessageArgs) => {
  const style = getSnackbarStyles(type)
  const [openSnackbar] = useSnackbar({ style })

  return (text: string) => {
    openSnackbar(
      <SnackbarNode>
        <SnackbarIcon snackbarType={type} />
        <div>{text}</div>
      </SnackbarNode>
    )
  }
}

export const useErrorSnackbar = () => {
  return useSnackbarMessage({ type: 'error' })
}

export const useSuccessSnackbar = () => {
  return useSnackbarMessage({ type: 'success' })
}

export const useInfoSnackbar = () => {
  return useSnackbarMessage({ type: 'info' })
}
