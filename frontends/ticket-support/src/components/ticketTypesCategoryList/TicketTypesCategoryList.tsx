import React, { ReactElement } from 'react';

import CategoryList from '../../lib/components/molecules/CategoryList';
import useTicketTypesCategoryList from '../../lib/hooks/useTicketTypesCategoryList';
import { TicketType } from '../../lib/types';

type TicketTypesCategoryListProps = {
  initialValues?: string[];
  onTicketTypeFilterChange?: (selectedTypes: string[]) => void;
  ticketTypes?: TicketType[];
};

const TicketTypesCategoryList = ({
  initialValues = [],
  onTicketTypeFilterChange = () => null,
  ticketTypes,
}: TicketTypesCategoryListProps): ReactElement => {
  const { ticketTypesOptions, handleTicketTypeFilterChange } =
    useTicketTypesCategoryList({
      initialValues,
      onTicketTypeFilterChange,
      ticketTypes,
    });

  return (
    <CategoryList
      isMultiSelect
      headerColor="#654DA0"
      items={ticketTypesOptions}
      title="Ticket type"
      onMultiClick={handleTicketTypeFilterChange}
    />
  );
};

export default TicketTypesCategoryList;
