import { gql, useMutation } from '@apollo/client'
import { useState } from 'react'

import { useAppContext } from '../../components/app/AppContext'
import { useErrorSnackbar, useSuccessSnackbar } from '../../lib/hooks/useSnackbarMessage'
import { UserError } from '../../lib/types'

export const ORDER_CANCEL_MUTATION = gql`
  mutation CancelOrder($commerceOrderUpdate: CommerceOrderUpdate!, $id: ID!, $storeId: ID!) {
    commerceUpdateOrder(commerceOrderUpdate: $commerceOrderUpdate, id: $id, storeId: $storeId) {
      status
    }
  }
`

export type OrderCancelRequest = {
  commerceOrderUpdate?: { status: string }
  id: string
  reason: string
  storeId?: string
}

type CancelOrderResponse = {
  response: {
    status: string
    userErrors: UserError[]
  }
}

export const useOrderCancelMutation = () => {
  const { conferenceSlug, token } = useAppContext()
  const [error, setError] = useState('')
  const snackbar = useSuccessSnackbar()
  const errSnackbar = useErrorSnackbar()

  const [cancelOrderMutation] = useMutation<CancelOrderResponse>(ORDER_CANCEL_MUTATION, {
    onCompleted: ({ response }) => {
      console.log('test', response)
      snackbar('Ticket voided')
    },
    onError: e => errSnackbar(e.message),
    refetchQueries: ['Order'],
  })

  const cancelOrder = async ({ reason, id }: OrderCancelRequest) => {
    await cancelOrderMutation({
      context: {
        headers: {
          'x-admin-reason': reason,
        },
        slug: conferenceSlug,
        token,
      },
      variables: {
        commerceOrderUpdate: {
          status: 'CANCELLED',
        },
        id,
        storeId: '', // TODO remove or prefill
      },
    })
  }

  return {
    cancelOrder,
    error,
  }
}
