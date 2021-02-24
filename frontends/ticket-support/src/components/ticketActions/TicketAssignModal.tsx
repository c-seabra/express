import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';

import { WarningMessage } from '../../lib/components/atoms/Messages';
import CheckboxField from '../../lib/components/molecules/CheckboxField';
import Modal from '../../lib/components/molecules/Modal';
import TextInputField from '../../lib/components/molecules/TextInputField';
import useAssignTicketMutation from '../../lib/hooks/useTicketAssignMutation';
import { Ticket } from '../../lib/types';

const ContentContainer = styled.div`
  padding: 2rem 0;
  width: 450px;
  font-size: 0.85rem;
  font-weight: 400;
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

const StyledForm = styled(Form)`
  & > * {
    margin-bottom: 0.5rem;
  }
`;

type TicketAssignModalProps = {
  closeModal: () => void;
  isOpen: boolean;
  ticket: Ticket;
};

const assignSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  firstName: Yup.string().required('Required'),
  lastName: Yup.string(),
});

const confirmSchema = Yup.object().shape({
  notify: Yup.boolean(),
  reason: Yup.string().required('Required'),
});

const TicketAssignModal = ({
  isOpen,
  closeModal,
  ticket,
}: TicketAssignModalProps) => {
  const isAssigned = ticket.assignment !== null;
  console.log(isAssigned)
  const { assignTicket } = useAssignTicketMutation();
  const [isFirstStepFilled, setFirstStepFilled] = useState(false);

  const handleClose = () => {
    setFirstStepFilled(false);

    closeModal();
  };

  return (
    <Modal
      key={isOpen.toString()}
      withDefaultFooter
      isOpen={isOpen}
      title={ isAssigned ? 'Reassign ticket' : 'Assign ticket'}
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
          onSubmit={async (values) => {
            if (isFirstStepFilled) {
              await assignTicket({ ...values, ticketId: ticket.id });

              handleClose();
            } else {
              setFirstStepFilled(true);
            }
          }}
        >
          {({ values }) => (
            <StyledForm>
              {isFirstStepFilled ? (
                <>
                  <ConfirmationText>
                    Are you sure you want to&nbsp;<span>{ isAssigned ? 'reassign' : 'assign'}</span>
                    &nbsp;ticket&nbsp;
                    <span>{ticket.bookingRef}</span>?
                  </ConfirmationText>
                  <TextInputField
                    required
                    label="Specify a reason for the reassignment"
                    name="reason"
                  />
                  <CheckboxField
                    label="Send email notification to new and old assignee"
                    name="notify"
                  />
                  {values.notify && (
                    <WarningMessage>
                      Email notifications will be sent to the new assignee, old
                      assignee, and order owner
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
                  <TextInputField
                    label="Last name"
                    name="lastName"
                    placeholder="Doe"
                  />
                  <TextInputField
                    required
                    label="Email"
                    name="email"
                    placeholder="john.doe@example.com"
                  />
                </>
              )}
              <Modal.DefaultFooter
                submitText={isFirstStepFilled ? 'Confirm' : 'Reassign ticket'}
                onCancelClick={handleClose}
              />
            </StyledForm>
          )}
        </Formik>
      </ContentContainer>
    </Modal>
  );
};

export default TicketAssignModal;
