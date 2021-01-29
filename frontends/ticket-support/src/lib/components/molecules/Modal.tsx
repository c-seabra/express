import React, { ReactElement, useState } from 'react'
import ReactModal from 'react-modal'
import styled from 'styled-components'

import { Button, SecondaryButton } from '../atoms/Button'
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
  font-size: 1.2rem;
`

const ExitActionContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
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
  withDefaultFooter?: boolean
  withoutDefaultActions?: boolean
}

const ModalFooter = styled.div`
  position: absolute;
  right: 1rem;
  bottom: 1rem;
  display: flex;
  justify-content: flex-end;
`

const StyledSecondaryButton = styled(SecondaryButton)`
  margin-right: 8px;
`

type FooterProps = {
  cancelText?: string
  onCancelClick?: () => void
  onSubmitClick?: () => void
  submitText?: string
}

const DefaultModalFooter = ({
  onSubmitClick,
  submitText = 'Submit',
  onCancelClick,
  cancelText = 'Cancel',
}: FooterProps) => (
  <ModalFooter>
    <StyledSecondaryButton onClick={onCancelClick}>{cancelText}</StyledSecondaryButton>
    <Button type="submit" onClick={onSubmitClick}>
      {submitText}
    </Button>
  </ModalFooter>
)

const DefaultFooterSpacer = styled.div`
  width: 100%;
  height: 2rem;
`

const Modal = ({
  isOpen,
  onRequestClose,
  title,
  withoutDefaultActions = false,
  children,
  renderFooter,
  withDefaultFooter = false,
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
        {withDefaultFooter && <DefaultFooterSpacer />}
        {!withDefaultFooter && renderFooter && renderFooter()}
      </ModalContainer>
    </ReactModal>
  )
}

Modal.DefaultFooter = DefaultModalFooter

export default Modal
