import { SpacingBottom } from '@websummit/components/src/templates/Spacing';
import TextInputField from '@websummit/components/src/molecules/TextInputField';
import { Form, Formik } from 'formik';
import React, { FormEvent, useState } from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';

import BoxMessage from '../../lib/components/molecules/BoxMessage';
import Modal from '../../lib/components/molecules/Modal';
import STATIC_MESSAGES from '../../lib/constants/messages';
import useUpdateLoginMutation from '../../lib/hooks/useUpdateAppLoginEmail';

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

type AppLoginEmailModalProps = {
  bookingRef: string;
  closeModal: () => void;
  email: string;
  isOpen: boolean;
};

const confirmSchema = Yup.object().shape({
  reason: Yup.string().required(STATIC_MESSAGES.VALIDATION.REQUIRED),
});

const UpdateAppLoginEmailModal = ({
  isOpen,
  closeModal,
  email,
  bookingRef,
}: AppLoginEmailModalProps) => {
  const { updateLogin } = useUpdateLoginMutation();
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
      title="Update app login email"
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
            await updateLogin({
              bookingRef,
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
                      Are you sure you want to change app login email?
                    </span>
                  </ConfirmationText>
                  <TextInputField
                    required
                    label="Specify a reason for updating email"
                    name="reason"
                  />
                  <BoxMessage
                    backgroundColor="#F7F7F7"
                    color="#E15554"
                    type="error"
                  >
                    <>
                      This email will be used to login to apps and for further
                      conference specific communications
                      <br />
                      Change this only if you know how it&apos;s going to
                      reflect our systems!
                    </>
                  </BoxMessage>
                  <Modal.DefaultFooter
                    submitText="Update app login"
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

export default UpdateAppLoginEmailModal;
