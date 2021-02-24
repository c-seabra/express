import {
  CommerceOrderStatus,
  useUpdateCommerceOrderMutation,
} from '@websummit/graphql/src/@types/operations';

import { useAppContext } from '../../components/app/AppContext';
import {
  useErrorSnackbar,
  useSuccessSnackbar,
} from '../../lib/hooks/useSnackbarMessage';

export type OrderCancelRequest = {
  id: string;
  reason: string;
  refetch?: any;
  sendEmailNotification?: boolean;
  storeId?: string;
};

export const useOrderCancelOperation = () => {
  const { conferenceSlug, token } = useAppContext();
  const snackbar = useSuccessSnackbar();
  const errSnackbar = useErrorSnackbar();

  const [cancelOrderMutation] = useUpdateCommerceOrderMutation({
    onCompleted: () => {
      snackbar('Order cancelled');
    },
    onError: (e) => errSnackbar(e.message),
  });

  const cancelOrder = async ({
    reason,
    id,
    refetch,
    sendEmailNotification,
  }: OrderCancelRequest) => {
    await cancelOrderMutation({
      context: {
        headers: {
          'X-Reason': reason,
        },
        slug: conferenceSlug,
        token,
      },
      variables: {
        commerceOrderUpdate: {
          metadata: {
            disableEmailNotification: !sendEmailNotification,
          },
          status: CommerceOrderStatus.Cancelled,
        },
        id,
      },
    });
    // Hacky solution
    // there is a race condition after successful mutation order gets null
    setTimeout(() => refetch(), 1000);
  };

  return {
    cancelOrder,
  };
};
