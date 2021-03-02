import { useProfileUpdateMutation } from '@websummit/graphql/src/@types/operations';

import { useAppContext } from '../../components/app/AppContext';
import {
  useErrorSnackbar,
  useSuccessSnackbar,
} from '../../lib/hooks/useSnackbarMessage';

export type OrderUpdateOwnerRequest = {
  firstName: string;
  lastName?: string;
  orderRef: string;
  reason: string;
  refetch?: any;
  sendEmailNotification?: boolean;
};

export const useOrderUpdateOwnerOperation = () => {
  const { conferenceSlug, token } = useAppContext();
  const snackbar = useSuccessSnackbar();
  const errSnackbar = useErrorSnackbar();

  const [updateOwnerOrderMutation] = useProfileUpdateMutation({
    onCompleted: ({ assignmentProfileUpdate }) => {
      if (assignmentProfileUpdate?.userErrors) {
        errSnackbar(assignmentProfileUpdate.userErrors[0].message);
      } else {
        snackbar('Order owner updated');
      }
    },
    onError: (e) => errSnackbar(e.message),
  });

  const updateOwnerOrder = async ({
    reason,
    firstName,
    lastName,
    orderRef,
    sendEmailNotification,
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
          companySizeId: '?',
          firstName,
          industryId: '?',
          jobTitle: '?',
          lastName,
          marketingConsent: '?',
          personalisationConsent: '?',
          ticketId: '?',
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
