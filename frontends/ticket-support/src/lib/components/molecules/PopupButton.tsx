import React, { ReactElement, useRef, useState } from 'react'
import styled from 'styled-components'

import { Button } from '../atoms/Button'
import PopupModal from '../atoms/PopupModal'

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
`

type PopupButtonProps = {
  buttonText?: string
  children?: ReactElement | ReactElement[] | string
  renderButton?: ({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) => ReactElement
}

const PopupButton = ({ buttonText, renderButton, children }: PopupButtonProps) => {
  const [isOpen, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const togglePopup = () => setOpen(p => !p)

  return (
    <Container ref={containerRef}>
      {!renderButton || renderButton({ isOpen, onClick: togglePopup }) || (
        <Button type="button" onClick={togglePopup}>
          {buttonText}
        </Button>
      )}
      <PopupModal closeModal={() => setOpen(false)} domNode={containerRef?.current} isOpen={isOpen}>
        {children}
      </PopupModal>
    </Container>
  )
}

export default PopupButton
