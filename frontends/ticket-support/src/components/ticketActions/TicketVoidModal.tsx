import { Form, Formik } from 'formik'
import React, { FormEvent, useState } from 'react'
import styled from 'styled-components'
import * as Yup from 'yup'

import { WarningMessage } from '../../lib/components/atoms/Messages'
import Modal from '../../lib/components/molecules/Modal'
import TextInputField from '../../lib/components/molecules/TextInputField'
import STATIC_MESSAGES from '../../lib/constants/messages'
import { Ticket } from '../../lib/types'
import useTicketVoidMutation from "../../lib/hooks/useTicketVoidMutation";

const ContentContainer = styled.div`
  padding: 2rem 0;
  width: 450px;
  font-size: 0.85rem;
  font-weight: 400;
`

const ConfirmationText = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  font-weight: 400;
  padding-bottom: 2rem;
  color: #07143e;
`

const StyledForm = styled(Form)`
  & > * {
    margin-bottom: 0.5rem;
  }
`

const StyledSpan = styled.span`
  font-weight: 600;
`

const StyledWarningMessage = styled(WarningMessage)`
  background-color: #f8ba26;
  margin-bottom: 4rem;
`

type TicketVoidModalProps = {
  closeModal: () => void
  isOpen: boolean
  ticket: Ticket
}

const confirmSchema = Yup.object().shape({
  reason: Yup.string().required(STATIC_MESSAGES.VALIDATION.REQUIRED),
})

const TicketVoidModal = ({ isOpen, closeModal, ticket }: TicketVoidModalProps) => {
  const { voidTicket } = useTicketVoidMutation()
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

    setFormControls(undefined)
    closeModal()
  }

  return (
    <Modal
      key={isOpen.toString()}
      isOpen={isOpen}
      title="Void ticket"
      onRequestClose={handleClose}
    >
      <ContentContainer>
        <Formik
          initialValues={{
            reason: '',
          }}
          validateOnBlur={false}
          validateOnChange={false}
          validationSchema={confirmSchema}
          onSubmit={async values => {
            await voidTicket({ bookingRef: ticket.bookingRef, reason: values?.reason })

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
                  <span>
                    Are you sure you want to void ticket{' '}
                    <StyledSpan>{ticket.bookingRef}</StyledSpan>?
                  </span>
                </ConfirmationText>
                <TextInputField
                  required
                  label="Please specify the reason for the voiding"
                  name="reason"
                />
                <StyledWarningMessage>
                  <StyledSpan>Warning:</StyledSpan> This will reset the ticket assignment and the
                  previous ticket holder will lose access to the ticket. They will be notified by
                  email.
                </StyledWarningMessage>
                <Modal.DefaultFooter submitText="Void ticket" onCancelClick={handleClose} />
              </StyledForm>
            )
          }}
        </Formik>
      </ContentContainer>
    </Modal>
  )
}

export default TicketVoidModal
