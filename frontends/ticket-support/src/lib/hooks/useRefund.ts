import useCommerceCreateTransactionMutation from '../../operations/mutations/CommerceCreateTransaction'
import { CommerceOrder, CommerceTransactionType } from '../types'

const useRefund = ({ order }: { order: CommerceOrder }) => {
  const createCommerceTransaction = useCommerceCreateTransactionMutation({ orderId: order.id })

  const fullRefund = async (reason: string) => {
    await createCommerceTransaction({
      amount: order.total,
      paymentMethod: order.paymentMethod?.id,
      reason,
      type: CommerceTransactionType.REFUND,
    })
  }

  const partialRefund = async (reason: string, amount: number) => {
    await createCommerceTransaction({
      amount,
      paymentMethod: order.paymentMethod?.id,
      reason,
      type: CommerceTransactionType.REFUND,
    })
  }

  return {
    fullRefund,
    partialRefund,
  }
}

export default useRefund
