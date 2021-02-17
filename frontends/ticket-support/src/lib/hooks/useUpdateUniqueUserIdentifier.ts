import { useMutation } from '@apollo/client';

import { useAppContext } from '../../components/app/AppContext';
import IDENTITY_EMAIL_UPDATE from '../../operations/mutations/IdentityEmailUpdate';
import { Account, UserError } from '../types';
import { useErrorSnackbar, useSuccessSnackbar } from './useSnackbarMessage';

type UpdateUniqueIdentifierResponse = {
  assignmentAccountUpdate: {
    account: Account;
    userErrors: UserError[];
  };
};

type UpdateUniqueIdentifierArgs = {
  accountId: string;
  email: string;
  reason: string;
};

const useUpdateUniqueUserIdentifierMutation = () => {
  const { conferenceSlug, token } = useAppContext();
  const successSnackbar = useSuccessSnackbar();
  const errorSnackbar = useErrorSnackbar();

  const [
    updateUniqueUserIdentificationMutation,
  ] = useMutation<UpdateUniqueIdentifierResponse>(IDENTITY_EMAIL_UPDATE, {
    onCompleted: ({ assignmentAccountUpdate }) => {
      if (assignmentAccountUpdate?.account?.email) {
        successSnackbar('Unique user identifier updated');
      }
      if (assignmentAccountUpdate?.userErrors?.length) {
        const msg = assignmentAccountUpdate?.userErrors[0]?.message;
        const defaultMsg = 'Updating unique user identifier failed';

        errorSnackbar(msg || defaultMsg);
      }
    },
    onError: (error) => errorSnackbar(error.message),
    refetchQueries: ['TicketAuditTrail', 'Ticket'],
  });

  const updateUniqueUserIdentifier = async ({
    reason,
    accountId,
    email,
  }: UpdateUniqueIdentifierArgs) => {
    await updateUniqueUserIdentificationMutation({
      context: {
        headers: {
          'x-admin-reason': reason,
        },
        slug: conferenceSlug,
        token,
      },
      variables: {
        accountId,
        email,
      },
    });
  };

  return {
    updateUniqueUserIdentifier,
  };
};

export default useUpdateUniqueUserIdentifierMutation;
