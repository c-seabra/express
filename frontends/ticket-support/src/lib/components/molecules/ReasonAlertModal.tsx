import CheckboxField from '@websummit/components/src/molecules/CheckboxField';
import TextAreaField from '@websummit/components/src/molecules/TextAreaField';
import { Form, Formik } from 'formik';
import React, { FormEvent, useState } from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';

import STATIC_MESSAGES from '../../constants/messages';
import { DisabledButton, ErrorButton } from '../atoms/Button';
import Icon from '../atoms/Icon';
import { Spacing } from '../templates/Spacing';
import Modal from './Modal';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 0 0;
  font-size: 0.85rem;
  font-weight: 400;
  min-width: 640px;
`;

export const Text = styled.div`
  font-size: 14px;
  letter-spacing: 0;
  line-height: 28px;
  max-width: 580px;
  text-align: left;
`;

export const HeaderText = styled.div`
  font-size: 26px;
  font-weight: 500;
  letter-spacing: -0.5px;
  line-height: 40px;
`;

export const AlertText = styled(HeaderText)`
  color: #e15554;
`;

export const FieldWrapper = styled(TextAreaField)`
  min-width: 580px;
  text-align: left;
  padding: 0;

  textarea {
    height: 77px;
  }
`;

const StyledRow = styled.div`
  display: flex;
  min-width: 590px;
`;

export const StyledActionRow = styled.div`
  display: flex;
  justify-content: space-around;

  > * {
    margin-right: 32px;
    &:last-child {
      margin-right: 0;
    }
  }
`;

export const IconWrapper = styled.div`
  > .material-icons {
    font-size: 36px;
    color: #e15554;
  }
`;

type ReasonAlertModalProps = {
  alertHeader: string;
  alertText: string;
  cancelText: string;
  checkboxLabel?: string;
  closeModal: () => void;
  headerText: string;
  isNotificationOptionVisible?: boolean;
  isOpen: boolean;
  mutationCallback: (values?: any) => Promise<void>;
  submitText: string;
};

const confirmSchema = Yup.object().shape({
  reason: Yup.string().required(STATIC_MESSAGES.VALIDATION.REQUIRED),
  sendEmailNotification: Yup.boolean(),
});

const ReasonAlertModal = ({
  isOpen,
  closeModal,
  cancelText,
  headerText,
  alertText,
  alertHeader,
  checkboxLabel,
  mutationCallback,
  isNotificationOptionVisible,
  submitText = 'Submit',
}: ReasonAlertModalProps) => {
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
    <Modal key={isOpen.toString()} isOpen={isOpen} onRequestClose={handleClose}>
      <Formik
        initialValues={{
          reason: '',
          sendEmailNotification: false,
        }}
        validateOnBlur={false}
        validateOnChange={false}
        validationSchema={confirmSchema}
        onSubmit={async (values) => {
          await mutationCallback(values);

          handleClose();
        }}
      >
        {({ submitForm, resetForm }) => {
          // Binding submit form to submit programmatically from outside the <Formik> component
          if (!formControls) {
            setFormControls({ boundReset: resetForm, boundSubmit: submitForm });
          }

          return (
            <Form>
              <Wrapper>
                <Spacing bottom="10px">
                  <IconWrapper>
                    <Icon>error</Icon>
                  </IconWrapper>
                </Spacing>

                <HeaderText>{headerText}</HeaderText>

                <Spacing bottom="40px">
                  <AlertText>{alertHeader}</AlertText>
                </Spacing>

                <Spacing bottom="40px" top="24px">
                  <Text>{alertText}</Text>
                </Spacing>

                <Spacing top="8px">
                  <FieldWrapper
                    required
                    label="Please specify the reason for your actions"
                    maxLength={255}
                    name="reason"
                  />
                </Spacing>

                {isNotificationOptionVisible && (
                  <Spacing bottom="66px">
                    <StyledRow>
                      <CheckboxField
                        color="#E15554"
                        label={checkboxLabel}
                        name="sendEmailNotification"
                      />
                    </StyledRow>
                  </Spacing>
                )}

                <Spacing bottom="50px">
                  <StyledActionRow>
                    <DisabledButton onClick={closeModal}>
                      {cancelText}
                    </DisabledButton>
                    <ErrorButton type="submit">{submitText}</ErrorButton>
                  </StyledActionRow>
                </Spacing>
              </Wrapper>
            </Form>
          );
        }}
      </Formik>
    </Modal>
  );
};

export default ReasonAlertModal;
