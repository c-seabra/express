import { gql } from '@apollo/client'
import { useMutation } from '@apollo/client'
import { useState } from 'react'

import { useAppContext } from '../../components/app/AppContext'
import { UserError } from '../../lib/types'
import { useErrorSnackbar, useSuccessSnackbar } from '../../lib/hooks/useSnackbarMessage'

export const ORDER_CANCEL_MUTATION = gql`
  mutation cancelOrder($storeId: ID!, $orderId: ID!, $commerceOrderUpdate: CommerceOrderUpdate!) {
    commerceUpdateOrder(
      storeId: $storeId
      id: $orderId
      commerceOrderUpdate: $commerceOrderUpdate
    ) {
      status
      userErrors {
        message
        path
      }
    }
  }
`
// TODO remove
// values:
//
// {  "storeId": "b5ff6381-b06f-4558-9e71-a6fc9f8cdd84",
//     "orderId": "3e9e3504-4446-4e87-ac9d-2db4021243c3",
//     "commerceOrderUpdate":{
//     "status": "CANCELLED"
// }}

type CancelOrderResponse = {
  response: {
    status: string
    userErrors: UserError[]
  }
}

type OrderCancelArgs = {
  orderRef: string
  reason: string
}

export const useOrderCancelMutation = () => {
  const { conferenceSlug, token } = useAppContext()
  const [error, setError] = useState('')
  const snackbar = useSuccessSnackbar()
  const errSnackbar = useErrorSnackbar()

  const [cancelOrderMutation] = useMutation<CancelOrderResponse>(ORDER_CANCEL_MUTATION, {
    onCompleted: ({ response }) => {
      snackbar('Ticket voided')

      if (response?.userErrors.length) {
        setError(response.userErrors[0]?.message)
        errSnackbar('Order cancelling failed')
      }
    },
    refetchQueries: ['Order'],
  })

  const cancelOrder = async ({ reason, orderRef }: OrderCancelArgs) => {
    await cancelOrderMutation({
      context: {
        headers: {
          'x-admin-reason': reason,
        },
        slug: conferenceSlug,
        token,
      },
      variables: {
        input: { reference: orderRef },
      },
    })
  }

  return {
    cancelOrder,
    error,
  }
}
