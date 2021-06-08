import Orders from '@websummit/graphql/src/operations/queries/Orders';

import { useRequestContext } from '../../components/app/AppContext';
import { Order } from '../types';
import usePaginatedQuery from './usePaginatedQuery';

const ORDERS_PER_PAGE = 20;

type UseOrdersQueryArgs = {
  createdAtFrom?: string;
  createdAtTo?: string;
  initialPage: string;
  onError?: any;
  perPage?: number;
  searchQuery?: string;
  status?: string;
  ticketTypeIds?: string[];
};

const useOrdersQuery = ({
  createdAtFrom,
  createdAtTo,
  initialPage,
  perPage = ORDERS_PER_PAGE,
  searchQuery,
  status,
  ticketTypeIds = [],
  onError,
}: UseOrdersQueryArgs) => {
  const context = useRequestContext();

  const filter = {
    createdAtFrom,
    createdAtTo,
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
    onError,
    query: Orders,
    variables,
  });
};

export default useOrdersQuery;
