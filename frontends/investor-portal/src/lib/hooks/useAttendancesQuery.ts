import { useAppContext } from '../../components/app/AppContext';
import ATTENDANCES_LIST from '../../operations/queries/Attendances';
import { Attendance } from '../types';
import usePaginatedQuery from './usePaginatedQuery';

const ATTENDANCES_PER_PAGE = 25;
const INVESTORS_TYPE = 'INVESTOR';

const useAttendancesQuery = ({
  attendanceAppearanceSelectionsStatus,
  initialPage,
  perPage = ATTENDANCES_PER_PAGE,
  searchQuery,
  type = INVESTORS_TYPE,
}: {
  attendanceAppearanceSelectionsStatus?: string;
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

  const filter = {
    attendanceAppearanceSelectionsStatus: attendanceAppearanceSelectionsStatus?.split(
      ',',
    ),
    type,
  };

  const variables = {
    filter,
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
