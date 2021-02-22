import { gql, useMutation } from '@apollo/client';
import { CommerceTransactionType } from '@websummit/graphql/src/@types/operations';

import { useAppContext } from '../../components/app/AppContext';
import {
  useErrorSnackbar,
  useSuccessSnackbar,
} from '../../lib/hooks/useSnackbarMessage';
import { CommerceTransaction } from '../../lib/types';
import { commercePaymentMethodFragment } from '../queries/CommerceGetOrder';

const CREATE_TRANSACTION_MUTATION = gql`
  mutation commerceCreateTransaction(
    $commerceTransactionCreate: CommerceTransactionCreate!
    $orderId: ID!
    $storeId: ID
  ) {
    commerceCreateTransaction(
      commerceTransactionCreate: $commerceTransactionCreate
      orderId: $orderId
      storeId: $storeId
    ) {
      amount
      createdAt
      createdBy
      currency
      id
      lastUpdatedAt
      lastUpdatedBy
      paymentMethod {
        ...CommercePaymentMethod
      }
      refundedTransaction
      status
      timestamp
      type
    }
  }
  ${commercePaymentMethodFragment}
`;

type CreateTransactionMutationResult = {
  commerceCreateTransaction: {
    commerceTransaction: CommerceTransaction;
  };
};

const useCommerceCreateTransactionMutation = ({
  orderId,
}: {
  orderId: string | null;
}) => {
  const { conferenceSlug, token } = useAppContext();
  const success = useSuccessSnackbar();
  const error = useErrorSnackbar();
  const [
    createTransactionMutation,
  ] = useMutation<CreateTransactionMutationResult>(
    CREATE_TRANSACTION_MUTATION,
    {
      onCompleted: () => {
        success('Operation successful');
      },
      onError: (e) => error(e.message),
      refetchQueries: ['Order', 'CommerceOrder'],
    },
  );

  return async ({
    amount,
    paymentMethod,
    reason,
    type,
  }: {
    amount: number | null;
    paymentMethod: string | null;
    reason: string | null;
    type: CommerceTransactionType | null;
  }) => {
    await createTransactionMutation({
      context: {
        headers: {
          'x-reason': reason,
        },
        slug: conferenceSlug,
        token,
      },
      variables: {
        commerceTransactionCreate: {
          amount: Number(amount),
          paymentMethod: {
            id: paymentMethod,
          },
          type,
        },
        orderId,
      },
    });
  };
};

export default useCommerceCreateTransactionMutation;
