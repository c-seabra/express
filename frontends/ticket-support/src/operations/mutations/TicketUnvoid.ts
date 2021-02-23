import { useTicketUnvoidMutation } from '@websummit/graphql/src/@types/operations';
import { useState } from 'react';

import { useAppContext } from '../../components/app/AppContext';
import {
  useErrorSnackbar,
  useSuccessSnackbar,
} from '../../lib/hooks/useSnackbarMessage';

export type TicketsUnvoidArgs = {
  bookingRef: string;
  reason: string;
  sendEmailNotification?: boolean;
};

export const useTicketUnvoidOperation = () => {
  const { conferenceSlug, token } = useAppContext();
  const [error, setError] = useState('');
  const snackbar = useSuccessSnackbar();
  const errSnackbar = useErrorSnackbar();

  const [voidTicketMutation] = useTicketUnvoidMutation({
    onCompleted: ({ ticketUnvoid }) => {
      snackbar('Ticket unvoided');

      if (ticketUnvoid?.userErrors.length) {
        setError(ticketUnvoid.userErrors[0]?.message);
        errSnackbar('Ticket unvoiding failed');
      }
    },
    refetchQueries: ['TicketAuditTrail', 'Ticket'],
  });

  const unvoidTicket = async ({
    reason,
    bookingRef,
    sendEmailNotification,
  }: TicketsUnvoidArgs) => {
    await voidTicketMutation({
      context: {
        headers: {
          'x-reason': reason,
        },
        slug: conferenceSlug,
        token,
      },
      variables: {
        input: {
          disableEmailNotification: !sendEmailNotification,
          reference: bookingRef,
        },
      },
    });
  };

  return {
    error,
    unvoidTicket,
  };
};
