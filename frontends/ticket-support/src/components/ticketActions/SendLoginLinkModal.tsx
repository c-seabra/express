import TextInputField from '@websummit/components/src/molecules/TextInputField';
import { Form, Formik } from 'formik';
import React from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';

import Modal, { ModalProps } from '../../lib/components/molecules/Modal';

const SendLinkModalContent = styled.div`
  padding: 2rem 0;
  height: 50px;
  width: 450px;
  font-size: 0.85rem;
  font-weight: 400;
`;

const sendLoginLinkSchema = Yup.object().shape({
  reason: Yup.string().required('Required'),
});

type SendLoginLinkModalProps = Omit<ModalProps, 'title' | 'renderFooter'> & {
  sendLink: (reason: string) => void;
};

const SendLoginLinkModal = ({
  onRequestClose,
  sendLink,
  isOpen,
  ...props
}: SendLoginLinkModalProps) => {
  return (
    <Modal
      withDefaultFooter
      isOpen={isOpen}
      title="Send assignee login link email"
      onRequestClose={onRequestClose}
      {...props}
    >
      <SendLinkModalContent>
        <Formik
          initialValues={{
            reason: '',
          }}
          validateOnBlur={false}
          validateOnChange={false}
          validationSchema={sendLoginLinkSchema}
          onSubmit={(values) => {
            sendLink(values.reason);
            onRequestClose();
          }}
        >
          <Form>
            <TextInputField
              required
              label="Please enter a reason for this change"
              name="reason"
            />
            <Modal.DefaultFooter
              submitText="Confirm"
              onCancelClick={onRequestClose}
            />
          </Form>
        </Formik>
      </SendLinkModalContent>
    </Modal>
  );
};

export default SendLoginLinkModal;
