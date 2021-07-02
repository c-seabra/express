import Badge from '@websummit/components/src/atoms/Badge';
import ContainerCard from '@websummit/components/src/molecules/ContainerCard';
import Table, {
  ColumnDescriptors,
} from '@websummit/components/src/molecules/Table';
import { Order } from '@websummit/graphql/src/@types/operations';
import { switchCase } from '@websummit/tsutils/src/lib/utils/logic';
import { formatFullDateTime } from '@websummit/tsutils/src/utils/time';
import React from 'react';
import styled from 'styled-components';

import Loader from '../../lib/Loading';
import { OrderState, TicketsSummary } from '../../lib/types';

const StyledReference = styled.div`
  color: #0067e9;
`;

const LoadingContainer = styled.div`
  padding: 20px;
`;

type OrdersTableProps = {
  ianaName?: string;
  loading?: boolean;
  onRowClick?: any;
  orders: any;
};

const getTicketStatusesCount = (ticketsSummary: TicketsSummary): string => {
  if (!ticketsSummary) return '';

  const { all } = ticketsSummary;

  const assignedCounts = {
    accepted: all?.active?.assigned?.accepted?.count || 0,
    checkedIn: all?.active?.assigned?.checkedIn?.count || 0,
    duplicate: all?.active?.assigned?.duplicate?.count || 0,
    locked: all?.active?.assigned?.locked?.count || 0,
    pending: all?.active?.assigned?.pending?.count || 0,
  };

  const assignedTicketsAmount = Object.entries(assignedCounts).reduce(
    (previousValue, [, value]) => previousValue + value,
    0,
  );

  const allStateCounts = {
    ...assignedCounts,
    neverAssigned: all?.active?.unassigned?.neverAssigned?.count || 0,
    rejected: all?.active?.unassigned?.rejected?.count || 0,
    void: all?.void?.count || 0,
  };

  const allTicketsAmount = Object.entries(allStateCounts).reduce(
    (previousValue, [, value]) => previousValue + value,
    0,
  );

  return `${assignedTicketsAmount} / ${allTicketsAmount} Assigned`;
};

const OrdersTable = ({
  loading,
  orders,
  onRowClick,
  ianaName,
}: OrdersTableProps) => {
  const tableShape: ColumnDescriptors<Order> = [
    {
      header: 'Order reference',
      renderCell: (order) => (
        <StyledReference>{order?.reference || 'N/A'}</StyledReference>
      ),
    },
    {
      header: 'Creation date',
      renderCell: (order) => (
        <>
          {(order?.versions &&
            formatFullDateTime(order?.versions[0].createdAt, ianaName)) ||
            'N/A'}
        </>
      ),
    },
    {
      header: 'Ticket type',
      renderCell: (order) => {
        const ticketCount = order.ticketsSummary?.all?.count;

        return (
          <>
            {order.summary?.ticketType?.name ||
              (ticketCount > 0 && `${ticketCount} mixed tickets`)}
          </>
        );
      },
    },
    {
      header: 'Ticket owner',
      renderCell: (order) => (
        <>
          {order.owner ? (
            <>
              {order.owner?.firstName}&nbsp;{order.owner?.lastName}
            </>
          ) : (
            <>N/A</>
          )}
        </>
      ),
    },
    {
      header: 'Email used',
      renderCell: (order) => order.owner?.email || 'N/A',
    },
    {
      header: 'Ticket status',
      renderCell: (order) => {
        const assignedTicketsCount = getTicketStatusesCount(
          order.ticketsSummary,
        );

        return <>{assignedTicketsCount}</>;
      },
    },
    {
      header: 'Order state',
      renderCell: (order) => {
        const stateName = switchCase({
          [OrderState.ACTIVE]: 'Active',
          [OrderState.CANCELLED]: 'Cancelled',
        })(order.state)(order.state);

        const badge = {
          background: switchCase({
            [OrderState.ACTIVE]: '#EAF9EA',
            [OrderState.CANCELLED]: '#FDEBEB',
          })('#c6c6c6')(order.state),

          color: switchCase({
            [OrderState.ACTIVE]: '#3BB273',
            [OrderState.CANCELLED]: '#E15554',
          })('#c6c6c6')(order.state),
        };

        return (
          <Badge background={badge.background} color={badge.color}>
            {(order.state && stateName) || 'N/A'}
          </Badge>
        );
      },
    },
  ];

  return (
    <>
      <ContainerCard noPadding>
        {loading && (
          <LoadingContainer>
            {' '}
            <Loader />{' '}
          </LoadingContainer>
        )}

        {!loading && (
          <Table<any>
            items={orders}
            tableShape={tableShape}
            onRowClick={onRowClick}
          />
        )}
      </ContainerCard>
    </>
  );
};

export default OrdersTable;
