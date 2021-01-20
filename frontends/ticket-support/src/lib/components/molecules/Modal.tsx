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
}

const Modal = ({ isOpen, children }: ModalProps) => {
  const [_isOpen, setOpen] = useState(false)
  const togglePopup = () => setOpen(p => !p)
  const close = () => setOpen(false)

  return (
    <>
      <button onClick={togglePopup}>open</button>

      <ReactModal isOpen={_isOpen} style={customStyles} onRequestClose={togglePopup}>
        <ModalContainer>
          <ExitActionContainer>
            <span className="material-icons" onClick={close}>
              close
            </span>
          </ExitActionContainer>
          {children}
        </ModalContainer>
      </ReactModal>
    </>
  )
}

export default Modal
