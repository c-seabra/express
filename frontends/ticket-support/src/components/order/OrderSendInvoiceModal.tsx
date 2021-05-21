import FormikModal from '@websummit/components/src/molecules/FormikModal';
import React from 'react';

type Props = {
  closeModal: () => void;
  isOpen: boolean;
  sendEmail: () => void;
};

const OrderSendInvoiceModal = ({ isOpen, closeModal, sendEmail }: Props) => {
  const setMutation = () => {
    sendEmail();
  };

  return (
    <FormikModal
      alertHeader="Send email with invoice?"
      closeModal={closeModal}
      initialValues={{}}
      isOpen={isOpen}
      submitCallback={setMutation}
      submitText="Send email"
      validationSchema={null}
    />
  );
};

export default OrderSendInvoiceModal;
