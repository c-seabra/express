import FormikModal from '@websummit/components/src/molecules/FormikModal';
import React from 'react';

type Props = {
  alertText: string;
  closeModal: () => void;
  isOpen: boolean;
  sendEmail: () => void;
};

const OrderSendDocumentModal = ({
  isOpen,
  alertText,
  closeModal,
  sendEmail,
}: Props) => {
  const setMutation = () => {
    sendEmail();
  };

  return (
    <FormikModal
      alertHeader={alertText}
      closeModal={closeModal}
      initialValues={{}}
      isOpen={isOpen}
      submitCallback={setMutation}
      submitText="Send email"
      validationSchema={null}
    />
  );
};

export default OrderSendDocumentModal;
