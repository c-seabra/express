import { gql, useMutation } from '@apollo/client'
import { useState } from 'react'

import { useAppContext } from '../../components/app/AppContext'
import { useErrorSnackbar, useSuccessSnackbar } from '../../lib/hooks/useSnackbarMessage'
import { UserError } from '../../lib/types'

export const ORDER_REINSTATE_MUTATION = gql`
  mutation ReinstateOrder($commerceOrderUpdate: CommerceOrderUpdate!, $id: ID!, $storeId: ID!) {
    commerceUpdateOrder(commerceOrderUpdate: $commerceOrderUpdate, id: $id, storeId: $storeId) {
      status
    }
  }
`

export type OrderReinstateRequest = {
  commerceOrderUpdate?: { status: string }
  id: string
  reason: string
  storeId?: string
}

type ReinstateOrderResponse = {
  response: {
    status: string
    userErrors: UserError[]
  }
}

export const useOrderReinstateMutation = () => {
  const { conferenceSlug, token } = useAppContext()
  const [error, setError] = useState('')
  const snackbar = useSuccessSnackbar()
  const errSnackbar = useErrorSnackbar()

  const [reinstateOrderMutation] = useMutation<ReinstateOrderResponse>(ORDER_REINSTATE_MUTATION, {
    onCompleted: ({ response }) => {
      console.log('reinstateOrderMutation', response)
      snackbar('Order reinstated')
    },
    onError: e => errSnackbar(e.message),
    refetchQueries: () => ['CommerceOrderItem', 'CommerceOrderStatus', 'Order', 'CommerceOrder', 'Ticket'],
    awaitRefetchQueries: true,
  })

  const reinstateOrder = async ({ reason, id }: OrderReinstateRequest) => {
    await reinstateOrderMutation({
      context: {
        headers: {
          'X-Reason': reason,
        },
        slug: conferenceSlug,
        token,
      },
      variables: {
        commerceOrderUpdate: {
          status: 'REINSTATED',
        },
        id,
        storeId: '7ada51b5-eed4-44f9-852c-9ef5b20e16a1', // TODO remove or prefill
      },
    })
  }

  return {
    error,
    reinstateOrder,
  }
}
