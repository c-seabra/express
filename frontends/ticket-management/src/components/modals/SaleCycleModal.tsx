import Icon from '@websummit/components/src/atoms/Icon';
import Modal from '@websummit/components/src/molecules/Modal';
import TextAreaField from '@websummit/components/src/molecules/TextAreaField';
import TextInputField from '@websummit/components/src/molecules/TextInputField';
import { Spacing } from '@websummit/components/src/templates/Spacing';
import { Form, Formik } from 'formik';
import React from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';

import STATIC_MESSAGES from '../../../../ticket-support/src/lib/constants/messages';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 0 0;
  font-size: 0.85rem;
  font-weight: 400;
  min-width: 600px;
`;

export const Text = styled.div`
  font-size: 14px;
  letter-spacing: 0;
  line-height: 28px;
  max-width: 580px;
  text-align: left;
`;

export const HeaderText = styled.div`
  color: #0067e9;
  font-size: 32px;
  font-weight: 500;
  letter-spacing: -0.5px;
  line-height: 40px;
`;

export const FieldWrapper = styled.div`
  min-width: 580px;
  text-align: left;
  padding: 0;
`;

export const IconWrapper = styled.div`
  > .material-icons {
    font-size: 40px;
    color: #0067e9;
  }
`;

const StyledInputField = styled(TextInputField)`
  width: 48%;
`;

type ModalProps = {
  alertHeader: string;
  closeModal: () => void;
  initialValues?: any;
  isOpen: boolean;
  submitCallback: (values?: any) => void;
  submitText: string;
};

const confirmSchema = Yup.object().shape({
  description: Yup.string(),
  endDate: Yup.date().required(STATIC_MESSAGES.VALIDATION.REQUIRED),
  name: Yup.string().required(STATIC_MESSAGES.VALIDATION.REQUIRED),
  startDate: Yup.date().required(STATIC_MESSAGES.VALIDATION.REQUIRED),
});

const SaleCycleModal = ({
  isOpen,
  closeModal,
  alertHeader,
  submitCallback,
  submitText = 'Submit',
  initialValues,
}: ModalProps) => {

  return (
    <Modal key={isOpen.toString()} isOpen={isOpen} onRequestClose={closeModal}>
      <Formik
        initialValues={initialValues}
        validateOnBlur={false}
        validateOnChange={false}
        validationSchema={confirmSchema}
        onSubmit={(values) => {
          submitCallback(values);

          closeModal();
        }}
      >
        {() => {
          return (
            <Form>
              <Wrapper>
                <Spacing bottom="10px">
                  <IconWrapper>
                    <Icon>info</Icon>
                  </IconWrapper>
                </Spacing>

                <Spacing bottom="40px">
                  <HeaderText>{alertHeader}</HeaderText>
                </Spacing>

                <Spacing top="8px">
                  <FieldWrapper>
                    <Spacing bottom="8px">
                      <TextInputField
                        required
                        label="Sale cycle name"
                        name="name"
                      />
                    </Spacing>
                  </FieldWrapper>

                  <FieldWrapper>
                    <StyledInputField
                      required
                      label="Start date"
                      name="startDate"
                      type="date"
                    />

                    <StyledInputField
                      required
                      label="End date"
                      name="endDate"
                      type="date"
                    />
                  </FieldWrapper>

                  <FieldWrapper>
                    <Spacing bottom="8px">
                      <TextAreaField
                        fieldHeight="80px"
                        label="Sale cycle description"
                        name="description"
                      />
                    </Spacing>
                  </FieldWrapper>
                </Spacing>

                <FieldWrapper>
                  <Modal.DefaultFooter
                    submitText={submitText}
                    onCancelClick={closeModal}
                  />
                </FieldWrapper>
              </Wrapper>
            </Form>
          );
        }}
      </Formik>
    </Modal>
  );
};

export default SaleCycleModal;
