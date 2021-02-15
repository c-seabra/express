import React from 'react'

import ReasonAlertModal from '../../lib/components/molecules/ReasonAlertModal'
import { OrderReinstateRequest, useOrderReinstateMutation } from '../../operations/mutations/OrderReinstate'

type OrderReinstateModalProps = {
  closeModal: () => void
  isOpen: boolean
  orderRef: string
  sourceId: string
}

const OrderReinstateModal = ({ isOpen, closeModal, orderRef, sourceId }: OrderReinstateModalProps) => {
  const { reinstateOrder } = useOrderReinstateMutation()
  const setMutation = (e: OrderReinstateRequest) => {
    console.log('set', e, sourceId)
    return reinstateOrder({ id: sourceId, reason: e.reason })
  }

  return (
    <ReasonAlertModal
      alertHeader={`${orderRef}`}
      alertText="This will reset the ticket assignment and the previous ticket holder will lose access to the ticket. They will be notified by email."
      cancelText="No, keep order"
      closeModal={closeModal}
      headerText="Are you sure you want to reinstate order"
      isOpen={isOpen}
      mutationCallback={setMutation}
      submitText="Yes, reinstate order"
    />
  )
}

export default OrderReinstateModal
