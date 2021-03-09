import { ApolloError } from '@apollo/client';
import {
  CommerceOrder,
  CommerceOrderItem,
  CommerceTaxRateType,
  Order,
} from '@websummit/graphql/src/@types/operations';
import React, { ReactElement, useMemo } from 'react';
import styled from 'styled-components';

import ContainerCard from '../../lib/components/atoms/ContainerCard';
import Table, { ColumnDescriptor } from '../../lib/components/molecules/Table';
import { Spacing } from '../../lib/components/templates/Spacing';
import Loader from '../../lib/Loading';
import { formatDisplayPrice } from '../../lib/utils/price';
import Warning from '../ticketActions/Warning';

// Containers
const StyledContainer = styled.div`
  display: flex;
`;

type Props = {
  commerceOrder: CommerceOrder;
  error?: ApolloError;
  loading: boolean;
};

const missingDataAbbr = 'N/A';

const commerceOrderTable = (
  commerceOrder?: CommerceOrder,
): ColumnDescriptor<CommerceOrderItem>[] => [
  {
    header: 'Ticket type',
    renderCell: (item) => item.itemName,
  },
  {
    header: 'Quantity',
    renderCell: (item) => item.quantity,
  },
  {
    header: 'Tax',
    renderCell: (item) => (
      <>
        {item.tax?.name}&nbsp;{item.tax?.rateAmount}
        {item.tax?.rateType === CommerceTaxRateType.Percentage && '%'}
        &nbsp;({item.tax?.country})
      </>
    ),
  },
  {
    header: 'Ticket value (incl. Tax)',
    renderCell: ({ total, quantity }: CommerceOrderItem) => {
      const pricePerItem = total ? formatDisplayPrice(total / quantity) : 'N/A';

      return (
        <>
          {commerceOrder?.currencySymbol}&nbsp;
          {pricePerItem}
        </>
      );
    },
  },
  {
    header: 'Discount code',
    renderCell: () => missingDataAbbr,
  },
  {
    header: 'Complimentary sale',
    renderCell: () => missingDataAbbr,
  },
  {
    header: 'Payment method',
    renderCell: () => <>{commerceOrder?.paymentMethod?.name}</>,
  },
];

const OrderSummary = ({
  loading,
  error,
  commerceOrder,
}: Props): ReactElement => {
  const commerceOrderTableShape = useMemo(
    () => commerceOrderTable(commerceOrder),
    [commerceOrder],
  );

  return (
    <ContainerCard noPadding title="Order summary">
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

        {!loading && !error && (
          <Table<CommerceOrderItem>
            items={commerceOrder?.items}
            tableShape={commerceOrderTableShape}
          />
        )}
      </StyledContainer>
    </ContainerCard>
  );
};

const titoOrderTableShape: ColumnDescriptor<Order>[] = [
  {
    header: 'Ticket type',
    renderCell: (order) => order?.summary?.ticketType?.name,
  },
  {
    header: 'Quantity',
    renderCell: (order) => order?.ticketsSummary?.all?.count,
  },
];

type TitoOrderSummaryProps = {
  error: ApolloError | undefined;
  loading: boolean;
  order?: Order | null;
};

export const TitoOrderSummary = ({
  order,
  loading,
  error,
}: TitoOrderSummaryProps) => {
  return (
    <ContainerCard noPadding title="Order summary">
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
          <Table<Order> items={[order]} tableShape={titoOrderTableShape} />
        )}
      </StyledContainer>
    </ContainerCard>
  );
};

export default OrderSummary;
