import { useMutation } from '@apollo/client'
import { useState } from 'react'

import { useAppContext } from '../../components/app/AppContext'
import ORDER_CANCEL_MUTATION from '../../operations/mutations/OrderCancel'
import { UserError } from '../types'
import { useErrorSnackbar, useSuccessSnackbar } from './useSnackbarMessage'

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

const useOrderCancelMutation = () => {
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
    error,
    cancelOrder,
  }
}

export default useOrderCancelMutation
