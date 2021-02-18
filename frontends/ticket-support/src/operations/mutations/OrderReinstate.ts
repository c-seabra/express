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
  storeId?: string;
};

export const useOrderReinstateMutation = () => {
  const { conferenceSlug, token } = useAppContext();
  const snackbar = useSuccessSnackbar();
  const errSnackbar = useErrorSnackbar();

  const [reinstateOrderMutation] = useUpdateCommerceOrderMutation({
    onCompleted: ({ commerceUpdateOrder }) => {
      snackbar('Order reinstated');
    },
    onError: (e) => errSnackbar(e.message),
  });

  const reinstateOrder = async ({
    reason,
    id,
    refetch,
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
