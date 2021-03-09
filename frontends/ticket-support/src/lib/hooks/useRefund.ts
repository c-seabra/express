import {
  CommerceOrder,
  CommerceTransactionType,
} from '@websummit/graphql/src/@types/operations';

import useCommerceCreateTransactionMutation from '../../operations/mutations/CommerceCreateTransaction';

const useRefund = ({ order }: { order: CommerceOrder }) => {
  const createCommerceTransaction = useCommerceCreateTransactionMutation({
    orderId: order.id,
  });

  const fullRefund = async (reason: string) => {
    await createCommerceTransaction({
      amount: order.billed,
      paymentMethod: order.paymentMethod?.id || null,
      reason,
      type: CommerceTransactionType.Refund,
    });
  };

  const partialRefund = async (
    reason: string | null,
    amount: number | null,
  ) => {
    await createCommerceTransaction({
      amount,
      paymentMethod: order.paymentMethod?.id || null,
      reason,
      type: CommerceTransactionType.Refund,
    });
  };

  return {
    fullRefund,
    partialRefund,
  };
};

export default useRefund;
