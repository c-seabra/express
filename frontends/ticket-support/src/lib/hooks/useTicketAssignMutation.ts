import {
  useErrorSnackbar,
  useSuccessSnackbar,
} from '@websummit/components/src/molecules/Snackbar';
import { useTicketAssignMutation } from '@websummit/graphql/src/@types/operations';
import { useAppContext } from '@websummit/graphql/src/utils/AppContext';

type AssignTicketsArgs = {
  email: string;
  firstName: string;
  lastName?: string;
  notify?: boolean;
  reason: string;
  ticketId: string;
};

const useAssignTicketOperation = () => {
  const { slug, token } = useAppContext();
  const success = useSuccessSnackbar();
  const error = useErrorSnackbar();

  const [assignTicketMutation] = useTicketAssignMutation({
    onCompleted: ({ ticketAssign }) => {
      if (ticketAssign?.userErrors[0]) {
        error(ticketAssign?.userErrors[0].message);
      } else {
        success('Ticket assigned successfully');
      }
    },
    onError: (e) => error(e.message),
    refetchQueries: ['TicketAuditTrail', 'Ticket'],
  });

  const assignTicket = async ({ reason, ...variables }: AssignTicketsArgs) => {
    await assignTicketMutation({
      context: {
        headers: {
          'x-reason': reason,
        },
        slug,
        token,
      },
      variables,
    });
  };

  return {
    assignTicket,
    error,
  };
};

export default useAssignTicketOperation;
