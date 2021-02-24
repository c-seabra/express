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
import { Spacing } from '../templates/Spacing';
import Icon from '../../lib/components/atoms/Icon';
import { DisabledButton, ErrorButton } from '../../lib/components/atoms/Button';
import {
  AlertText,
  FieldWrapper,
  HeaderText,
  IconWrapper,
  StyledActionRow,
  Text,
  Wrapper,
} from '../../lib/components/molecules/ReasonAlertModal';

const ContentContainer = styled.div`
  padding: 2rem 0;
  width: 450px;
  font-size: 0.85rem;
  font-weight: 400;
`;

const StyledRow = styled.div`
  display: flex;
  justify-content: space-between;
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
  const { assignTicket } = useAssignTicketMutation();
  const [isFirstStepFilled, setFirstStepFilled] = useState(false);

  const handleClose = () => {
    setFirstStepFilled(false);

    closeModal();
  };

  return (
    <Modal key={isOpen.toString()} isOpen={isOpen} onRequestClose={handleClose}>
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
            await assignTicket({ ...values, ticketId: ticket.id });

            handleClose();
          }}
        >
          {({ values }) => (
            <Form>
              <Wrapper>
                <Spacing bottom="10px">
                  <IconWrapper>
                    <Icon>error</Icon>
                  </IconWrapper>
                </Spacing>

                <HeaderText>Are you sure you want to assign ticket</HeaderText>

                <Spacing bottom="40px">
                  <AlertText>{ticket.bookingRef}</AlertText>
                </Spacing>

                <Spacing bottom="24px">
                  <StyledRow>
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
                  </StyledRow>
                  <StyledRow>
                    <TextInputField
                      required
                      label="Email address"
                      name="email"
                      placeholder="john.doe@example.com"
                    />
                  </StyledRow>
                </Spacing>

                <Spacing bottom="40px" top="24px">
                  {isAssigned ? (
                    <Text>
                      Email notifications will be sent to the new assignee, old
                      assignee, and order owner
                    </Text>
                  ) : (
                    <Text>
                      Email notifications will be sent to the new assignee and
                      order owner
                    </Text>
                  )}
                </Spacing>

                {isAssigned && (
                  <>
                    <Spacing bottom="8px" top="8px">
                      <FieldWrapper
                        required
                        label="Please specify the reason for your actions"
                        maxLength={255}
                        name="reason"
                      />
                    </Spacing>
                    <CheckboxField
                      label="Send email notification to new and old assignee"
                      name="notify"
                    />
                  </>
                )}

                <Spacing bottom="50px">
                  <StyledActionRow>
                    <DisabledButton onClick={closeModal}>Cancel</DisabledButton>
                    <ErrorButton type="submit">Confirm</ErrorButton>
                  </StyledActionRow>
                </Spacing>
              </Wrapper>
            </Form>
          )}
        </Formik>
      </ContentContainer>
    </Modal>
  );
};

export default TicketAssignModal;
