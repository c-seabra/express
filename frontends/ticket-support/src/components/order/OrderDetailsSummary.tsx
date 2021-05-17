import { ApolloError } from '@apollo/client';
import ContainerCard from '@websummit/components/src/molecules/ContainerCard';
import Table, {
  ColumnDescriptor,
} from '@websummit/components/src/molecules/Table';
import { Spacing } from '@websummit/components/src/templates/Spacing';
import { Order } from '@websummit/graphql/src/@types/operations';
import React, { ReactElement } from 'react';
import styled from 'styled-components';

import Loader from '../../lib/Loading';
import { formatSourceOfSale } from '../../lib/utils/formatSourceOfSale';
import { formatDefaultDateTime } from '../../lib/utils/time';
import Warning from '../ticketActions/Warning';
import StatePlate from '../ticketItem/StatePlate';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

type OrderActions = {
  invoiceRedirect: any;
};
type ExtendedOrder = Order & OrderActions;

const orderDetailsTableShape: ColumnDescriptor<ExtendedOrder>[] = [
  {
    header: 'Order reference',
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
    header: 'Invoice .pdf',
    renderCell: (order) => {
      console.log('order', order);
      return (
        <>
          {order?.invoiceUrl ? (
            <a href={order?.invoiceUrl || '#'} rel="noreferrer" target="_blank">
              Download
            </a>
          ) : (
            <span>N/A</span>
          )}
        </>
      );
    },
  },
  {
    header: 'Invoice',
    renderCell: (order) => {
      return <a onClick={order.invoiceRedirect}>View</a>;
    },
  },
];

type Props = {
  error?: ApolloError;
  invoiceRedirect: any;
  loading: boolean;
  order?: Order | null;
};

const OrderDetailsSummary = ({
  loading,
  error,
  order,
  invoiceRedirect,
}: Props): ReactElement => {
  const orderWithActions: any = {
    ...order,
    invoiceRedirect,
  };
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
          <Table<ExtendedOrder>
            items={[orderWithActions]}
            tableShape={orderDetailsTableShape}
          />
        )}
      </StyledContainer>
    </ContainerCard>
  );
};

export default OrderDetailsSummary;
