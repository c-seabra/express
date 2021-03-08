import { gql, useMutation } from '@apollo/client';
import {
  CommerceTaxDetailCreateOrUpdate,
  CommerceTransactionType,
} from '@websummit/graphql/src/@types/operations';

import { useAppContext } from '../../components/app/AppContext';
import {
  useErrorSnackbar,
  useSuccessSnackbar,
} from '../../lib/hooks/useSnackbarMessage';
import { CommerceTransaction } from '../../lib/types';
import { TotalInCents } from '../../lib/utils/price';

const commercePaymentMethodFragment = gql`
  fragment CommercePaymentMethod on CommercePaymentMethod {
    id
    name
  }
`;

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
    taxDetails,
  }: {
    amount: number | null;
    paymentMethod?: string | null;
    reason: string | null;
    taxDetails?:
      | (CommerceTaxDetailCreateOrUpdate & { total?: TotalInCents })[]
      | null;
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
          taxDetails,
          type,
        },
        orderId,
      },
    });
  };
};

export default useCommerceCreateTransactionMutation;
