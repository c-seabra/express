import React, { ReactElement } from 'react'
import ReactModal from 'react-modal'
import styled from 'styled-components'

import Icon from '../atoms/Icon'

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const ExitActionContainer = styled.div<{ noPadding?: boolean }>`
  display: flex;
  justify-content: flex-end;
  padding: ${props => (props.noPadding ? '16px' : '0')}; // Adjust only action header when no padding 
`

type ModalProps = {
  children?: ReactElement | ReactElement[] | string
  isOpen: boolean
  noPadding?: boolean
  onRequestClose: () => void
  withoutDefaultActions?: boolean
}

const Modal = ({
  isOpen,
  onRequestClose,
  withoutDefaultActions = false,
  noPadding = false,
  children,
}: ModalProps) => {
  const customStyles = {
    content: {
      bottom: 'auto',
      left: '50%',
      marginRight: '-50%',
      padding: noPadding ? '0' : '16px',
      right: 'auto',
      top: '50%',
      transform: 'translate(-50%, -50%)',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
  }

  return (
    <ReactModal isOpen={isOpen} style={customStyles} onRequestClose={onRequestClose}>
      <ModalContainer>
        {!withoutDefaultActions && (
          <ExitActionContainer noPadding={noPadding}>
            <Icon onClick={onRequestClose}>close</Icon>
          </ExitActionContainer>
        )}
        {children}
      </ModalContainer>
    </ReactModal>
  )
}

export default Modal
