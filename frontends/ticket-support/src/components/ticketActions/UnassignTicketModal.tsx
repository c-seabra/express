import { Form, Formik } from 'formik';
import React from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';

import { WarningMessage } from '../../lib/components/atoms/Messages';
import CheckboxField from '../../lib/components/molecules/CheckboxField';
import Modal, { ModalProps } from '../../lib/components/molecules/Modal';
import TextInputField from '../../lib/components/molecules/TextInputField';
import useUnassignTicketMutation from '../../lib/hooks/useUnassignTicketMutation';
import { Ticket } from '../../lib/types';

const StyledForm = styled(Form)`
  width: 450px;
  padding: 1rem 0;
`;
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
`;

type UnassignTicketModalProps = Pick<
  ModalProps,
  'isOpen' | 'onRequestClose'
> & {
  ticket: Ticket;
};

const claimTicketSchema = Yup.object().shape({
  notify: Yup.boolean(),
  reason: Yup.string().required('Required'),
});

const UnassignTicketModal = ({
  ticket,
  isOpen,
  onRequestClose,
}: UnassignTicketModalProps) => {
  const { unassignTicket } = useUnassignTicketMutation({ ticketId: ticket.id });

  return (
    <Modal
      withDefaultFooter
      isOpen={isOpen}
      title="Unassign ticket"
      onRequestClose={onRequestClose}
    >
      <Formik
        initialValues={{
          notify: false,
          reason: '',
        }}
        validateOnBlur={false}
        validateOnChange={false}
        validationSchema={claimTicketSchema}
        onSubmit={async ({ reason, notify }, { resetForm }) => {
          await unassignTicket(reason, notify);
          resetForm();
          onRequestClose();
        }}
      >
        <StyledForm>
          <ConfirmationText>
            Are you sure you want to&nbsp;<span>unassign</span>
            &nbsp;ticket&nbsp;
            <span>{ticket.bookingRef}</span>?
          </ConfirmationText>
          <TextInputField
            required
            label="Please enter a reason for this change"
            name="reason"
          />
          <CheckboxField
            label="Send email notification to assignee"
            name="notify"
          />
          <WarningMessage>
            This will reset the ticket assignment and the previous ticket holder
            will lose access to the ticket. They will be notified by email.
          </WarningMessage>
          <Modal.DefaultFooter
            submitText="Confirm"
            onCancelClick={onRequestClose}
          />
        </StyledForm>
      </Formik>
    </Modal>
  );
};

export default UnassignTicketModal;
