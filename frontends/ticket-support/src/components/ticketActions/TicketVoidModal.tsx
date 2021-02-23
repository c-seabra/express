import React from 'react';

import ReasonAlertModal from '../../lib/components/molecules/ReasonAlertModal';
import {
  TicketsVoidArgs,
  useTicketVoidOperation,
} from '../../operations/mutations/TicketVoid';

type TicketVoidModalProps = {
  bookingRef: string;
  closeModal: () => void;
  isOpen: boolean;
};

const TicketVoidModal = ({
  isOpen,
  closeModal,
  bookingRef,
}: TicketVoidModalProps) => {
  const { voidTicket } = useTicketVoidOperation();
  const setMutation = (e: TicketsVoidArgs) => {
    return voidTicket({
      bookingRef,
      reason: e.reason,
      sendEmailNotification: e.sendEmailNotification,
    });
  };

  return (
    <ReasonAlertModal
      isNotificationOptionVisible
      alertHeader={bookingRef}
      alertText="This action shall void the ticket and ticket holder will no longer have access to the conference."
      cancelText="No, keep order"
      closeModal={closeModal}
      headerText="Are you sure you want to void ticket"
      isOpen={isOpen}
      mutationCallback={setMutation}
      submitText="Yes, void ticket"
    />
  );
};

export default TicketVoidModal;
