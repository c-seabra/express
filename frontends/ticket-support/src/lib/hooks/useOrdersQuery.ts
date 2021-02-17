import { useAppContext } from '../../components/app/AppContext';
import ORDER_LIST from '../../operations/queries/OrderList';
import { Order } from '../types';
import usePaginatedQuery from './usePaginatedQuery';

const ORDERS_PER_PAGE = 20;

const useOrdersQuery = ({
  initialPage,
  perPage = ORDERS_PER_PAGE,
  searchQuery,
  status,
  ticketTypeIds = [],
}: {
  initialPage: string;
  perPage?: number;
  searchQuery?: string;
  status?: string;
  ticketTypeIds?: string[];
}) => {
  const { conferenceSlug, token } = useAppContext();

  const context = {
    slug: conferenceSlug,
    token,
  };

  const filter = {
    status,
    ticketTypeIds: ticketTypeIds?.length > 0 ? ticketTypeIds : undefined,
  };

  const variables = {
    filter,
    first: perPage,
    searchQuery,
  };

  return usePaginatedQuery<Order, 'orders', typeof variables, typeof context>({
    context,
    initialPage,
    query: ORDER_LIST,
    variables,
  });
};

export default useOrdersQuery;
