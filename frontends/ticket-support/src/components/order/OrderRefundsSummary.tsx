import ContainerCard from '@websummit/components/src/molecules/ContainerCard';
import Table, {
  ColumnDescriptor,
} from '@websummit/components/src/molecules/Table';
import { CommerceTransaction } from '@websummit/graphql/src/@types/operations';
import React, { useMemo } from 'react';

import { formatDisplayPrice } from '../../lib/utils/price';
import { formatDefaultDateTime } from '../../lib/utils/time';
import StatePlate from '../ticketItem/StatePlate';

type OrderRefundsSummaryProps = {
  currencySymbol?: string | null;
  refunds: CommerceTransaction[];
};

const tableShape = (
  currencySymbol?: string | null,
): ColumnDescriptor<CommerceTransaction>[] => [
  {
    header: 'Refund date',
    renderCell: (refund) => formatDefaultDateTime(refund?.createdAt || ''),
    width: '20%',
  },
  {
    header: 'Refund amount',
    renderCell: (refund) => (
      <>
        {currencySymbol || refund?.currency}&nbsp;
        {formatDisplayPrice(refund?.amount)}
      </>
    ),
    width: '20%',
  },
  {
    header: 'Status',
    renderCell: (refund) => <StatePlate state={refund?.status || ''} />,
  },
  {
    header: 'Type',
    renderCell: (refund) => refund.type,
  },
  {
    header: 'Refund method',
    renderCell: (refund) => refund?.paymentMethod?.name,
  },
];

const OrderRefundsSummary = ({
  currencySymbol,
  refunds,
}: OrderRefundsSummaryProps) => {
  const transactionsTableShape = useMemo(
    () => tableShape(currencySymbol),
    [currencySymbol],
  );

  return (
    <ContainerCard noPadding title="Order refunds summary">
      <Table<CommerceTransaction>
        items={refunds}
        tableShape={transactionsTableShape}
      />
    </ContainerCard>
  );
};

export default OrderRefundsSummary;
