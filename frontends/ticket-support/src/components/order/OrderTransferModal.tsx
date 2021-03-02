import React from 'react';

import ReasonAlertModal from '../../lib/components/molecules/ReasonAlertModal';
import {
  OrderTransferRequest,
  useOrderTransferOperation,
} from '../../operations/mutations/OrderTransfer';

type OrderTransferModalProps = {
  closeModal: () => void;
  email: string;
  firstName: string;
  isOpen: boolean;
  lastName?: string;
  orderRef: string;
  refetch?: any;
};

const OrderTransferModal = ({
  isOpen,
  closeModal,
  orderRef,
  email,
  firstName,
  lastName,
  refetch,
}: OrderTransferModalProps) => {
  const { transferOrder } = useOrderTransferOperation();
  const setMutation = (e: OrderTransferRequest) => {
    console.log('transferOrder', e, email);
    return transferOrder({
      email,
      firstName,
      lastName,
      orderRef,
      reason: e.reason,
      refetch,
      sendEmailNotification: e.sendEmailNotification,
    });
  };

  return (
    <ReasonAlertModal
      isNotificationOptionVisible
      alertHeader={orderRef}
      alertText="Are you sure you want to transfer ownership of this order?"
      cancelText="No, keep order"
      checkboxLabel="Notify order owner by email?"
      closeModal={closeModal}
      headerText="Transfer ownership of order"
      isOpen={isOpen}
      mutationCallback={setMutation}
      submitText="Yes, transfer order"
    />
  );
};

export default OrderTransferModal;
