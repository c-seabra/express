import { Form, Formik } from 'formik'
import React from 'react'
import styled from 'styled-components'
import * as Yup from 'yup'

import Modal, { ModalProps } from '../../lib/components/molecules/Modal'
import TextInputField from '../../lib/components/molecules/TextInputField'
import useClaimTicketMutation from '../../lib/hooks/useClaimTicketMutation'
import { Ticket } from '../../lib/types'

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

  return (
    <Modal withDefaultFooter isOpen={isOpen} title="Claim ticket" onRequestClose={onRequestClose}>
      <Formik
        initialValues={{
          reason: '',
        }}
        validateOnBlur={false}
        validateOnChange={false}
        validationSchema={claimTicketSchema}
        onSubmit={async ({ reason }, { resetForm }) => {
          await claimTicket(reason)
          resetForm()
        }}
      >
        <StyledForm>
          <ConfirmationText>
            Are you sure you want to&nbsp;<span>claim</span>&nbsp;ticket&nbsp;
            <span>{ticket.bookingRef}</span>?
          </ConfirmationText>
          <TextInputField required label="Please enter a reason for this change" name="reason" />
          <Modal.DefaultFooter submitText="Claim ticket" onCancelClick={onRequestClose} />
        </StyledForm>
      </Formik>
    </Modal>
  )
}

export default ClaimTicketModal
