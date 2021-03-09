import {
  CommerceOrderStatus,
  useUpdateCommerceOrderMutation,
} from '@websummit/graphql/src/@types/operations';

import { useAppContext } from '../../components/app/AppContext';
import {
  useErrorSnackbar,
  useSuccessSnackbar,
} from '../../lib/hooks/useSnackbarMessage';

export type OrderReinstateRequest = {
  commerceOrderUpdate?: { status: string };
  id: string;
  reason: string;
  refetch?: any;
  sendEmailNotification?: boolean;
  storeId?: string;
};

export const useOrderReinstateMutation = () => {
  const { conferenceSlug, token } = useAppContext();
  const snackbar = useSuccessSnackbar();
  const errSnackbar = useErrorSnackbar();

  const [reinstateOrderMutation] = useUpdateCommerceOrderMutation({
    onCompleted: () => {
      snackbar('Order reinstated');
    },
    onError: (e) => errSnackbar(e.message),
  });

  const reinstateOrder = async ({
    reason,
    id,
    refetch,
    sendEmailNotification,
  }: OrderReinstateRequest) => {
    await reinstateOrderMutation({
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
          status: CommerceOrderStatus.Reinstated,
        },
        id,
      },
    });
    // Hacky solution
    // there is a race condition after successful mutation order gets null
    setTimeout(() => refetch(), 1000);
  };

  return {
    reinstateOrder,
  };
};
