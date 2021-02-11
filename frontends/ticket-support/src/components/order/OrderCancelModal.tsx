import React from 'react'

import ReasonAlertModal from '../../lib/components/molecules/ReasonAlertModal'
import { OrderCancelRequest, useOrderCancelMutation } from '../../operations/mutations/OrderCancel'

type OrderCancelModalProps = {
  closeModal: () => void
  isOpen: boolean
  orderRef: string
  sourceId: string
}

const OrderCancelModal = ({ isOpen, closeModal, orderRef, sourceId }: OrderCancelModalProps) => {
  const { cancelOrder } = useOrderCancelMutation()
  const setMutation = (e: OrderCancelRequest) => {
    console.log('set', e, sourceId)
    return cancelOrder({ id: sourceId, reason: e.reason })
  }

  return (
    <ReasonAlertModal
      alertHeader={orderRef}
      alertText="Are you sure you want to cancel this order? Cancellation will void all associated tickets."
      cancelText="No, keep order"
      closeModal={closeModal}
      headerText="Cancellation of Order"
      isOpen={isOpen}
      mutationCallback={setMutation}
      submitText="Yes, cancel order"
    />
  )
}

export default OrderCancelModal
