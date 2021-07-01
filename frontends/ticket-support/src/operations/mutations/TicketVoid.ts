import {
  useErrorSnackbar,
  useSuccessSnackbar,
} from '@websummit/components/src/molecules/Snackbar';
import { useVoidTicketMutation } from '@websummit/graphql/src/@types/operations';
import { useAppContext } from '@websummit/graphql/src/utils/AppContext';
import { useState } from 'react';

export type TicketsVoidArgs = {
  bookingRef: string;
  reason: string;
  sendEmailNotification?: boolean;
};

export const useTicketVoidOperation = () => {
  const { slug, token } = useAppContext();
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
    await voidTicketMutation({
      context: {
        headers: {
          'x-reason': reason,
        },
        slug,
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
    voidTicket,
  };
};
