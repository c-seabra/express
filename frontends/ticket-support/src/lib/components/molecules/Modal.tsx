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

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
// ReactModal.setAppElement('#yourAppElement')
// const Container = styled.div`
//   display: flex;
//   justify-content: flex-end;
// `

type ModalProps = {
  children?: ReactElement | ReactElement[] | string
}

const Modal = ({ setOpenfromexternal, children }: ModalProps) => {
  const [isOpen, setOpen] = useState(false)
  const togglePopup = () => setOpen(p => !p)
  const close = () => setOpen(p => false)


  return (
    <>
        <button onClick={togglePopup}>open</button>

        <ReactModal
        isOpen={isOpen}
        style={customStyles}
        onRequestClose={togglePopup}
      >
        <>
          <button onClick={close}>x</button>
          {children}
        </>
      </ReactModal>
    </>
  )
}

export default Modal
