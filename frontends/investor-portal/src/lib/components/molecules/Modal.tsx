import React, { ReactElement, useState } from 'react'
import ReactModal from 'react-modal'

import { Button, DestructiveButton, SecondaryButton } from '../atoms/Button'
import Icon from '../atoms/Icon'
import {
  DefaultFooterSpacer,
  ExitActionContainer,
  ModalContainer,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from './Modal.styled'

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
  defaultFooterIsDestructive?: boolean
  defaultFooterNegativeButtonAction?: () => void
  defaultFooterNegativeButtonText?: string
  defaultFooterPositiveButtonAction?: () => void
  defaultFooterPositiveButtonText?: string
  description?: string
  isOpen: boolean
  noPadding?: boolean
  onRequestClose: () => void
  renderFooter?: () => ReactElement
  title?: string
  withDefaultFooter?: boolean
  withoutDefaultActions?: boolean
}

type FooterProps = {
  isDestructive: boolean
  negativeButtonAction: () => void
  negativeButtonText: string
  positiveButtonAction: () => void
  positiveButtonText: string
}

const DefaultModalFooter = ({
  isDestructive,
  positiveButtonText,
  negativeButtonText,
  positiveButtonAction,
  negativeButtonAction,
}: FooterProps) => (
  <ModalFooter>
    <SecondaryButton style={{ marginRight: 10 }} onClick={negativeButtonAction}>
      {negativeButtonText}
    </SecondaryButton>
    {!isDestructive && (
      <Button type="submit" onClick={positiveButtonAction}>
        {positiveButtonText}
      </Button>
    )}
    {isDestructive && (
      <DestructiveButton type="submit" onClick={positiveButtonAction}>
        {positiveButtonText}
      </DestructiveButton>
    )}
  </ModalFooter>
)

const Modal = ({
  title,
  description,
  isOpen,
  onRequestClose,
  withoutDefaultActions = false,
  noPadding = false,
  children,
  renderFooter,
  withDefaultFooter = false,
  defaultFooterIsDestructive = false,
  defaultFooterPositiveButtonText = 'Submit',
  defaultFooterNegativeButtonText = 'Cancel',
  defaultFooterPositiveButtonAction = onRequestClose,
  defaultFooterNegativeButtonAction = onRequestClose,
}: ModalProps) => {
  const customStyles = {
    content: {
      bottom: 'auto',
      flex: 1,
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
        {description && <ModalDescription>{description}</ModalDescription>}
        {children}
        {withDefaultFooter && <DefaultFooterSpacer />}
        {!withDefaultFooter && renderFooter && renderFooter()}
        {withDefaultFooter && (
          <Modal.DefaultFooter
            isDestructive={defaultFooterIsDestructive}
            negativeButtonAction={defaultFooterNegativeButtonAction}
            negativeButtonText={defaultFooterNegativeButtonText}
            positiveButtonAction={defaultFooterPositiveButtonAction}
            positiveButtonText={defaultFooterPositiveButtonText}
          />
        )}
      </ModalContainer>
    </ReactModal>
  )
}

Modal.DefaultFooter = DefaultModalFooter

export default Modal
