import {
  useErrorSnackbar,
  useSuccessSnackbar,
} from '@websummit/components/src/molecules/Snackbar';
import { useProfileAdminUpdateMutation } from '@websummit/graphql/src/@types/operations';
import { useAppContext } from '@websummit/graphql/src/utils/AppContext';

export type OrderUpdateOwnerRequest = {
  accountId: string;
  firstName: string;
  lastName?: string;
  reason: string;
  refetch?: any;
  sendEmailNotification?: boolean;
};

export const useOrderUpdateOwnerOperation = () => {
  const { slug, token } = useAppContext();
  const snackbar = useSuccessSnackbar();
  const errSnackbar = useErrorSnackbar();

  const [updateOwnerOrderMutation] = useProfileAdminUpdateMutation({
    onCompleted: ({ assignmentProfileAdminUpdate }) => {
      if (
        assignmentProfileAdminUpdate?.userErrors &&
        assignmentProfileAdminUpdate?.userErrors.length > 0
      ) {
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
    refetch,
  }: OrderUpdateOwnerRequest) => {
    await updateOwnerOrderMutation({
      context: {
        headers: {
          'X-Reason': reason,
        },
        slug,
        token,
      },
      variables: {
        profile: {
          accountId,
          firstName,
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
