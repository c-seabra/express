import { ApolloError } from '@apollo/client';
import ContainerCard from '@websummit/components/src/molecules/ContainerCard';
import { useModalState } from '@websummit/components/src/molecules/Modal';
import Table, {
  ColumnDescriptor,
} from '@websummit/components/src/molecules/Table';
import { Order } from '@websummit/graphql/src/@types/operations';
import React, { ReactElement } from 'react';
import styled from 'styled-components';

import { Button } from '../../lib/components/atoms/Button';
import ButtonLink, { StyledLink } from '../../lib/components/atoms/ButtonLink';
import Loader from '../../lib/Loading';
import { CommerceOrder } from '../../lib/types';
import { formatSourceOfSale } from '../../lib/utils/formatSourceOfSale';
import { formatDefaultDateTime } from '../../lib/utils/time';
import Warning from '../ticketActions/Warning';
import StatePlate from '../ticketItem/StatePlate';
import OrderSendInvoiceModal from './OrderSendInvoiceModal';

const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: flex-end;
  border-top: 1px solid #dde0e5;
`;

const ContainerCentered = styled.div`
  display: flex;
  padding: 20px;
  justify-content: center;
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

type OrderActions = {
  invoiceRedirect: any;
};
type ExtendedOrder = Order & CommerceOrder & OrderActions;

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
];
const tableShapeWithInvoice: ColumnDescriptor<ExtendedOrder>[] = [
  {
    header: 'Invoice .pdf',
    renderCell: (order) => {
      return (
        <>
          {order?.invoiceUrl ? (
            <StyledLink
              download="invoice.pdf"
              href={order?.invoiceUrl || '#'}
              rel="noreferrer"
              target="_blank"
            >
              <>Download</>
            </StyledLink>
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
      return (
        <ButtonLink onClick={order.invoiceRedirect}>
          <>View</>
        </ButtonLink>
      );
    },
  },
];

type Props = {
  commerceOrder?: any | null;
  error?: ApolloError;
  invoiceRedirect: any;
  invoiceSendEmail: any;
  loading: boolean;
  loadingCommerceOrder: boolean;
  order?: Order | null;
};

const OrderDetailsSummary = ({
  loading,
  error,
  order,
  invoiceRedirect,
  invoiceSendEmail,
  commerceOrder,
  loadingCommerceOrder,
}: Props): ReactElement => {
  const orderWithActions: any = {
    ...order,
    ...commerceOrder,
    invoiceRedirect,
  };
  const { isOpen, closeModal, openModal } = useModalState();
  const defaultTableShape = orderDetailsTableShape.concat(
    tableShapeWithInvoice,
  );

  const tableShape =
    commerceOrder && commerceOrder.billed > 0
      ? defaultTableShape
      : orderDetailsTableShape;

  return (
    <ContainerCard noPadding title="Order details">
      <StyledContainer>
        <ContainerCentered>
          {loading || (loadingCommerceOrder && <Loader />)}
          {error && (
            <Warning>
              <span>{error.message}</span>
            </Warning>
          )}
        </ContainerCentered>

        {!loading && !error && order && commerceOrder && (
          <StyledContainer>
            <Table<ExtendedOrder>
              items={[orderWithActions]}
              tableShape={tableShape}
            />
            {commerceOrder.billed > 0 && (
              <Container>
                <OrderSendInvoiceModal
                  closeModal={closeModal}
                  isOpen={isOpen}
                  sendEmail={invoiceSendEmail}
                />
                <Button onClick={openModal}>Send email with invoice</Button>
              </Container>
            )}
          </StyledContainer>
        )}
      </StyledContainer>
    </ContainerCard>
  );
};

export default OrderDetailsSummary;
