import React from 'react';

import ReasonAlertModal from '../../lib/components/molecules/ReasonAlertModal';
import {
  OrderCancelRequest,
  useOrderCancelOperation,
} from '../../operations/mutations/OrderCancel';

type OrderCancelModalProps = {
  closeModal: () => void;
  isOpen: boolean;
  orderRef: string;
  refetch?: any;
  sourceId: string;
};

const OrderCancelModal = ({
  isOpen,
  closeModal,
  orderRef,
  sourceId,
  refetch,
}: OrderCancelModalProps) => {
  const { cancelOrder } = useOrderCancelOperation();
  const setMutation = (e: OrderCancelRequest) => {
    return cancelOrder({
      id: sourceId,
      reason: e.reason,
      refetch,
      sendEmailNotification: e.sendEmailNotification,
    });
  };

  return (
    <ReasonAlertModal
      isNotificationOptionVisible
      alertHeader={orderRef}
      alertText="Are you sure you want to cancel this order? Cancellation will void all associated tickets."
      cancelText="No, keep order"
      checkboxLabel="Notify previous order holder by email?"
      closeModal={closeModal}
      headerText="Cancellation of Order"
      isOpen={isOpen}
      mutationCallback={setMutation}
      submitText="Yes, cancel order"
    />
  );
};

export default OrderCancelModal;
