import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';

import { useAppContext } from '../../components/app/AppContext';
import {
  useErrorSnackbar,
  useSuccessSnackbar,
} from '../../lib/hooks/useSnackbarMessage';
import { UserError } from '../../lib/types';
import ORDER_QUERY from '../queries/OrderByRef';

export const ORDER_CANCEL_MUTATION = gql`
  mutation CancelOrder(
    $commerceOrderUpdate: CommerceOrderUpdate!
    $id: ID!
    $storeId: ID
  ) {
    commerceUpdateOrder(
      commerceOrderUpdate: $commerceOrderUpdate
      id: $id
      storeId: $storeId
    ) {
      status
    }
  }
`;

export type OrderCancelRequest = {
  commerceOrderUpdate?: { status: string };
  id: string;
  reason: string;
  refetch?: any;
  storeId?: string;
};

type CancelOrderResponse = {
  commerceUpdateOrder: {
    status: string;
    userErrors: UserError[];
  };
};

export const useOrderCancelMutation = () => {
  const { conferenceSlug, token } = useAppContext();
  const [error, setError] = useState('');
  const snackbar = useSuccessSnackbar();
  const errSnackbar = useErrorSnackbar();

  const [cancelOrderMutation] = useMutation<CancelOrderResponse>(
    ORDER_CANCEL_MUTATION,
    {
      onCompleted: ({ commerceUpdateOrder }) => {
        snackbar('Order cancelled');
      },
      onError: (e) => errSnackbar(e.message),
    },
  );

  const cancelOrder = async ({ reason, id, refetch }: OrderCancelRequest) => {
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
          status: 'CANCELLED',
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
    error,
  };
};
