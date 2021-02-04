import { useQuery } from '@apollo/client'

import { useAppContext } from '../../components/app/AppContext'
import ORDER_QUERY, { OrderByRefQuery } from '../../operations/queries/OrderByRef'

const useSingleOrderQuery = ({ orderRef }: { orderRef: string }) => {
  const { conferenceSlug, token } = useAppContext()

  const { loading, error, data }: OrderByRefQuery = useQuery(ORDER_QUERY, {
    context: {
      slug: conferenceSlug,
      token,
    },
    variables: {
      reference: orderRef,
    },
  })

  return {
    error,
    loading,
    order: data?.order,
  }
}

export default useSingleOrderQuery
