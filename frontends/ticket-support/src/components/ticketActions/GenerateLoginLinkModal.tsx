import TextInputField from '@websummit/components/src/molecules/TextInputField';
import { Form, Formik } from 'formik';
import React from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';

import { InfoMessage } from '../../lib/components/atoms/Messages';
import Modal, { ModalProps } from '../../lib/components/molecules/Modal';

const StyledForm = styled(Form)`
  width: 450px;
  padding: 1rem 0;
`;

const generateLinkSchema = Yup.object().shape({
  reason: Yup.string().required('Required'),
});

type GenerateLoginLinkModalProps = Pick<
  ModalProps,
  'isOpen' | 'onRequestClose'
> & {
  generateLink: (reason: string) => void;
};

const GenerateLoginLinkModal = ({
  isOpen,
  onRequestClose,
  generateLink,
}: GenerateLoginLinkModalProps) => {
  return (
    <Modal
      withDefaultFooter
      isOpen={isOpen}
      title="Generate login link"
      onRequestClose={onRequestClose}
    >
      <Formik
        initialValues={{
          reason: '',
        }}
        validateOnBlur={false}
        validateOnChange={false}
        validationSchema={generateLinkSchema}
        onSubmit={(values) => {
          generateLink(values.reason);
          onRequestClose();
        }}
      >
        <StyledForm>
          <TextInputField
            required
            label="Please enter a reason for this change"
            name="reason"
          />
          <InfoMessage>
            The generated link can be copied by hovering over the
            &quot;Generated Login Link&quot; text.
          </InfoMessage>
          <Modal.DefaultFooter submitText="Generate" />
        </StyledForm>
      </Formik>
    </Modal>
  );
};

export default GenerateLoginLinkModal;
