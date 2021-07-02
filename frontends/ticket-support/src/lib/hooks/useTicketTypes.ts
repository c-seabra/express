import { useTicketTypesQuery } from '@websummit/graphql/src/@types/operations';
import { useRequestContext } from '@websummit/graphql/src/utils/AppContext';

import { TicketType } from '../types';

const useTicketTypes = (): TicketType[] => {
  const context = useRequestContext();
  const { data: ticketTypesData } = useTicketTypesQuery({
    context,
  });

  return (
    ticketTypesData?.ticketTypes.edges.map(({ node: { id, name } }) => ({
      id,
      name,
    })) || []
  );
};

export default useTicketTypes;
