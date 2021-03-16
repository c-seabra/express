import TextInputField from '@websummit/components/src/molecules/TextInputField';
import { SpacingBottom } from '@websummit/components/src/templates/Spacing';
import { Form, Formik } from 'formik';
import React, { FormEvent, useState } from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';

import BoxMessage from '../../lib/components/molecules/BoxMessage';
import Modal from '../../lib/components/molecules/Modal';
import STATIC_MESSAGES from '../../lib/constants/messages';
import useUpdateUniqueUserIdentifierMutation from '../../lib/hooks/useUpdateUniqueUserIdentifier';

const ContentContainer = styled.div`
  padding: 2rem 0;
  width: 450px;
  font-size: 0.85rem;
  font-weight: 400;
  min-width: 600px;
`;

const ConfirmationText = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  font-weight: 400;
  padding-bottom: 2rem;
  color: #07143e;
`;

const StyledForm = styled(Form)`
  & > * {
    margin-bottom: 0.5rem;
  }
`;

type UserIdentifierModalProps = {
  accountId: string;
  closeModal: () => void;
  email: string;
  isOpen: boolean;
};

const confirmSchema = Yup.object().shape({
  reason: Yup.string().required(STATIC_MESSAGES.VALIDATION.REQUIRED),
});

const UpdateUniqueUserIdentifierModal = ({
  isOpen,
  closeModal,
  email,
  accountId,
}: UserIdentifierModalProps) => {
  const {
    updateUniqueUserIdentifier,
  } = useUpdateUniqueUserIdentifierMutation();
  const [formControls, setFormControls] = useState<
    | {
        boundReset?: () => void;
        boundSubmit?: (event?: FormEvent) => void;
      }
    | undefined
  >();

  const handleClose = () => {
    if (formControls?.boundReset) {
      formControls.boundReset();
    }

    setFormControls(undefined);
    closeModal();
  };

  return (
    <Modal
      key={isOpen.toString()}
      isOpen={isOpen}
      title="Update unique user identifier"
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
          onSubmit={async (values) => {
            await updateUniqueUserIdentifier({
              accountId,
              email,
              reason: values?.reason,
            });

            handleClose();
          }}
        >
          {({ submitForm, resetForm }) => {
            // Binding submit form to submit programmatically from outside the <Formik> component
            if (!formControls) {
              setFormControls({
                boundReset: resetForm,
                boundSubmit: submitForm,
              });
            }

            return (
              <SpacingBottom>
                <StyledForm>
                  <ConfirmationText>
                    <span>
                      Are you sure you want to change the unique user
                      identifier?
                    </span>
                  </ConfirmationText>
                  <TextInputField
                    required
                    label="Specify a reason for updating this email"
                    name="reason"
                  />
                  <BoxMessage
                    backgroundColor="#F7F7F7"
                    color="#E15554"
                    type="error"
                  >
                    <>
                      This email is used as an user account email (unique user
                      identifier). Changing this field will impact their profile
                      data, calendar events and any associated event related
                      associations. Going forward logging into Ticket Dashboard
                      will use this new user account email.
                      <br />
                      This change will however not impact the App login email
                      which is used to log into our conference apps.{' '}
                    </>
                  </BoxMessage>
                  <Modal.DefaultFooter
                    submitText="Update unique user identifier"
                    onCancelClick={handleClose}
                  />
                </StyledForm>
              </SpacingBottom>
            );
          }}
        </Formik>
      </ContentContainer>
    </Modal>
  );
};

export default UpdateUniqueUserIdentifierModal;
