import CheckboxField from '@websummit/components/src/molecules/CheckboxField';
import TextInputField from '@websummit/components/src/molecules/TextInputField';
import { Spacing } from '@websummit/components/src/templates/Spacing';
import { TicketQuery } from '@websummit/graphql/src/@types/operations';
import {
  extractTypeFromMaybe,
  GetQueryResult,
} from '@websummit/graphql/src/lib/types';
import { Form, Formik } from 'formik';
import React from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';

import { DisabledButton, ErrorButton } from '../../lib/components/atoms/Button';
import Icon from '../../lib/components/atoms/Icon';
import Modal from '../../lib/components/molecules/Modal';
import {
  AlertText,
  FieldWrapper,
  HeaderText,
  IconWrapper,
  StyledActionRow,
  Wrapper,
} from '../../lib/components/molecules/ReasonAlertModal';
import useAssignTicketOperation from '../../lib/hooks/useTicketAssignMutation';

const ContentContainer = styled.div`
  font-size: 0.85rem;
  font-weight: 400;
`;

const StyledRow = styled.div`
  display: flex;
  justify-content: space-between;
  min-width: 580px;
`;

const StyledInput = styled(TextInputField)`
  width: 100%;
  text-align: left;
  margin-right: 16px;

  &:last-child {
    margin-right: 0;
  }
`;

type TicketAssignModalProps = {
  closeModal: () => void;
  isOpen: boolean;
  ticket: extractTypeFromMaybe<GetQueryResult<TicketQuery, 'ticket'>>;
};

const assignSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  firstName: Yup.string().required('Required'),
  lastName: Yup.string(),
});

const confirmSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  firstName: Yup.string().required('Required'),
  lastName: Yup.string(),
  notify: Yup.boolean(),
  reason: Yup.string().required('Required'),
});

const TicketAssignModal = ({
  isOpen,
  closeModal,
  ticket,
}: TicketAssignModalProps) => {
  const isAssigned = ticket.assignment !== null;
  const assignPhrase = isAssigned ? 'reassign' : 'assign';
  const { assignTicket } = useAssignTicketOperation();
  const handleClose = () => {
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
          validationSchema={isAssigned ? confirmSchema : assignSchema}
          onSubmit={async (values) => {
            await assignTicket({ ...values, ticketId: ticket.id });

            handleClose();
          }}
        >
          {() => (
            <Form>
              <Wrapper>
                <Spacing bottom="10px">
                  <IconWrapper>
                    <Icon>error</Icon>
                  </IconWrapper>
                </Spacing>

                <HeaderText>
                  Are you sure you want to {assignPhrase} ticket
                </HeaderText>

                <Spacing bottom="40px">
                  <AlertText>{ticket.bookingRef}</AlertText>
                </Spacing>

                <StyledRow>
                  <StyledInput
                    required
                    label="First name"
                    name="firstName"
                    placeholder="John"
                  />
                  <StyledInput
                    label="Last name"
                    name="lastName"
                    placeholder="Doe"
                  />
                </StyledRow>
                <StyledRow>
                  <StyledInput
                    required
                    label="Email address"
                    name="email"
                    placeholder="john.doe@example.com"
                  />
                </StyledRow>

                {isAssigned && (
                  <>
                    <Spacing top="8px">
                      <FieldWrapper
                        required
                        label="Please specify the reason for your actions"
                        maxLength={255}
                        name="reason"
                      />
                    </Spacing>
                    <StyledRow>
                      <CheckboxField
                        color="#E15554"
                        label="Send email notification to new and old assignee"
                        name="notify"
                      />
                    </StyledRow>
                  </>
                )}

                <Spacing bottom="53px" top="24px">
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
