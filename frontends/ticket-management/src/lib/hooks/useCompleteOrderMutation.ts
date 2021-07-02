import { useErrorSnackbar } from '@websummit/components/src/molecules/Snackbar';
import { RecursivePartial } from '@websummit/glue/src/lib/utils/recursivePartial';
import {
  CommerceOrder,
  CommerceOrderStatus,
  useUpdateCommerceOrderMutation,
} from '@websummit/graphql/src/@types/operations';

import { useRequestContext } from '../../components/app/AppContext';

export default () => {
  const context = useRequestContext();
  const error = useErrorSnackbar();
  const [updateOrder] = useUpdateCommerceOrderMutation({
    context: {
      ...context,
      headers: {
        owner: 'user',
      },
    },
    onError: (e) => error(e.message),
  });

  return async (createdOrder?: RecursivePartial<CommerceOrder> | null) => {
    if (
      createdOrder?.id &&
      createdOrder?.status === CommerceOrderStatus.Pending
    ) {
      await updateOrder({
        variables: {
          commerceOrderUpdate: {
            status: CommerceOrderStatus.Complete,
          },
          id: createdOrder?.id,
        },
      });
    }
  };
};
