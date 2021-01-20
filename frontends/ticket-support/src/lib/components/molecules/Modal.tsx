import React, { ReactElement, useRef, useState } from 'react'
import * as ReactModal from 'react-modal'
import styled from 'styled-components'

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

const ExitActionContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`

type ModalProps = {
  children?: ReactElement | ReactElement[] | string
  isOpen: boolean
  onRequestClose: any
}

const Modal = ({ isOpen, onRequestClose, children }: ModalProps) => {

  return (
    <ReactModal isOpen={isOpen} style={customStyles} onRequestClose={onRequestClose}>
      <ModalContainer>
        <ExitActionContainer>
          <span className="material-icons" onClick={onRequestClose}>
            close
          </span>
        </ExitActionContainer>
        {children}
      </ModalContainer>
    </ReactModal>
  )
}

export default Modal
