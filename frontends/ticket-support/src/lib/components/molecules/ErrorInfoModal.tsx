import React from 'react'
import styled from 'styled-components'

import { Spacing } from '../../../components/templates/Spacing'
import { ErrorButton } from '../atoms/Button'
import Icon from '../atoms/Icon'
import Modal from './Modal'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 0 0;
  font-size: 0.85rem;
  font-weight: 400;
  min-width: 640px;
`

const Text = styled.div`
  font-size: 20px;
  letter-spacing: 0;
  line-height: 28px;
`

const HeaderText = styled.div`
  font-size: 32px;
  font-weight: 500;
  letter-spacing: -0.5px;
  line-height: 40px;
`

const AlertText = styled(HeaderText)`
  color: #e15554;
`

const StyledErrorButton = styled(ErrorButton)`
  padding-left: 3.75rem;
  padding-right: 3.75rem;
`

const IconWrapper = styled.div`
  > .material-icons {
    font-size: 36px;
    color: #e15554;
  }
`

type ErrorInfoModalProps = {
  bookingRef: string
  closeModal: () => void
  headerText?: string
  isOpen: boolean
}

const ErrorInfoModal = ({ isOpen, closeModal, headerText, bookingRef }: ErrorInfoModalProps) => {
  const handleClose = () => {
    closeModal()
  }

  return (
    <Modal key={isOpen.toString()} isOpen={isOpen} onRequestClose={handleClose}>
      <Wrapper>
        <IconWrapper>
          <Icon>error</Icon>
        </IconWrapper>
        <HeaderText>Unable to void ticket</HeaderText>
        <AlertText>{bookingRef}</AlertText>

        <Spacing bottom="4rem">
          <Text>
            As this ticket was created in Tito, it cannot be voided using Ticket Machine. Please go
            to Tito to void the ticket.
          </Text>
        </Spacing>
        <Spacing>
          <StyledErrorButton onClick={handleClose}>OK</StyledErrorButton>
        </Spacing>
      </Wrapper>
    </Modal>
  )
}

export default ErrorInfoModal
