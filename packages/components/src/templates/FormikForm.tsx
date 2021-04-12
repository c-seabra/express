import { Card } from '@material-ui/core';
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

type ModalProps = {
  children: any;
  initialValues: any;
  submitCallback: (values?: any) => void;
  submitText: string;
  validateOnBlur?: boolean;
  validateOnChange?: boolean;
  validationSchema: any;
};

const FormikForm = ({
  submitCallback,
  submitText = 'Submit',
  initialValues,
  validationSchema,
  validateOnBlur = false,
  validateOnChange = false,
  children,
}: ModalProps) => {
  return (
      <Formik
        initialValues={initialValues}
        validateOnBlur={validateOnBlur}
        validateOnChange={validateOnChange}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          submitCallback(values);
        }}
      >
        <Form>
          <Wrapper>
            {children}
            <Spacing top="48px">
              <FieldWrapper>
                <Modal.DefaultFooter submitText={submitText} />
              </FieldWrapper>
            </Spacing>
          </Wrapper>
        </Form>
      </Formik>
  );
};

export default FormikForm;
