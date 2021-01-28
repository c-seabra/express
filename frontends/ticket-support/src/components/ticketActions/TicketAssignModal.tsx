import { Form, Formik } from 'formik'
import React, { FormEvent, useState } from 'react'
import styled from 'styled-components'
import * as Yup from 'yup'

import { Button, SecondaryButton } from '../../lib/components/atoms/Button'
import { WarningMessage } from '../../lib/components/atoms/Messages'
import CheckboxField from '../../lib/components/molecules/CheckboxField'
import Modal from '../../lib/components/molecules/Modal'
import TextInputField from '../../lib/components/molecules/TextInputField'
import useAssignTicketMutation from '../../lib/hooks/useTicketAssignMutation'
import { Ticket } from '../../lib/types'

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
`

const StyledSecondaryButton = styled(SecondaryButton)`
  margin-right: 8px;
`

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

type TicketAssignModalProps = {
  closeModal: () => void
  isOpen: boolean
  ticket: Ticket
}

const assignSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  firstName: Yup.string().required('Required'),
  lastName: Yup.string(),
})

const confirmSchema = Yup.object().shape({
  notify: Yup.boolean().required('Required'),
  reason: Yup.string().required('Required'),
})

const TicketAssignModal = ({ isOpen, closeModal, ticket }: TicketAssignModalProps) => {
  const { assignTicket } = useAssignTicketMutation()
  const [isFirstStepFilled, setFirstStepFilled] = useState(false)
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

    setFirstStepFilled(false)
    setFormControls(undefined)

    closeModal()
  }

  const renderTicketAssignFooter = () => (
    <ModalFooter>
      <StyledSecondaryButton onClick={handleClose}>Cancel</StyledSecondaryButton>
      <Button onClick={formControls?.boundSubmit}>Reassign ticket</Button>
    </ModalFooter>
  )

  const renderConfirmAssignFooter = () => (
    <ModalFooter>
      <StyledSecondaryButton onClick={handleClose}>Cancel</StyledSecondaryButton>
      <Button
        onClick={() => {
          if (formControls?.boundSubmit && formControls?.boundReset) {
            formControls.boundSubmit()
          }
        }}
      >
        Confirm
      </Button>
    </ModalFooter>
  )

  return (
    <Modal
      key={isOpen.toString()}
      isOpen={isOpen}
      renderFooter={isFirstStepFilled ? renderConfirmAssignFooter : renderTicketAssignFooter}
      title="Reassign ticket"
      onRequestClose={handleClose}
    >
      <ContentContainer>
        <Formik
          initialValues={{
            email: '',
            firstName: '',
            lastName: '',
            notify: false,
            reason: '',
          }}
          validateOnBlur={false}
          validateOnChange={false}
          validationSchema={isFirstStepFilled ? confirmSchema : assignSchema}
          onSubmit={async values => {
            if (isFirstStepFilled) {
              await assignTicket({ ...values, ticketId: ticket.id })

              handleClose()
            } else {
              setFirstStepFilled(true)
            }
          }}
        >
          {({ submitForm, resetForm, values }) => {
            // Binding submit form to submit programmatically from outside the <Formik> component
            if (!formControls) {
              setFormControls({ boundReset: resetForm, boundSubmit: submitForm })
            }

            return (
              <StyledForm>
                {isFirstStepFilled ? (
                  <>
                    <ConfirmationText>
                      Are you sure you want to reassign ticket {ticket.bookingRef}?
                    </ConfirmationText>
                    <TextInputField
                      required
                      label="Specify a reason for the reassignment"
                      name="reason"
                    />
                    <CheckboxField
                      required
                      label="Send email notification to new and old assignee"
                      name="notify"
                    />
                    {values.notify && (
                      <WarningMessage>
                        Email notifications will be sent to the new assignee, old assignee, and
                        order owner
                      </WarningMessage>
                    )}
                  </>
                ) : (
                  <>
                    <TextInputField
                      required
                      label="First name"
                      name="firstName"
                      placeholder="John"
                    />
                    <TextInputField label="Last name" name="lastName" placeholder="Doe" />
                    <TextInputField
                      required
                      label="Email"
                      name="email"
                      placeholder="john.doe@example.com"
                    />
                  </>
                )}
              </StyledForm>
            )
          }}
        </Formik>
      </ContentContainer>
    </Modal>
  )
}

export default TicketAssignModal
