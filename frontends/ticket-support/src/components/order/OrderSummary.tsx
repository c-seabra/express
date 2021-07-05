import { ApolloError } from '@apollo/client';
import ContainerCard from '@websummit/components/src/molecules/ContainerCard';
import Table, {
  ColumnDescriptor,
} from '@websummit/components/src/molecules/Table';
import { Spacing } from '@websummit/components/src/templates/Spacing';
import {
  CommerceOrder,
  CommerceOrderItem,
  CommerceTaxRateType,
  Order,
} from '@websummit/graphql/src/@types/operations';
// todo: cross frontent import to be fixed
import { externalPaymentMethods } from '../../../../events/src/lib/constants/paymentGateways';
import React, { ReactElement, useMemo } from 'react';
import styled from 'styled-components';

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

const isComplementary = (order?: CommerceOrder) => {
  if (
    (order?.paymentMethod?.configuration as { type?: string })?.type ===
    externalPaymentMethods.complementary
  ) {
    return 'Yes';
  }

  return missingDataAbbr;
};

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
    renderCell: (item) =>
      item.total === 0 ? (
        missingDataAbbr
      ) : (
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
      const pricePerItem = total ? formatDisplayPrice(total / quantity) : '0';

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
    header: 'Complementary sale',
    renderCell: () => isComplementary(commerceOrder),
  },
  {
    header: 'Payment method',
    renderCell: () => (
      <>{commerceOrder?.paymentMethod?.name || missingDataAbbr}</>
    ),
  },
];

const Footer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const TotalText = styled.div`
  font-weight: 600;
  text-align: left;

  width: 15%;
`;

const Total = styled.div`
  width: 14%;
  text-align: left;
`;

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
            renderFooter={() => (
              <Footer>
                <TotalText>Order total (incl. Tax)</TotalText>
                <Total>
                  {commerceOrder?.currencySymbol}&nbsp;
                  {formatDisplayPrice(commerceOrder?.total)}
                </Total>
              </Footer>
            )}
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
