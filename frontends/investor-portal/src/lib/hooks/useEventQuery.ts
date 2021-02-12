import { useQuery } from '@apollo/client'

import { useAppContext } from '../../components/app/AppContext'
import EVENT_QUERY from '../../operations/queries/Event'
import { Event, UserError } from '../types'

type EventData = {
  data: {
    event: Event
    userErrors: UserError[]
  }
}

const useEventQuery = () => {
  const { conferenceSlug, token } = useAppContext()

  const { data, error, loading } = useQuery<EventData>(EVENT_QUERY, {
    context: { slug: conferenceSlug, token },
  })

  return {
    data,
    error,
    loading,
  }
}

export default useEventQuery
