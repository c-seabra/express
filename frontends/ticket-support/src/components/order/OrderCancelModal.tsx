import React from 'react'

import ReasonAlertModal from '../../lib/components/molecules/ReasonAlertModal'
import { useOrderCancelMutation } from '../../operations/mutations/OrderCancel'

type OrderCancelModalProps = {
  closeModal: () => void
  isOpen: boolean
  orderRef: string
}

const OrderCancelModal = ({ isOpen, closeModal, orderRef }: OrderCancelModalProps) => {
  const { cancelOrder } = useOrderCancelMutation()

  return (
    <ReasonAlertModal
      alertHeader={orderRef}
      alertText="Are you sure you want to cancel this order? Cancellation will void all associated tickets."
      cancelText="No, keep order"
      closeModal={closeModal}
      headerText="Cancellation of Order"
      isOpen={isOpen}
      mutationCallback={cancelOrder}
      orderRef={orderRef}
      submitText="Yes, cancel order"
    />
  )
}

export default OrderCancelModal
