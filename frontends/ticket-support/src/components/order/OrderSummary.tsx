import { ApolloError } from '@apollo/client';
import {
  CommerceOrder,
  CommerceOrderItem,
  CommerceTaxRateType,
} from '@websummit/graphql/src/@types/operations';
import React, { ReactElement, useMemo } from 'react';
import styled from 'styled-components';

import ContainerCard from '../../lib/components/atoms/ContainerCard';
import Table, { ColumnDescriptor } from '../../lib/components/molecules/Table';
import Loader from '../../lib/Loading';
import { Spacing } from '../templates/Spacing';
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
    renderCell: (item) => (
      <>
        {commerceOrder?.currencySymbol}&nbsp;
        {item.priceIncludingTax}
      </>
    ),
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
            <span>{error}</span>
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

export default OrderSummary;
