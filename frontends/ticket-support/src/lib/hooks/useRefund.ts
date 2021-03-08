import {
  CommerceOrder,
  CommerceTaxDetailCreateOrUpdate,
  CommerceTransactionType,
} from '@websummit/graphql/src/@types/operations';

import useCommerceCreateTransactionMutation from '../../operations/mutations/CommerceCreateTransaction';
import { TotalInCents } from '../utils/price';

type RefundArgs = {
  amount: TotalInCents | null;
  paymentMethod?: string;
  reason: string | null;
  taxDetails?:
    | (CommerceTaxDetailCreateOrUpdate & { total?: TotalInCents })
    | null;
};

const useRefund = ({ order }: { order: CommerceOrder }) => {
  const createCommerceTransaction = useCommerceCreateTransactionMutation({
    orderId: order.id,
  });

  const fullRefund = async ({
    reason,
    paymentMethod,
  }: Pick<RefundArgs, 'reason' | 'paymentMethod'>) => {
    await createCommerceTransaction({
      amount: order.billed,
      paymentMethod,
      reason,
      type: CommerceTransactionType.Refund,
    });
  };

  const partialRefund = async ({
    reason,
    amount,
    taxDetails,
    paymentMethod,
  }: RefundArgs) => {
    await createCommerceTransaction({
      amount,
      paymentMethod,
      reason,
      taxDetails: taxDetails ? [taxDetails] : undefined,
      type: CommerceTransactionType.Refund,
    });
  };

  return {
    fullRefund,
    partialRefund,
  };
};

export default useRefund;
