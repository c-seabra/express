import React, { ReactElement } from 'react'
import { useSnackbar } from 'react-simple-snackbar'
import styled from 'styled-components'

import Icon from '../components/atoms/Icon'

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
      return <Icon>error</Icon>
    case 'success':
      return <Icon>check_circle</Icon>
    case 'info':
    default:
      return <Icon>info</Icon>
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
