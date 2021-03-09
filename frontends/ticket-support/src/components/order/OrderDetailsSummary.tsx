import { ApolloError } from '@apollo/client';
import { Order } from '@websummit/graphql/src/@types/operations';
import React, { ReactElement } from 'react';
import styled from 'styled-components';

import ContainerCard from '../../lib/components/atoms/ContainerCard';
import Table, { ColumnDescriptor } from '../../lib/components/molecules/Table';
import { Spacing } from '../../lib/components/templates/Spacing';
import Loader from '../../lib/Loading';
import { formatSourceOfSale } from '../../lib/utils/formatSourceOfSale';
import { formatDefaultDateTime } from '../../lib/utils/time';
import Warning from '../ticketActions/Warning';
import StatePlate from '../ticketItem/StatePlate';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

// Currently, the `Order` entity from Ticket Assignment (which we are displaying here)
// does not have a `currencySymbol` attribute as opposed to `CommerceOrder`.
// This is why this function exists
const toCurrencySymbol = (currency = '') => {
  switch (currency.toLowerCase()) {
    case 'eur':
      return '€';
    case 'usd':
      return '$';
    default:
      return currency;
  }
};

const orderDetailsTableShape: ColumnDescriptor<Order>[] = [
  {
    header: 'Order reference #',
    renderCell: (order) => order.reference,
  },
  {
    header: 'Last updated',
    renderCell: (order) => formatDefaultDateTime(order?.lastUpdatedAt),
  },
  {
    header: 'Date created',
    renderCell: (order) => formatDefaultDateTime(order?.completedAt),
  },
  {
    header: 'Source of sale',
    renderCell: (order) => formatSourceOfSale(order?.source || ''),
  },
  {
    header: 'Order status',
    renderCell: (order) => <StatePlate state={order?.state} />,
  },
  {
    header: 'Total (incl. Tax)',
    renderCell: (order) => (
      <>
        {toCurrencySymbol(order?.currency)}&nbsp;{order?.amount}
      </>
    ),
  },
];

type Props = {
  error?: ApolloError;
  loading: boolean;
  order?: Order | null;
};

const OrderDetailsSummary = ({
  loading,
  error,
  order,
}: Props): ReactElement => {
  return (
    <ContainerCard noPadding title="Order details">
      <StyledContainer>
        {loading && (
          <Spacing top="2rem">
            <Loader />
          </Spacing>
        )}
        {error && (
          <Warning>
            <span>{error.message}</span>
          </Warning>
        )}
        {!loading && !error && order && (
          <Table<Order> items={[order]} tableShape={orderDetailsTableShape} />
        )}
      </StyledContainer>
    </ContainerCard>
  );
};

export default OrderDetailsSummary;
