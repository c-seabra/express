import { ApolloError, useQuery } from '@apollo/client';

import { useAppContext } from '../../components/app/AppContext';
import TICKET from '../../operations/queries/Ticket';
import { Ticket } from '../types';

const useSingleTicketQuery = ({ reference }: { reference: string }) => {
  const { slug, token } = useAppContext();

  const {
    loading,
    error,
    data,
  }: {
    data?: {
      ticket: Ticket;
    };
    error?: ApolloError;
    loading?: boolean;
  } = useQuery(TICKET, {
    context: {
      slug,
      token,
    },
    variables: {
      reference,
    },
  });

  return {
    error,
    loading,
    ticket: data?.ticket,
  };
};

export default useSingleTicketQuery;
