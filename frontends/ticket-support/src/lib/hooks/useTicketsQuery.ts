import { ApolloError } from '@apollo/client';
import { useErrorSnackbar } from '@websummit/components/src/molecules/Snackbar';
import { Ticket } from '@websummit/graphql/src/@types/operations';
import OrderTicketsQuery from '@websummit/graphql/src/operations/queries/OrderTicketsQuery';
import Tickets from '@websummit/graphql/src/operations/queries/Tickets';

import { useRequestContext } from '../../components/app/AppContext';
import usePaginatedQuery from './usePaginatedQuery';

const TICKETS_PER_PAGE = 20;

const useTicketsQuery = ({
  initialPage,
  orderId,
  perPage = TICKETS_PER_PAGE,
  searchQuery,
  status,
  skip,
  ticketTypeIds,
}: {
  initialPage?: string;
  onError?: (error: ApolloError) => void;
  orderId?: string;
  perPage?: number;
  searchQuery?: string;
  skip?: boolean;
  status?: string;
  ticketTypeIds?: string[];
}) => {
  const context = useRequestContext();
  const error = useErrorSnackbar();

  const variables = {
    filter: {
      status,
      ticketTypeIds,
    },
    first: perPage,
    orderId,
    searchQuery,
  };

  const query = orderId ? OrderTicketsQuery : Tickets;

  return usePaginatedQuery<Ticket, 'tickets', typeof variables, typeof context>(
    {
      context,
      initialPage,
      onError: (e) => error(e.message),
      query,
      skip,
      variables,
    },
  );
};

export default useTicketsQuery;
