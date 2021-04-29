import usePaginatedQuery from '@websummit/graphql/src/lib/hooks/usePaginatedQuery';
import ATTENDANCES_LIST from '@websummit/graphql/src/operations/queries/Attendances';

import { useAppContext } from '../../components/app/AppContext';
import { Attendance } from '../types';

const ATTENDANCES_PER_PAGE = 5;

const useAttendancesQuery = ({
  perPage = ATTENDANCES_PER_PAGE,
  searchQuery,
}: {
  perPage?: number;
  searchQuery?: string;
}) => {
  const { conferenceSlug, token } = useAppContext();

  const context = {
    slug: conferenceSlug,
    token,
  };

  const variables = {
    first: perPage,
    searchQuery,
  };

  return usePaginatedQuery<
    Attendance,
    'attendances',
    typeof variables,
    typeof context
  >({
    context,
    query: ATTENDANCES_LIST,
    variables,
  });
};

export default useAttendancesQuery;
