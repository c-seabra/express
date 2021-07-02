import { useMutation } from '@apollo/client';
import {
  useErrorSnackbar,
  useSuccessSnackbar,
} from '@websummit/components/src/molecules/Snackbar';
import { useAppContext } from '@websummit/graphql/src/utils/AppContext';
import { useState } from 'react';

import TICKET_UNLOCK_MUTATION from '../../operations/mutations/TicketUnlock';
import { Ticket, UserError } from '../types';

type TicketUnlockResponse = {
  response: {
    ticket: Ticket;
    userErrors: UserError[];
  };
};

type UnlockTicketsArgs = {
  bookingRef: string;
  reason: string;
};

const useUnlockTicketMutation = () => {
  const { slug, token } = useAppContext();
  const [error, setError] = useState('');
  const snackbar = useSuccessSnackbar();
  const errSnackbar = useErrorSnackbar();

  const [unlockTicketMutation] = useMutation<TicketUnlockResponse>(
    TICKET_UNLOCK_MUTATION,
    {
      onCompleted: ({ response }) => {
        snackbar('Ticket unlocked');

        if (response?.userErrors.length) {
          setError(response.userErrors[0]?.message);
          errSnackbar('Ticket unlocking failed');
        }
      },
      refetchQueries: ['TicketAuditTrail', 'Ticket'],
    },
  );

  const unlockTicket = async ({ reason, bookingRef }: UnlockTicketsArgs) => {
    await unlockTicketMutation({
      context: {
        headers: {
          'x-reason': reason,
        },
        slug,
        token,
      },
      variables: {
        input: { reference: bookingRef },
      },
    });
  };

  return {
    error,
    unlockTicket,
  };
};

export default useUnlockTicketMutation;
