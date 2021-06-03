import { useQuery } from '@apollo/client';

import { useAppContext } from '../../components/app/AppContext';
import EVENT_QUERY from '../../operations/queries/Event';
import { Event, UserError } from '../types';

type EventData = {
  event: Event;
  userErrors: UserError[];
};

const useEventQuery = () => {
  const { slug, token } = useAppContext();

  const { data, error, loading } = useQuery<EventData>(EVENT_QUERY, {
    context: { slug, token },
    variables: {
      slug,
    },
  });

  return {
    data,
    error,
    loading,
  };
};

export default useEventQuery;
