import { useMutation } from '@apollo/client';
import {
  useErrorSnackbar,
  useSuccessSnackbar,
} from '@websummit/components/src/molecules/Snackbar';
import { useAppContext } from '@websummit/graphql/src/utils/AppContext';

import TICKET_LOGIN_UPDATE from '../../operations/mutations/UpdateLoginEmail';
import { Ticket, UserError } from '../types';

type UpdateLoginResponse = {
  assignmentTicketLoginUpdate: {
    ticket: Ticket;
    userErrors: UserError[];
  };
};

type UpdateLoginTicketsArgs = {
  bookingRef: string;
  email: string;
  reason: string;
};

const useUpdateLoginMutation = () => {
  const { slug, token } = useAppContext();
  const successSnackbar = useSuccessSnackbar();
  const errorSnackbar = useErrorSnackbar();

  const [updateLoginMutation] = useMutation<UpdateLoginResponse>(
    TICKET_LOGIN_UPDATE,
    {
      onCompleted: ({ assignmentTicketLoginUpdate }) => {
        if (assignmentTicketLoginUpdate?.ticket?.assignment?.assignee) {
          successSnackbar('Login email updated');
        }
        if (assignmentTicketLoginUpdate?.userErrors?.length) {
          errorSnackbar('Updating login email failed');
        }
      },
      onError: (error) => errorSnackbar(error.message),
      refetchQueries: ['TicketAuditTrail', 'Ticket'],
    },
  );

  const updateLogin = async ({
    reason,
    bookingRef,
    email,
  }: UpdateLoginTicketsArgs) => {
    await updateLoginMutation({
      context: {
        headers: {
          'x-reason': reason,
        },
        slug,
        token,
      },
      variables: {
        appLoginEmail: email,
        bookingRef,
      },
    });
  };

  return {
    updateLogin,
  };
};

export default useUpdateLoginMutation;
