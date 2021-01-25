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
  const [isConfirmed, setConfirmed] = useState(false)
  const [reasonForChange, setReasonForChange] = useState('')

  const cancelAction = () => {
    setConfirmed(false)
    onRequestClose()
  }

  const renderConfirmActionFooter = () => (
    <ModalFooter>
      <StyledSecondaryButton onClick={cancelAction}>Cancel</StyledSecondaryButton>
      <Button onClick={() => setConfirmed(true)}>Confirm</Button>
    </ModalFooter>
  )

  const renderSendEmailActionFooter = () => (
    <ModalFooter>
      <StyledSecondaryButton onClick={cancelAction}>Cancel</StyledSecondaryButton>
      <Button
        disabled={!reasonForChange}
        onClick={() => {
          sendLink(reasonForChange)
          onRequestClose()
        }}
      >
        Send
      </Button>
    </ModalFooter>
  )

  return (
    <Modal
      isOpen={isOpen}
      renderFooter={isConfirmed ? renderSendEmailActionFooter : renderConfirmActionFooter}
      title="Send assignee login link email"
      onRequestClose={cancelAction}
      {...props}
    >
      <SendLinkModalContent>
        {isConfirmed ? (
          <StyledLabeledInput
            label="Please enter a reason for this change (required)"
            value={reasonForChange}
            onChange={e => setReasonForChange(e.target.value)}
          />
        ) : (
          'Are you sure you want to send another login link to this assignee?'
        )}
      </SendLinkModalContent>
    </Modal>
  )
}

export default SendLoginLinkModal
