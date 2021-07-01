import {
  useErrorSnackbar,
  useSuccessSnackbar,
} from '@websummit/components/src/molecules/Snackbar';
import { useOrderTransferMutation } from '@websummit/graphql/src/@types/operations';
import { useAppContext } from '@websummit/graphql/src/utils/AppContext';

export type OrderTransferRequest = {
  email: string;
  firstName: string;
  lastName?: string;
  orderRef: string;
  reason: string;
  refetch?: any;
  sendEmailNotification?: boolean;
};

export const useOrderTransferOperation = () => {
  const { slug, token } = useAppContext();
  const snackbar = useSuccessSnackbar();
  const errSnackbar = useErrorSnackbar();

  const [transferOrderMutation] = useOrderTransferMutation({
    onCompleted: () => {
      snackbar('Order transferred');
    },
    onError: (e) => errSnackbar(e.message),
    refetchQueries: ['Order', 'CommerceOrder'],
  });

  const transferOrder = async ({
    reason,
    email,
    firstName,
    lastName,
    orderRef,
    sendEmailNotification,
    refetch,
  }: OrderTransferRequest) => {
    await transferOrderMutation({
      context: {
        headers: {
          'X-Reason': reason,
        },
        slug,
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

    // Hacky solution
    // there is a race condition after successful mutation order gets null
    setTimeout(() => refetch(), 1000);
  };

  return {
    transferOrder,
  };
};
