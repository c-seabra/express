import Icon from '@websummit/components/src/atoms/Icon';
import Modal from '@websummit/components/src/molecules/Modal';
import { Spacing } from '@websummit/components/src/templates/Spacing';
import { Form, Formik } from 'formik';
import React from 'react';
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 0;
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

type ModalProps = {
  alertHeader: string;
  children: any;
  closeModal: () => void;
  initialValues: any;
  isOpen: boolean;
  submitCallback: (values?: any) => void;
  submitText: string;
  validateOnBlur?: boolean;
  validateOnChange?: boolean;
  validationSchema: any;
};

const FormikModal = ({
  isOpen,
  closeModal,
  alertHeader,
  submitCallback,
  submitText = 'Submit',
  initialValues,
  validationSchema,
  validateOnBlur = false,
  validateOnChange = false,

  children,
}: ModalProps) => {
  return (
    <Modal key={isOpen.toString()} isOpen={isOpen} onRequestClose={closeModal}>
      <Formik
        initialValues={initialValues}
        validateOnBlur={validateOnBlur}
        validateOnChange={validateOnChange}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          submitCallback(values);

          closeModal();
        }}
      >
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

            {children}

            <Spacing top="48px">
              <FieldWrapper>
                <Modal.DefaultFooter
                  submitText={submitText}
                  onCancelClick={closeModal}
                />
              </FieldWrapper>
            </Spacing>
          </Wrapper>
        </Form>
      </Formik>
    </Modal>
  );
};

export default FormikModal;
