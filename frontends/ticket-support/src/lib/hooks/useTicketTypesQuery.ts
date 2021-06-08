import { ApolloError, useQuery } from '@apollo/client';

import { useAppContext } from '../../components/app/AppContext';
import TICKET_TYPES from '../../operations/queries/TicketTypes';
import { TicketType } from '../types';

const useTicketTypesQuery = (): TicketType[] => {
  const { slug, token } = useAppContext();

  const {
    data: ticketTypesData,
  }: {
    data?: {
      ticketTypes: {
        edges: [
          {
            node: TicketType;
          },
        ];
      };
    };
    error?: ApolloError;
    loading?: boolean;
  } = useQuery(TICKET_TYPES, {
    context: {
      slug,
      token,
    },
  });

  return (
    ticketTypesData?.ticketTypes.edges.map(({ node: { id, name } }) => ({
      id,
      name,
    })) || []
  );
};

export default useTicketTypesQuery;
