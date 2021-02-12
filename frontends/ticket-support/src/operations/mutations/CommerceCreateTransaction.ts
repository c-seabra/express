import { gql, useMutation } from '@apollo/client'

import { useAppContext } from '../../components/app/AppContext'
import { useErrorSnackbar, useSuccessSnackbar } from '../../lib/hooks/useSnackbarMessage'
import { CommerceTransaction, CommerceTransactionType } from '../../lib/types'
import { commercePaymentMethodFragment } from '../queries/CommerceGetOrder'

const CREATE_TRANSACTION_MUTATION = gql`
  mutation commerceCreateTransaction(
    $commerceTransactionCreate: CommerceTransactionCreate!
    $orderId: ID!
    $storeId: ID!
  ) {
    commerceCreateTransaction(
      commerceTransactionCreate: $commerceTransactionCreate
      orderId: $orderId
      storeId: $storeId
    ) {
      amount
      createdAt
      createdBy
      currency
      id
      lastUpdatedAt
      lastUpdatedBy
      paymentMethod {
        ...CommercePaymentMethod
      }
      refundedTransaction
      status
      timestamp
      type
    }
  }
  ${commercePaymentMethodFragment}
`

type CreateTransactionMutationResult = {
  commerceCreateTransaction: {
    commerceTransaction: CommerceTransaction
  }
}

const useCommerceCreateTransactionMutation = ({ orderId }: { orderId: string }) => {
  const { conferenceSlug, storeToken, storeId } = useAppContext()
  const success = useSuccessSnackbar()
  const error = useErrorSnackbar()
  const [createTransactionMutation] = useMutation<CreateTransactionMutationResult>(
    CREATE_TRANSACTION_MUTATION,
    {
      onCompleted: () => {
        success('Operation successful')
      },
      onError: e => error(e.message),
    }
  )

  return async ({
    amount,
    paymentMethod,
    reason,
    type,
  }: {
    amount: number
    paymentMethod: string
    reason: string
    type: CommerceTransactionType
  }) => {
    await createTransactionMutation({
      context: {
        headers: {
          'x-reason': reason,
        },
        slug: conferenceSlug,
        token: storeToken,
      },
      variables: {
        commerceTransactionCreate: {
          amount,
          paymentMethod,
          type,
        },
        orderId,
        storeId,
      },
    })
  }
}

export default useCommerceCreateTransactionMutation
