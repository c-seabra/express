import { Form, Formik } from 'formik'
import React, { FormEvent, useState } from 'react'
import styled from 'styled-components'
import * as Yup from 'yup'

import { WarningMessage } from '../../lib/components/atoms/Messages'
import Modal from '../../lib/components/molecules/Modal'
import TextInputField from '../../lib/components/molecules/TextInputField'
import STATIC_MESSAGES from '../../lib/constants/messages'
import { Ticket } from '../../lib/types'
import { useTicketUnvoidMutation } from '../../operations/mutations/TicketUnvoid'

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

type TicketUnvoidModalProps = {
  closeModal: () => void
  isOpen: boolean
  ticket: Ticket
}

const confirmSchema = Yup.object().shape({
  reason: Yup.string().required(STATIC_MESSAGES.VALIDATION.REQUIRED),
})

const TicketUnvoidModal = ({ isOpen, closeModal, ticket }: TicketUnvoidModalProps) => {
  const { unvoidTicket } = useTicketUnvoidMutation()
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
    <Modal key={isOpen.toString()} isOpen={isOpen} title="Unvoid ticket" onRequestClose={handleClose}>
      <ContentContainer>
        <Formik
          initialValues={{
            reason: '',
          }}
          validateOnBlur={false}
          validateOnChange={false}
          validationSchema={confirmSchema}
          onSubmit={async values => {
            await unvoidTicket({ bookingRef: ticket.bookingRef, reason: values?.reason })

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
                    Are you sure you want to unvoid ticket{' '}
                    <StyledSpan>{ticket.bookingRef}</StyledSpan>?
                  </span>
                </ConfirmationText>
                <TextInputField
                  required
                  label="Please specify the reason for the unvoiding"
                  name="reason"
                />
                <StyledWarningMessage>
                  <StyledSpan>Warning:</StyledSpan> This action shall void the ticket and ticket
                  holder will no longer have access to the conference.
                </StyledWarningMessage>
                <Modal.DefaultFooter submitText="Unvoid ticket" onCancelClick={handleClose} />
              </StyledForm>
            )
          }}
        </Formik>
      </ContentContainer>
    </Modal>
  )
}

export default TicketUnvoidModal
