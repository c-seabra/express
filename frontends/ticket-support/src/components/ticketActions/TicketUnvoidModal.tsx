import React from 'react';

import ReasonAlertModal from '../../lib/components/molecules/ReasonAlertModal';
import {
  TicketsUnvoidArgs,
  useTicketUnvoidOperation,
} from '../../operations/mutations/TicketUnvoid';

type TicketUnvoidModalProps = {
  bookingRef: string;
  closeModal: () => void;
  isOpen: boolean;
};

const TicketUnvoidModal = ({
  isOpen,
  closeModal,
  bookingRef,
}: TicketUnvoidModalProps) => {
  const { unvoidTicket } = useTicketUnvoidOperation();
  const setMutation = (e: TicketsUnvoidArgs) => {
    return unvoidTicket({ bookingRef, reason: e.reason });
  };

  return (
    <ReasonAlertModal
      alertHeader={bookingRef}
      alertText="This action shall unvoid the ticket and ticket holder will again have access to the conference."
      cancelText="No, keep order"
      closeModal={closeModal}
      headerText="Are you sure you want to unvoid ticket"
      isOpen={isOpen}
      mutationCallback={setMutation}
      submitText="Yes, unvoid ticket"
    />
  );
};

export default TicketUnvoidModal;
