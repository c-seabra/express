import React from 'react';

import ReasonAlertModal from '../../lib/components/molecules/ReasonAlertModal';
import {
  OrderUpdateOwnerRequest,
  useOrderUpdateOwnerOperation,
} from '../../operations/mutations/OrderUpdateOwner';

type OrderUpdateOwnerDetailsModalProps = {
  accountId: string;
  closeModal: () => void;
  firstName: string;
  isOpen: boolean;
  lastName?: string;
  orderRef: string;
  refetch?: any;
};

const OrderUpdateOwnerDetailsModal = ({
  accountId,
  isOpen,
  closeModal,
  orderRef,
  firstName,
  lastName,
  refetch,
}: OrderUpdateOwnerDetailsModalProps) => {
  const { updateOwnerOrder } = useOrderUpdateOwnerOperation();
  const setMutation = (e: OrderUpdateOwnerRequest) => {
    return updateOwnerOrder({
      accountId,
      firstName,
      lastName,
      reason: e.reason,
      refetch,
      sendEmailNotification: e.sendEmailNotification,
    });
  };

  return (
    <ReasonAlertModal
      isNotificationOptionVisible
      alertHeader={orderRef}
      alertText="Are you sure you want to update owner details of this order?"
      cancelText="No, keep order"
      checkboxLabel="Notify order owner by email?"
      closeModal={closeModal}
      headerText="Update order owner"
      isOpen={isOpen}
      mutationCallback={setMutation}
      submitText="Yes, update owner"
    />
  );
};

export default OrderUpdateOwnerDetailsModal;
