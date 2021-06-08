import { ApolloError } from '@apollo/client';
import { UnstyledButton } from '@websummit/components/src/atoms/Button';
import ContainerCard from '@websummit/components/src/molecules/ContainerCard';
import PopupButton from '@websummit/components/src/molecules/PopupButton';
import { SimpleSelect } from '@websummit/components/src/molecules/Select';
import { useErrorSnackbar } from '@websummit/components/src/molecules/Snackbar';
import useSearchState from '@websummit/glue/src/lib/hooks/useSearchState';
import useGetEventTimeZone from '@websummit/graphql/src/hooks/useGetEventTimeZone';
import { DateTime } from 'luxon';
import React, { KeyboardEvent, ReactElement, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';
import styled, { css } from 'styled-components';

import FilterButton from '../../lib/components/atoms/FilterButton';
import TextHeading from '../../lib/components/atoms/Heading';
import CategoryList, {
  CategoryItem,
} from '../../lib/components/molecules/CategoryList';
import useOrdersQuery from '../../lib/hooks/useOrdersQuery';
import useTicketTypesQuery from '../../lib/hooks/useTicketTypesQuery';
import Pagination from '../../lib/Pagination';
import { OrderState } from '../../lib/types';
import OrdersTable from '../orderList/OrdersTable';
import {
  DashboardContainer,
  FiltersSearchContainer,
  PopupFiltersContainer,
  SearchFilters,
  StyledSearchInput,
} from '../ticketDashboard/TicketDashboard.styled';
import TicketTypesCategoryList from '../ticketTypesCategoryList/TicketTypesCategoryList';
import DateRangeFilter from './DateRangeFilter';

const StyledSimpleSelect = styled(SimpleSelect)<{ selected?: boolean }>`
  min-height: 36px;
  max-height: 36px;
  width: 240px;
  border-radius: 4px;

  &:disabled {
    background-color: #fff;
    cursor: pointer;
  }

  ${(props) =>
    props.selected
      ? css`
          &:disabled {
            color: #0067e9;
          }
        `
      : ''}
`;

const DEFAULT_DATE_FORMAT = 'dd.MM.yyyy';

const dateToSearchState = (date?: DateTime | null) =>
  date?.toFormat(DEFAULT_DATE_FORMAT) || '';

const searchStateToDate = (dateText?: string) =>
  dateText ? DateTime.fromFormat(dateText, DEFAULT_DATE_FORMAT) : null;

type OrderSearchState = {
  createdAtFrom?: string;
  createdAtTo?: string;
  orderState?: string;
  page: string;
  searchQuery?: string;
  ticketTypeIds?: string;
};

const OrdersDashboard = (): ReactElement => {
  const history = useHistory();
  const errSnackbar = useErrorSnackbar();
  const [searchQuery, setSearchQuery] = useState('');
  const [dates, setDates] = useState<{
    end?: DateTime | null;
    start?: DateTime | null;
  }>({});

  const selectedDateRangeText =
    dates?.start || dates?.end
      ? `${dates?.start?.toFormat(DEFAULT_DATE_FORMAT) || ''} - ${
          dates?.end?.toFormat(DEFAULT_DATE_FORMAT) || ''
        }`
      : null;

  const processInitialSearchState = (state: OrderSearchState) => {
    if (state.searchQuery) setSearchQuery(state.searchQuery);
    setDates({
      end: searchStateToDate(state?.createdAtTo),
      start: searchStateToDate(state?.createdAtFrom),
    });
  };

  const { searchState, setSearchState } = useSearchState<OrderSearchState>({
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
    resetPage,
  } = useOrdersQuery({
    createdAtFrom: dates?.start?.toISODate(),
    createdAtTo: dates?.end?.toISODate(),
    initialPage: searchState.page,
    onError: (e: ApolloError) => errSnackbar(e.message),
    searchQuery: searchState.searchQuery,
    status: searchState.orderState,
    ticketTypeIds: searchState?.ticketTypeIds?.split(','),
  });

  const onFilter = () => {
    resetPage();
    setSearchState((prevState) => ({ ...prevState, page: '' }));
  };

  const onDateRangeChange = ({
    end,
    start,
  }: {
    end?: DateTime | null;
    start?: DateTime | null;
  }) => {
    setDates({ end, start });

    setSearchState((prevState) => ({
      ...prevState,
      createdAtFrom: dateToSearchState(start),
      createdAtTo: dateToSearchState(end),
    }));

    onFilter();
  };

  useEffect(() => {
    if (currentPage) {
      setSearchState({ ...searchState, page: currentPage });
    }
    // todo: I hope we know what we are doing here
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const orderStatusOptions = [
    ...Object.keys(OrderState).map((key) => ({
      isSelected: key === searchState.orderState,
      label: key.charAt(0).toUpperCase() + key.slice(1).toLowerCase(),
      value: key,
    })),
    { isSelected: false, label: 'All', value: 'all' },
  ];

  const handleSearchKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const element = e.currentTarget as HTMLInputElement;
      setSearchState((prevState) => ({
        ...prevState,
        searchQuery: element.value,
      }));
      setSearchQuery(element.value);

      onFilter();
    }
  };

  const handleOrderStatusFilterChange = ({
    isSelected,
    value,
  }: CategoryItem) => {
    if (isSelected) {
      if (value === 'all') {
        setSearchState((prevState) => ({
          ...prevState,
          orderState: undefined,
        }));
      } else {
        setSearchState((prevState) => ({ ...prevState, orderState: value }));
      }
    } else {
      setSearchState((prevState) => ({ ...prevState, orderState: undefined }));
    }

    onFilter();
  };

  const handleTicketTypesFilterChange = (selectedTypes: string[]) => {
    setSearchState((prevState) => ({
      ...prevState,
      ticketTypeIds:
        selectedTypes?.length > 0 ? selectedTypes.join(',') : undefined,
    }));

    onFilter();
  };

  const ticketTypes = useTicketTypesQuery();

  const eventTimeZone = useGetEventTimeZone();
  const { ianaName } = eventTimeZone || {};

  const redirectToOrder = (id: string) => {
    history.push(`/order/${id}`);
  };
  const onRowClick = (event: any) => {
    redirectToOrder(event.reference);
  };

  return (
    <DashboardContainer>
      <Helmet>
        <title>Orders list - Ticket machine</title>
      </Helmet>
      <SearchFilters>
        <TextHeading>Manage orders</TextHeading>
        <FiltersSearchContainer>
          <StyledSearchInput
            defaultValue={searchQuery}
            placeholder="Search by Order number, order owner’s name or email, company name."
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearchKey}
          />
          <PopupButton
            noPadding
            renderButton={({ onClick }) => (
              <UnstyledButton type="button" onClick={onClick}>
                <StyledSimpleSelect
                  disabled
                  options={[
                    {
                      label: selectedDateRangeText || 'Select date',
                      value: 'select-date',
                    },
                  ]}
                  selected={!!(dates?.start || dates?.end)}
                  value="select-date"
                />
              </UnstyledButton>
            )}
            renderContents={({ closePopup }) => (
              <DateRangeFilter
                selectedDates={dates}
                onApply={({ start, end }) => {
                  onDateRangeChange({ end, start });
                  closePopup();
                }}
                onCancel={closePopup}
              />
            )}
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
                items={orderStatusOptions}
                title="Order status"
                onSingleClick={handleOrderStatusFilterChange}
              />
            </PopupFiltersContainer>
          </PopupButton>
        </FiltersSearchContainer>
      </SearchFilters>
      <ContainerCard noPadding>
        <OrdersTable
          ianaName={ianaName}
          loading={loading}
          orders={results}
          onRowClick={onRowClick}
        />
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

export default OrdersDashboard;
