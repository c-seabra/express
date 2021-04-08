import usePaginatedQuery from '../../../../investor-portal/src/lib/hooks/usePaginatedQuery';
import { Attendance } from '../../../../investor-portal/src/lib/types';
import ATTENDANCES_LIST from '../../../../investor-portal/src/operations/queries/Attendances';
import { useAppContext } from '../../components/app/AppContext';

const ATTENDANCES_PER_PAGE = 10;

const useAttendancesQuery = ({
  initialPage,
  perPage = ATTENDANCES_PER_PAGE,
  searchQuery,
}: {
  initialPage: string;
  perPage?: number;
  searchQuery?: string;
  type?: string;
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
    initialPage,
    query: ATTENDANCES_LIST,
    variables,
  });
};

export default useAttendancesQuery;
