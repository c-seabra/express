import { useProfileAdminUpdateMutation } from '@websummit/graphql/src/@types/operations';

import { useAppContext } from '../../components/app/AppContext';
import {
  useErrorSnackbar,
  useSuccessSnackbar,
} from '../../lib/hooks/useSnackbarMessage';

export type OrderUpdateOwnerRequest = {
  accountId: string;
  firstName: string;
  lastName?: string;
  reason: string;
  refetch?: any;
  sendEmailNotification?: boolean;
};

export const useOrderUpdateOwnerOperation = () => {
  const { conferenceSlug, token } = useAppContext();
  const snackbar = useSuccessSnackbar();
  const errSnackbar = useErrorSnackbar();

  const [updateOwnerOrderMutation] = useProfileAdminUpdateMutation({
    onCompleted: ({ assignmentProfileAdminUpdate }) => {
      if (assignmentProfileAdminUpdate?.userErrors) {
        errSnackbar(assignmentProfileAdminUpdate.userErrors[0].message);
      } else {
        snackbar('Order owner updated');
      }
    },
    onError: (e) => errSnackbar(e.message),
  });

  const updateOwnerOrder = async ({
    accountId,
    reason,
    firstName,
    lastName,
    // sendEmailNotification,
    refetch,
  }: OrderUpdateOwnerRequest) => {
    await updateOwnerOrderMutation({
      context: {
        headers: {
          'X-Reason': reason,
        },
        slug: conferenceSlug,
        token,
      },
      variables: {
        profile: {
          accountId,
          firstName,
          jobTitle: '?',
          lastName,
        },
      },
    });

    // Hacky solution
    // there is a race condition after successful mutation order gets null
    setTimeout(() => refetch(), 1000);
  };

  return {
    updateOwnerOrder,
  };
};
