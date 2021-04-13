import { Form, Formik } from 'formik';
import React from 'react';
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 0;
  font-size: 0.85rem;
  font-weight: 400;
`;

type ModalProps = {
  children: any;
  initialValues: any;
  submitCallback: (values?: any) => void;
  validateOnBlur?: boolean;
  validateOnChange?: boolean;
  validationSchema: any;
};

const FormikForm = ({
  submitCallback,
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
        <Wrapper>{children}</Wrapper>
      </Form>
    </Formik>
  );
};

export default FormikForm;
