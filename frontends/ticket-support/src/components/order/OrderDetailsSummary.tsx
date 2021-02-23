import { ApolloError } from '@apollo/client';
import {
  CommerceOrder,
  CommerceTaxRateType,
  Order,
} from '@websummit/graphql/src/@types/operations';
import React, { ReactElement } from 'react';
import styled from 'styled-components';

import ContainerCard from '../../lib/components/atoms/ContainerCard';
import Loader from '../../lib/Loading';
import { formatDefaultDateTime } from '../../lib/utils/time';
import { Spacing } from '../templates/Spacing';
import Warning from '../ticketActions/Warning';
import StatePlate from '../ticketItem/StatePlate';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ColumnStyles = styled.div`
  display: flex;
  align-items: center;
  padding: 0 0.25rem;
  word-break: break-word;
`;
const Column = styled(ColumnStyles)`
  width: 15%;
`;

const StyledListItem = styled.li`
  font-size: 0.85rem;
  display: flex;
  padding: 1rem 1.5rem;
  background-color: white;
  color: #0c1439;

  border-bottom: 1px solid #dde0e5;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #dde0e5;
  }
`;

const ListHeaderItem = styled(StyledListItem)`
  font-weight: 600;
  text-align: center;

  &:hover {
    background-color: white;
    cursor: initial;
  }
`;

const OrderDetilsSummaryHeader = () => (
  <ListHeaderItem>
    <Column>Ticket type</Column>
    <Column>Quantity</Column>
    <Column>Tax</Column>
    <Column>Ticket value (incl. Tax)</Column>
    <Column>Discount code</Column>
    <Column>Complimentary sale</Column>
    <Column>Payment method</Column>
  </ListHeaderItem>
);

const TitoOrderDetailsSummaryHeader = () => (
  <ListHeaderItem>
    <Column>Order reference #</Column>
    <Column>Last updated</Column>
    <Column>Date created</Column>
    <Column>Source of sale</Column>
    <Column>Order status</Column>
  </ListHeaderItem>
);

const TitoOrderDetails = ({
  order,
  orderReference,
}: {
  order?: Order;
  orderReference?: string;
}) => (
  <StyledListItem key={order?.id}>
    <Column>{orderReference}</Column>
    <Column>{formatDefaultDateTime(order?.lastUpdatedAt)}</Column>
    <Column>{formatDefaultDateTime(order?.completedAt)}</Column>
    <Column>{order?.source}</Column>
    <Column>
      <StatePlate state={order?.state} />
    </Column>
  </StyledListItem>
);

type Props = {
  commerceOrder?: CommerceOrder;
  error?: ApolloError;
  loading: boolean;
  order?: Order;
  orderReference?: string;
};

const missingDataAbbr = 'N/A';

const OrderDetailsSummary = ({
  loading,
  error,
  commerceOrder,
  order,
  orderReference,
}: Props): ReactElement => {
  return (
    <ContainerCard noPadding title="Order details">
      <StyledContainer>
        {commerceOrder ? (
          <OrderDetilsSummaryHeader />
        ) : (
          <TitoOrderDetailsSummaryHeader />
        )}
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
        {!loading &&
          !error &&
          commerceOrder &&
          commerceOrder?.items?.map((item) => (
            <StyledListItem key={item.id}>
              <Column>{item.itemName}</Column>
              <Column>{item.quantity}</Column>
              <Column>
                {item.tax?.name}&nbsp;{item.tax?.rateAmount}
                {item.tax?.rateType === CommerceTaxRateType.Percentage && '%'}
                &nbsp;({item.tax?.country})
              </Column>
              <Column>
                {commerceOrder.currencySymbol}&nbsp;
                {item.priceIncludingTax}
              </Column>
              <Column>{missingDataAbbr}</Column>
              <Column>{missingDataAbbr}</Column>
              <Column>{commerceOrder?.paymentMethod?.name}</Column>
            </StyledListItem>
          ))}
        {/* If no order from stores is present, the source of sale is probably TiTo/other */}
        {/* In that case, display whatever is in the order fetched from Ticket Assignment */}
        {!loading && !error && !commerceOrder && (
          <TitoOrderDetails order={order} orderReference={orderReference} />
        )}
      </StyledContainer>
    </ContainerCard>
  );
};

export default OrderDetailsSummary;
