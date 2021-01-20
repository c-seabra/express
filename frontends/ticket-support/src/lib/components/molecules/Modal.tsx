import React, { ReactElement, useRef, useState } from 'react'
import ReactModal from 'react-modal'
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

const Modal = ({ children }: ModalProps) => {
  const [isOpen, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const togglePopup = () => setOpen(p => !p)

  return (
    <div>
      <button onClick={togglePopup}>Open Modal</button>
      <ReactModal
        contentLabel="Example Modal"
        isOpen={isOpen}
        style={customStyles}
        onRequestClose={togglePopup}
      >
        {children}
      </ReactModal>
    </div>
  )
}

export default Modal
