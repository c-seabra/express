import React, { ReactElement, useState } from 'react'
import ReactModal from 'react-modal'
import styled from 'styled-components'

import Icon from '../atoms/Icon'

const customStyles = {
  content: {
    bottom: 'auto',
    left: '50%',
    marginRight: '-50%',
    right: 'auto',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
}

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
`

const ModalTitle = styled.div`
  display: flex;
  font-family: 'azo-sans-web';
  font-size: 1.2rem;
`

const ExitActionContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

const ExitIcon = styled.span`
  cursor: pointer;
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
  onRequestClose: () => void
  renderFooter?: () => ReactElement
  title?: string
  withoutDefaultActions?: boolean
}

const Modal = ({
  isOpen,
  onRequestClose,
  title,
  withoutDefaultActions = false,
  children,
  renderFooter,
}: ModalProps) => {
  return (
    <ReactModal isOpen={isOpen} style={customStyles} onRequestClose={onRequestClose}>
      <ModalContainer>
        <ModalHeader>
          {title && <ModalTitle>{title}</ModalTitle>}
          {!withoutDefaultActions && (
            <ExitActionContainer>
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
