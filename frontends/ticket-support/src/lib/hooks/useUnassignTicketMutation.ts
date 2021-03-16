import { useMutation } from '@apollo/client';
import {
  useErrorSnackbar,
  useSuccessSnackbar,
} from '@websummit/components/src/molecules/Snackbar';

import { useAppContext } from '../../components/app/AppContext';
import TICKET_REJECT_MUTATION from '../../operations/mutations/TicketReject';

const useUnassignTicketMutation = ({ ticketId }: { ticketId: string }) => {
  const { conferenceSlug, token } = useAppContext();
  const success = useSuccessSnackbar();
  const error = useErrorSnackbar();

  const [unassignTicketMutation] = useMutation(TICKET_REJECT_MUTATION, {
    onCompleted: ({
      ticketReject,
    }: {
      ticketReject: {
        userErrors: [{ message: string }];
      };
    }) => {
      if (ticketReject?.userErrors.length) {
        error(ticketReject.userErrors[0].message);
      } else {
        success('The ticket was unassigned');
      }
    },
    refetchQueries: ['Ticket'],
  });

  const unassignTicket = async (reason: string, notify = false) => {
    await unassignTicketMutation({
      context: {
        headers: {
          'x-reason': reason,
        },
        slug: conferenceSlug,
        token,
      },
      refetchQueries: ['TicketAuditTrail', 'Ticket'],
      variables: {
        notify,
        ticketId,
      },
    });
  };

  return {
    unassignTicket,
  };
};

export default useUnassignTicketMutation;
