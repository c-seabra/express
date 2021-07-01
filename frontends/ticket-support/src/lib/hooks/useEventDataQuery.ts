import { useQuery } from '@apollo/client';
import { useAppContext } from '@websummit/graphql/src/utils/AppContext';

import EVENT_DATA from '../../operations/queries/EventData';
import { EventData } from '../types';

const useEventDataQuery = () => {
  const { slug } = useAppContext();

  const { data, error, loading } = useQuery<{ taEvent: EventData }>(
    EVENT_DATA,
    {
      skip: !slug,
      variables: { slug },
    },
  );

  return {
    error,
    event: data?.taEvent,
    loading,
  };
};

export default useEventDataQuery;
