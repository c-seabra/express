import { CommerceOrder } from '@websummit/graphql/src/@types/operations';
import React, { ReactElement } from 'react';
import styled from 'styled-components';

import ContainerCard from '../../lib/components/atoms/ContainerCard';
import Loader from '../../lib/Loading';
import Warning from '../ticketActions/Warning';
import { ApolloError } from '@apollo/client';

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

const TicketReference = styled(ColumnStyles)`
  width: 15%;
  color: #0067e9;
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
    <Column>Order reference</Column>
    <Column>Ticket type</Column>
    <Column>Quantity</Column>
    <Column>Ticket value</Column>
    <Column>Discount code</Column>
    <Column>Complimentary sale</Column>
    <Column>Payment method</Column>
  </ListHeaderItem>
);

type Props = {
  commerceOrder?: CommerceOrder;
  error?: ApolloError;
  loading: boolean;
  orderReference?: string;
};

const missingDataAbbr = 'N/A';

const OrderDetailsSummary = ({
  loading,
  error,
  orderReference,
  commerceOrder,
}: Props): ReactElement => {
  return (
    <ContainerCard color="#654DA0" title="Order details">
      <>
        {loading && <Loader />}
        {error && (
          <Warning>
            <span>{error.message}</span>
          </Warning>
        )}

        <StyledContainer>
          {!loading &&
            !error &&
            commerceOrder &&
            commerceOrder?.items?.map((item) => (
              <div key={item.id}>
                <OrderDetilsSummaryHeader />
                <StyledListItem>
                  <TicketReference>{orderReference}</TicketReference>
                  <Column>{item.itemName}</Column>
                  <Column>{item.quantity}</Column>
                  <Column>{item.price}</Column>
                  <Column>{missingDataAbbr}</Column>
                  <Column>{missingDataAbbr}</Column>
                  <Column>{commerceOrder?.paymentMethod?.name}</Column>
                </StyledListItem>
              </div>
            ))}
        </StyledContainer>
      </>
    </ContainerCard>
  );
};

export default OrderDetailsSummary;
