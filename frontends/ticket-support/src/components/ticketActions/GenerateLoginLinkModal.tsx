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

const InputContainer = styled.div`
  padding: 2rem 0;
  height: 50px;
  width: 450px;
  font-size: 0.85rem;
  font-weight: 400;
`

const StyledLabeledInput = styled(LabeledInput)`
  width: 100%;
`

type GenerateLoginLinkModalProps = Pick<ModalProps, 'isOpen' | 'onRequestClose'> & {
  generateLink: (reason: string) => void
}

const GenerateLoginLinkModal = ({
  isOpen,
  onRequestClose,
  generateLink,
}: GenerateLoginLinkModalProps) => {
  const [reasonForChange, setReasonForChange] = useState('')

  const renderLoginLinkModalFooter = () => (
    <ModalFooter>
      <StyledSecondaryButton onClick={onRequestClose}>Cancel</StyledSecondaryButton>
      <Button
        disabled={!reasonForChange}
        onClick={() => {
          generateLink(reasonForChange)
          onRequestClose()
        }}
      >
        Generate
      </Button>
    </ModalFooter>
  )

  return (
    <Modal
      isOpen={isOpen}
      renderFooter={renderLoginLinkModalFooter}
      title="Generate login link"
      onRequestClose={onRequestClose}
    >
      <InputContainer>
        <StyledLabeledInput
          label="Please enter a reason for this change (required)"
          value={reasonForChange}
          onChange={e => setReasonForChange(e.target.value)}
        />
      </InputContainer>
    </Modal>
  )
}

export default GenerateLoginLinkModal
