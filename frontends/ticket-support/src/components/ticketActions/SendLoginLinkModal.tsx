import React, { useState } from 'react'
import styled from 'styled-components'

import { Button, SecondaryButton } from '../../lib/components/atoms/Button'
import LabeledInput from '../../lib/components/molecules/LabeledInput'
import Modal, { ModalProps } from '../../lib/components/molecules/Modal'

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
`

const StyledSecondaryButton = styled(SecondaryButton)`
  margin-right: 8px;
`

const SendLinkModalContent = styled.div`
  padding: 2rem 0;
  height: 50px;
  width: 450px;
  font-size: 0.85rem;
  font-weight: 400;
`

const StyledLabeledInput = styled(LabeledInput)`
  width: 100%;
`

type SendLoginLinkModalProps = Omit<ModalProps, 'title' | 'renderFooter'> & {
  sendLink: (reason: string) => void
}

const SendLoginLinkModal = ({
  onRequestClose,
  sendLink,
  isOpen,
  ...props
}: SendLoginLinkModalProps) => {
  const [reasonForChange, setReasonForChange] = useState('')

  const renderSendEmailActionFooter = () => (
    <ModalFooter>
      <StyledSecondaryButton onClick={onRequestClose}>Cancel</StyledSecondaryButton>
      <Button
        disabled={!reasonForChange}
        onClick={() => {
          sendLink(reasonForChange)
          onRequestClose()
        }}
      >
        Confirm
      </Button>
    </ModalFooter>
  )

  return (
    <Modal
      isOpen={isOpen}
      renderFooter={renderSendEmailActionFooter}
      title="Send assignee login link email"
      onRequestClose={onRequestClose}
      {...props}
    >
      <SendLinkModalContent>
        <StyledLabeledInput
          label="Please enter a reason for this change (required)"
          value={reasonForChange}
          onChange={e => setReasonForChange(e.target.value)}
        />
      </SendLinkModalContent>
    </Modal>
  )
}

export default SendLoginLinkModal
