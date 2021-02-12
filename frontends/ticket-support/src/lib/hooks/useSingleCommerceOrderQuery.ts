import { useQuery } from '@apollo/client'

import { useAppContext } from '../../components/app/AppContext'
import COMMERCE_GET_ORDER from '../../operations/queries/CommerceGetOrder'
import { CommerceOrder } from '../types'
import { useErrorSnackbar } from './useSnackbarMessage'

const useSingleCommerceOrderQuery = ({ id }: { id?: string }) => {
  const { conferenceSlug, storeId, storeToken } = useAppContext()
  const error = useErrorSnackbar()

  const { data, loading } = useQuery<{ commerceGetOrder: CommerceOrder }>(COMMERCE_GET_ORDER, {
      context: {
      slug: conferenceSlug,
      token: storeToken,
    },
    onError: e => error(`Cannot fetch details for order refund. Reason - ${e.message}`),
    skip: !id || !storeId,
    variables: {
      id,
      storeId,
    },
  })

  return {
    commerceOrder: data?.commerceGetOrder,
    loading,
  }
}

export default useSingleCommerceOrderQuery
