import { useAppContext } from '../../components/app/AppContext';
import TICKET_LIST from '../../operations/queries/TicketList';
import { Ticket } from '../types';
import usePaginatedQuery from './usePaginatedQuery';

const TICKETS_PER_PAGE = 20;

const useTicketsQuery = ({
  initialPage,
  perPage = TICKETS_PER_PAGE,
  searchQuery,
  status,
  ticketTypeIds,
}: {
  initialPage: string;
  perPage?: number;
  searchQuery: string;
  status?: string;
  ticketTypeIds?: string[];
}) => {
  const { conferenceSlug, token } = useAppContext();

  const variables = {
    filter: {
      status,
      ticketTypeIds,
    },
    first: perPage,
    searchQuery,
  };

  const context = {
    slug: conferenceSlug,
    token,
  };

  return usePaginatedQuery<Ticket, 'tickets', typeof variables, typeof context>(
    {
      context,
      initialPage,
      query: TICKET_LIST,
      variables,
    },
  );
};

export default useTicketsQuery;
