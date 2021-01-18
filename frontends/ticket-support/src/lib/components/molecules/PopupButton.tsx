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
  customButton?: ReactElement
}

const PopupButton = ({ buttonText, customButton, children }: PopupButtonProps) => {
  const [isOpen, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <Container ref={containerRef}>
      {customButton || (
        <Button type="button" onClick={() => setOpen(p => !p)}>
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
