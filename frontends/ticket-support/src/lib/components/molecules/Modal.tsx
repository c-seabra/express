import React, { ReactElement, useState } from 'react'
import ReactModal from 'react-modal'
import styled from 'styled-components'

import Icon from '../atoms/Icon'

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const ExitActionContainer = styled.div<{ noPadding?: boolean }>`
  display: flex;
  align-items: center;
  padding: ${props =>
    props.noPadding ? '16px' : '0'}; // Adjust only action header when no padding
`

const ModalHeader = styled.div<{ title?: string }>`
  display: flex;
  justify-content: ${props => (props.title ? 'space-between' : 'flex-end')};
`

const ModalTitle = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 1.2rem;
`

export const useModalState = ({ initialState = false }: { initialState?: boolean } = {}) => {
  const [isOpen, setOpen] = useState(initialState)

  return {
    closeModal: () => setOpen(false),
    isOpen,
    openModal: () => setOpen(true),
    toggleModal: () => setOpen(prevState => !prevState),
  }
}

export type ModalProps = {
  children?: ReactElement | ReactElement[] | string
  isOpen: boolean
  noPadding?: boolean
  onRequestClose: () => void
  renderFooter?: () => ReactElement
  title?: string
  withoutDefaultActions?: boolean
}

const Modal = ({
  title,
  renderFooter,

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
        <ModalHeader title={title}>
          {title && <ModalTitle>{title}</ModalTitle>}
          {!withoutDefaultActions && (
            <ExitActionContainer noPadding={noPadding}>
              <Icon onClick={onRequestClose}>close</Icon>
            </ExitActionContainer>
          )}
        </ModalHeader>
        {children}
        {renderFooter && renderFooter()}
      </ModalContainer>
    </ReactModal>
  )
}

export default Modal
