import { useMutation } from '@apollo/client';

import { useAppContext } from '../../components/app/AppContext';
import { TICKET_ACCEPT_MUTATION } from '../../operations/mutations/TicketAccept';

type ClaimTicketMutationArgs = {
  ticketId: string;
};

const useClaimTicketMutation = ({ ticketId }: ClaimTicketMutationArgs) => {
  const { slug, token } = useAppContext();

  const [claimTicketMutation] = useMutation(TICKET_ACCEPT_MUTATION);

  const claimTicket = async (reason: string) => {
    await claimTicketMutation({
      context: {
        headers: {
          'x-reason': reason,
        },
        slug,
        token,
      },
      refetchQueries: ['TicketAuditTrail', 'Ticket'],
      variables: {
        ticketId,
      },
    });
  };

  return {
    claimTicket,
  };
};

export default useClaimTicketMutation;
