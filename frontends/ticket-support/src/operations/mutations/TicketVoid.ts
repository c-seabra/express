import { useVoidTicketMutation } from '@websummit/graphql/src/@types/operations';
import { useState } from 'react';

import { useAppContext } from '../../components/app/AppContext';
import {
  useErrorSnackbar,
  useSuccessSnackbar,
} from '../../lib/hooks/useSnackbarMessage';

export type TicketsVoidArgs = {
  bookingRef: string;
  reason: string;
  sendEmailNotification?: boolean;
};

export const useTicketVoidOperation = () => {
  const { conferenceSlug, token } = useAppContext();
  const [error, setError] = useState('');
  const snackbar = useSuccessSnackbar();
  const errSnackbar = useErrorSnackbar();

  const [voidTicketMutation] = useVoidTicketMutation({
    onCompleted: ({ ticketVoid }) => {
      snackbar('Ticket voided');

      if (ticketVoid?.userErrors.length) {
        setError(ticketVoid.userErrors[0]?.message);
        errSnackbar('Ticket voiding failed');
      }
    },
    refetchQueries: ['TicketAuditTrail', 'Ticket'],
  });

  const voidTicket = async ({
    reason,
    bookingRef,
    sendEmailNotification,
  }: TicketsVoidArgs) => {
    console.log('isNotificationDisabled', sendEmailNotification);
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
          disableEmailNotification: sendEmailNotification,
          reference: bookingRef,
        },
      },
    });
  };

  return {
    error,
    voidTicket,
  };
};
