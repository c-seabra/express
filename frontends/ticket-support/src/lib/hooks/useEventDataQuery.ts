import { useQuery } from '@apollo/client'

import { useAppContext } from '../../components/app/AppContext'
import EVENT_DATA from '../../operations/queries/EventData'
import { EventData } from '../types'

const useEventDataQuery = () => {
  const { conferenceSlug } = useAppContext()

  const { data, error, loading } = useQuery<{ taEvent: EventData }>(EVENT_DATA, {
    variables: { slug: conferenceSlug },
  })

  return {
    error,
    event: data?.taEvent,
    loading,
  }
}

export default useEventDataQuery
