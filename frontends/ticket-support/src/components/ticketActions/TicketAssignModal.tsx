import { Form, Formik } from 'formik'
import React, { FormEvent, useState } from 'react'
import styled from 'styled-components'
import * as Yup from 'yup'

import { Button, SecondaryButton } from '../../lib/components/atoms/Button'
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

const WarningMessage = styled.div`
  border-radius: 4px;
  background-color: rgb(225, 85, 84, 0.8);
  color: #fff;
  font-size: 0.8rem;
  font-weight: 400;
  padding: 0.8rem;
  margin-bottom: 16px;
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
            reason: '',
          }}
          validateOnBlur={false}
          validateOnChange={false}
          validationSchema={isFirstStepFilled ? confirmSchema : assignSchema}
          onSubmit={async values => {
            if (isFirstStepFilled) {
              await assignTicket({ ...values, notify: true, ticketId: ticket.id })

              handleClose()
            }

            setFirstStepFilled(true)
          }}
        >
          {({ submitForm, resetForm }) => {
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
                    <WarningMessage>
                      Email notifications will be sent to the new assignee, old assignee, and order
                      owner
                    </WarningMessage>
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
