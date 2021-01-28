import { Form, Formik } from 'formik'
import React, { FormEvent, useState } from 'react'
import styled from 'styled-components'
import * as Yup from 'yup'

import { Button, SecondaryButton } from '../../lib/components/atoms/Button'
import { WarningMessage } from '../../lib/components/atoms/Messages'
import Modal, { ModalProps } from '../../lib/components/molecules/Modal'
import TextInputField from '../../lib/components/molecules/TextInputField'
import useClaimTicketMutation from '../../lib/hooks/useClaimTicketMutation'
import { Ticket } from '../../lib/types'

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
`

const StyledSecondaryButton = styled(SecondaryButton)`
  margin-right: 8px;
`

const StyledForm = styled(Form)`
  width: 450px;
  padding: 1rem 0;
`
const ConfirmationText = styled.div`
  display: flex;
  font-size: 1rem;
  font-weight: 400;
  padding-bottom: 2rem;
  color: #07143e;

  span {
    font-weight: 600;
    color: #0067e9;
  }
`

type ClaimTicketModalProps = Pick<ModalProps, 'isOpen' | 'onRequestClose'> & {
  ticket: Ticket
}

const claimTicketSchema = Yup.object().shape({
  reason: Yup.string().required('Required'),
})

const ClaimTicketModal = ({ ticket, isOpen, onRequestClose }: ClaimTicketModalProps) => {
  const { claimTicket } = useClaimTicketMutation({ ticketId: ticket.id })
  const [formControls, setFormControls] = useState<
    | {
        boundReset?: () => void
        boundSubmit?: (event?: FormEvent) => void
      }
    | undefined
  >()

  const handleClose = () => {
    if (formControls?.boundReset) {
      formControls.boundReset()
    }

    onRequestClose()
  }

  const renderLoginLinkModalFooter = () => (
    <ModalFooter>
      <StyledSecondaryButton onClick={handleClose}>Cancel</StyledSecondaryButton>
      <Button onClick={formControls?.boundSubmit}>Claim ticket</Button>
    </ModalFooter>
  )

  return (
    <Modal
      isOpen={isOpen}
      renderFooter={renderLoginLinkModalFooter}
      title="Claim ticket"
      onRequestClose={onRequestClose}
    >
      <Formik
        initialValues={{
          reason: '',
        }}
        validateOnBlur={false}
        validateOnChange={false}
        validationSchema={claimTicketSchema}
        onSubmit={async ({ reason }) => {
          await claimTicket(reason)
          handleClose()
        }}
      >
        {({ submitForm, resetForm }) => {
          // Binding submit form to submit programmatically from outside the <Formik> component
          if (!formControls) {
            setFormControls({ boundReset: resetForm, boundSubmit: submitForm })
          }

          return (
            <StyledForm>
              <ConfirmationText>
                Are you sure you want to&nbsp;<span>claim</span>&nbsp;ticket&nbsp;
                <span>{ticket.bookingRef}</span>?
              </ConfirmationText>
              <TextInputField
                required
                label="Please enter a reason for this change"
                name="reason"
              />
              <WarningMessage>
                This will reset the ticket assignment and the previous ticket holder will lose
                access to the ticket. They will be notified by email.
              </WarningMessage>
            </StyledForm>
          )
        }}
      </Formik>
    </Modal>
  )
}

export default ClaimTicketModal
