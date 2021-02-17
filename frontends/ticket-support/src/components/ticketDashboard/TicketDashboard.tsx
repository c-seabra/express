import React, { KeyboardEvent, ReactElement, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

import ContainerCard from '../../lib/components/atoms/ContainerCard';
import FilterButton from '../../lib/components/atoms/FilterButton';
import TextHeading from '../../lib/components/atoms/Heading';
import CategoryList, {
  CategoryItem,
} from '../../lib/components/molecules/CategoryList';
import PopupButton from '../../lib/components/molecules/PopupButton';
import useSearchState from '../../lib/hooks/useSearchState';
import useTicketsQuery from '../../lib/hooks/useTicketsQuery';
import useTicketTypesQuery from '../../lib/hooks/useTicketTypesQuery';
import Pagination from '../../lib/Pagination';
import { TicketStatus } from '../../lib/types';
import TicketList from '../ticketList/TicketList';
import TicketTypesCategoryList from '../ticketTypesCategoryList/TicketTypesCategoryList';
import {
  DashboardContainer,
  FiltersSearchContainer,
  PopupFiltersContainer,
  SearchFilters,
  StyledSearchInput,
} from './TicketDashboard.styled';

type TicketSearchState = {
  page: string;
  searchQuery: string;
  ticketStatus?: string;
  ticketTypeIds?: string;
};

const TicketDashboard = (): ReactElement => {
  const [searchQuery, setSearchQuery] = useState('');

  const processInitialSearchState = (state: TicketSearchState) => {
    if (state.searchQuery) setSearchQuery(state.searchQuery);
  };

  const { searchState, setSearchState } = useSearchState<TicketSearchState>({
    processInitialSearchState,
  });

  const {
    results,
    currentPage,
    error,
    loading,
    isForwardDisabled,
    isBackwardsDisabled,
    nextPage,
    previousPage,
  } = useTicketsQuery({
    initialPage: searchState.page,
    searchQuery: searchState.searchQuery,
    status: searchState.ticketStatus,
    ticketTypeIds: searchState?.ticketTypeIds?.split(','),
  });

  useEffect(() => {
    if (currentPage) {
      setSearchState({ ...searchState, page: currentPage });
    }
  }, [currentPage]);

  const ticketStatusOptions = [
    ...Object.entries(TicketStatus).map(([key, value]) => ({
      isSelected: key === searchState.ticketStatus,
      label: value,
      value: key,
    })),
    { isSelected: false, label: 'All', value: 'all' },
  ];

  const handleSearchKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const element = e.currentTarget as HTMLInputElement;
      setSearchState({ ...searchState, searchQuery: element.value });
    }
  };

  const handleTicketStatusFilterChange = ({
    isSelected,
    value,
  }: CategoryItem) => {
    if (isSelected) {
      if (value === 'all') {
        setSearchState((prevState) => ({
          ...prevState,
          ticketStatus: undefined,
        }));
      } else {
        setSearchState((prevState) => ({ ...prevState, ticketStatus: value }));
      }
    } else {
      setSearchState((prevState) => ({
        ...prevState,
        ticketStatus: undefined,
      }));
    }
  };

  const handleTicketTypesFilterChange = (selectedTypes: string[]) =>
    setSearchState((prevState) => ({
      ...prevState,
      ticketTypeIds:
        selectedTypes?.length > 0 ? selectedTypes.join(',') : undefined,
    }));

  const ticketTypes = useTicketTypesQuery();

  return (
    <DashboardContainer>
      <Helmet>
        <title>Tickets list - Ticket machine</title>
      </Helmet>
      <SearchFilters>
        <TextHeading>Manage tickets</TextHeading>
        <FiltersSearchContainer>
          <StyledSearchInput
            defaultValue={searchQuery}
            placeholder="Search by name, reference or email of ticket or order"
            type="text"
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearchKey}
          />
          <PopupButton renderButton={(props) => <FilterButton {...props} />}>
            <PopupFiltersContainer>
              <TicketTypesCategoryList
                initialValues={searchState?.ticketTypeIds?.split(',')}
                ticketTypes={ticketTypes}
                onTicketTypeFilterChange={handleTicketTypesFilterChange}
              />
              <CategoryList
                headerColor="#CB1977"
                items={ticketStatusOptions}
                title="Ticket status"
                onSingleClick={handleTicketStatusFilterChange}
              />
            </PopupFiltersContainer>
          </PopupButton>
        </FiltersSearchContainer>
      </SearchFilters>
      <ContainerCard noPadding>
        <TicketList error={error} list={results} loading={loading} />
      </ContainerCard>
      {!loading && !error && (
        <Pagination
          isForwardDisabled={isForwardDisabled}
          isPreviousDisabled={isBackwardsDisabled}
          nextPage={nextPage}
          previousPage={previousPage}
        />
      )}
    </DashboardContainer>
  );
};

export default TicketDashboard;
