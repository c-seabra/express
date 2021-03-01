import React from 'react';

import ReasonAlertModal from '../../lib/components/molecules/ReasonAlertModal';
import {
  OrderReinstateRequest,
  useOrderReinstateMutation,
} from '../../operations/mutations/OrderReinstate';

type OrderReinstateModalProps = {
  closeModal: () => void;
  isOpen: boolean;
  orderRef: string;
  refetch?: any;
  sourceId: string;
};

const OrderReinstateModal = ({
  isOpen,
  closeModal,
  orderRef,
  sourceId,
  refetch,
}: OrderReinstateModalProps) => {
  const { reinstateOrder } = useOrderReinstateMutation();
  const setMutation = (e: OrderReinstateRequest) => {
    return reinstateOrder({
      id: sourceId,
      reason: e.reason,
      refetch,
      sendEmailNotification: e.sendEmailNotification,
    });
  };

  return (
    <ReasonAlertModal
      isNotificationOptionVisible
      alertHeader={`${orderRef}`}
      alertText="This action will reinstate the order and un-void the tickets under it.  Do you want to proceed with this action?"
      cancelText="No, keep order"
      checkboxLabel="Notify order owner by email?"
      closeModal={closeModal}
      headerText="Are you sure you want to reinstate order"
      isOpen={isOpen}
      mutationCallback={setMutation}
      submitText="Yes, reinstate order"
    />
  );
};

export default OrderReinstateModal;
