import { useOrderTransferMutation } from '@websummit/graphql/src/@types/operations';

import { useAppContext } from '../../components/app/AppContext';
import {
  useErrorSnackbar,
  useSuccessSnackbar,
} from '../../lib/hooks/useSnackbarMessage';

export type OrderTransferRequest = {
  email: string;
  firstName: string;
  lastName?: string;
  orderRef: string;
  reason: string;
  sendEmailNotification?: boolean;
};

export const useOrderTransferOperation = () => {
  const { conferenceSlug, token } = useAppContext();
  const snackbar = useSuccessSnackbar();
  const errSnackbar = useErrorSnackbar();

  const [transferOrderMutation] = useOrderTransferMutation({
    onCompleted: () => {
      snackbar('Order transferred');
    },
    onError: (e) => errSnackbar(e.message),
  });

  const transferOrder = async ({
    reason,
    email,
    firstName,
    lastName,
    orderRef,
    sendEmailNotification,
  }: OrderTransferRequest) => {
    await transferOrderMutation({
      context: {
        headers: {
          'X-Reason': reason,
        },
        slug: conferenceSlug,
        token,
      },
      variables: {
        input: {
          notify: sendEmailNotification,
          owner: {
            email,
            firstName,
            lastName,
          },
          reference: orderRef,
        },
      },
    });
  };

  return {
    transferOrder,
  };
};
