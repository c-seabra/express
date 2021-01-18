import React, { ReactElement, useRef, useState } from 'react'
import styled from 'styled-components'

import { Button } from '../atoms/Button'
import PopupModal from '../atoms/PopupModal'

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
`

type PopupButtonProps = {
  children?: ReactElement | ReactElement[] | string
}

const PopupButton = ({ children }: PopupButtonProps) => {
  const [isOpen, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <Container ref={containerRef}>
      <Button type="button" onClick={() => setOpen(p => !p)}>
        filters
      </Button>
      <PopupModal closeModal={() => setOpen(false)} domNode={containerRef?.current} isOpen={isOpen}>
        {children}
      </PopupModal>
    </Container>
  )
}

export default PopupButton
