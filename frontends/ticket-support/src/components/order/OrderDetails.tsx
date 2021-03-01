import {
  CommerceOrderPaymentStatus,
  CommerceTransaction,
  CommerceTransactionType,
  Order,
  Ticket,
  useOrderByRefQuery,
} from '@websummit/graphql/src/@types/operations';
import React, { ReactElement, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { Button, SecondaryButton } from '../../lib/components/atoms/Button';
import ContainerCard from '../../lib/components/atoms/ContainerCard';
import TextHeading from '../../lib/components/atoms/Heading';
import Icon from '../../lib/components/atoms/Icon';
import Link from '../../lib/components/atoms/Link';
import BoxMessage from '../../lib/components/molecules/BoxMessage';
import Breadcrumbs, {
  Breadcrumb,
} from '../../lib/components/molecules/Breadcrumbs';
import ErrorInfoModal from '../../lib/components/molecules/ErrorInfoModal';
import { useModalState } from '../../lib/components/molecules/Modal';
import useEventDataQuery from '../../lib/hooks/useEventDataQuery';
import useSingleCommerceOrderQuery from '../../lib/hooks/useSingleCommerceOrderQuery';
import Loader from '../../lib/Loading';
import { switchCase } from '../../lib/utils/logic';
import { useAppContext } from '../app/AppContext';
import OrderRefundModal from '../orderActions/OrderRefundModal';
import Warning from '../ticketActions/Warning';
import TicketList from '../ticketList/TicketList';
import OrderCancelModal from './OrderCancelModal';
import OrderDetailsSummary from './OrderDetailsSummary';
import OrderOwnerDetails from './OrderOwnerDetails';
import OrderRefundsSummary from './OrderRefundsSummary';
import OrderReinstateModal from './OrderReinstateModal';
import OrderSummary, { TitoOrderSummary } from './OrderSummary';

const PageContainer = styled.section`
  padding: 1rem;
  max-width: 1440px;
  margin: 0 auto;
  font-size: 16px;
`;

const BreadcrumbsContainer = styled.div`
  display: flex;
  margin: 20px 0 4px;
`;

export const Text = styled.div`
  border-radius: 8px;
  padding: 0.25rem;
  font-size: 1rem;
  font-weight: 400;
  a {
    color: #337ab7;
    margin: 0 0.25rem;
  }
`;

export const TextHighlight = styled.span`
  color: #337ab7;
  margin: 0 0.25rem;
`;

const SpacingBottom = styled.div`
  margin-bottom: 2.5rem;
`;

export const StyledButton = styled.button`
  margin: 0 0 1rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: 1px solid grey;
  background: white;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    background-color: grey;
    color: white;
  }
`;

const StyledRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledInnerRow = styled.div`
  display: flex;
  align-items: center;

  > * {
    margin-right: 16px;
  }
`;

const ButtonWithSpacing = styled(SecondaryButton)`
  margin-right: 16px;
`;

const OrderDetails = (): ReactElement => {
  const { orderRef } = useParams<{ orderRef: string }>();
  const { conferenceSlug, token } = useAppContext();
  const {
    openModal: openOrderCancelModal,
    isOpen: isOrderCancelModalOpen,
    closeModal: closeOrderCancelModal,
  } = useModalState();
  const {
    isOpen: isRefundModalOpen,
    closeModal: closeRefundModal,
    openModal: openRefundModal,
  } = useModalState();
  const {
    openModal: openOrderReinstateModal,
    isOpen: isOrderReinstateModalOpen,
    closeModal: closeOrderReinstateModal,
  } = useModalState();
  const {
    openModal: openTitoWarningModal,
    isOpen: isTitoWarningModalOpen,
    closeModal: closeTitoWarningModal,
  } = useModalState();

  const { data, loading, error, refetch } = useOrderByRefQuery({
    context: {
      slug: conferenceSlug,
      token,
    },
    variables: {
      reference: orderRef,
    },
  });

  const order = data?.order;
  const sourceId = order?.sourceId || '';

  const {
    commerceOrder,
    loadingCommerceOrder,
    commerceOrderError,
  } = useSingleCommerceOrderQuery({
    id: sourceId,
  });

  const owner = order?.owner;
  const tickets = order?.tickets;

  const isFromTito = (source: string): boolean => {
    return switchCase({
      TICKET_MACHINE: false,
      TITO: true,
    })(false)(source);
  };
  const isTitoOrder = order && isFromTito(order?.source || '');
  const [isOwnerDetailsEditOn, setIsOwnerDetailsEditOn] = useState(false);
  const openEditMode = () => setIsOwnerDetailsEditOn(true);
  const closeEditMode = () => setIsOwnerDetailsEditOn(false);

  const { event } = useEventDataQuery();
  const breadcrumbsRoutes: Breadcrumb[] = [
    {
      label: event?.name || 'Home',
      redirectUrl: '/',
    },
    {
      label: 'Orders',
      redirectUrl: '/orders',
    },
    {
      label: `Order ${orderRef}`,
    },
  ];

  const refunds: CommerceTransaction[] = commerceOrder?.transactions
    ?.filter(Boolean)
    ?.filter(
      (transaction) => transaction?.type === CommerceTransactionType.Refund,
    ) as CommerceTransaction[];

  return (
    <>
      <Helmet>
        <title>Manage {orderRef} order - Ticket machine</title>
      </Helmet>
      <PageContainer>
        <BreadcrumbsContainer>
          <Breadcrumbs routes={breadcrumbsRoutes} />
        </BreadcrumbsContainer>
        {loading && <Loader />}
        {error && (
          <Warning>
            <span>{error.message}</span>
          </Warning>
        )}
        {!loading && !error && (
          <div>
            <div>
              <SpacingBottom>
                <StyledRow>
                  <StyledInnerRow>
                    <TextHeading>Order management</TextHeading>
                    {isTitoOrder && (
                      <BoxMessage
                        backgroundColor="#333333"
                        color="#fff"
                        dimension="sm"
                      >
                        <>
                          As this order was sold via Tito, some functionality
                          may be limited
                        </>
                      </BoxMessage>
                    )}
                  </StyledInnerRow>

                  <div>
                    {order?.state === 'CANCELLED' ? (
                      <ButtonWithSpacing
                        onClick={
                          isTitoOrder
                            ? openTitoWarningModal
                            : openOrderReinstateModal
                        }
                      >
                        Reinstate order
                      </ButtonWithSpacing>
                    ) : (
                      <ButtonWithSpacing
                        onClick={
                          isTitoOrder
                            ? openTitoWarningModal
                            : openOrderCancelModal
                        }
                      >
                        Cancel order
                      </ButtonWithSpacing>
                    )}
                    {isTitoOrder ? (
                      <ErrorInfoModal
                        alertHeader={orderRef}
                        alertText="As this order was created in Tito, it cannot be canceled using Ticket Machine. Please go
            to Tito to cancel the order."
                        closeModal={closeTitoWarningModal}
                        headerText="Unable to cancel order"
                        isOpen={isTitoWarningModalOpen}
                      />
                    ) : order?.state === 'CANCELLED' ? (
                      <OrderReinstateModal
                        closeModal={closeOrderReinstateModal}
                        isOpen={isOrderReinstateModalOpen}
                        orderRef={orderRef}
                        refetch={refetch}
                        sourceId={sourceId}
                      />
                    ) : (
                      <OrderCancelModal
                        closeModal={closeOrderCancelModal}
                        isOpen={isOrderCancelModalOpen}
                        orderRef={orderRef}
                        refetch={refetch}
                        sourceId={sourceId}
                      />
                    )}
                    <Button
                      disabled={
                        !commerceOrder ||
                        commerceOrder?.paymentStatus ===
                          CommerceOrderPaymentStatus.Refunded
                      }
                      onClick={openRefundModal}
                    >
                      {commerceOrder?.paymentStatus ===
                      CommerceOrderPaymentStatus.Refunded
                        ? 'Order refunded'
                        : 'Refund order'}
                    </Button>
                    {commerceOrder && (
                      <OrderRefundModal
                        commerceOrder={commerceOrder}
                        isOpen={isRefundModalOpen}
                        orderRef={orderRef}
                        onRequestClose={closeRefundModal}
                      />
                    )}
                  </div>
                </StyledRow>
              </SpacingBottom>

              <SpacingBottom>
                <OrderDetailsSummary
                  error={error}
                  loading={loading}
                  order={order as Order}
                />
              </SpacingBottom>

              <SpacingBottom>
                <OrderOwnerDetails
                  closeEditMode={closeEditMode}
                  editModeOn={isOwnerDetailsEditOn}
                  email={owner?.email}
                  firstName={owner?.firstName}
                  lastName={owner?.lastName || ''}
                  renderActions={() => {
                    return (
                      <>
                        {!isOwnerDetailsEditOn ? (
                          <Link
                            onClick={
                              isTitoOrder ? openTitoWarningModal : openEditMode
                            }
                          >
                            <Icon>create</Icon>
                            <span>Edit</span>
                          </Link>
                        ) : null}
                      </>
                    );
                  }}
                />
                <ErrorInfoModal
                    alertHeader={orderRef}
                    alertText="As this order was created in Tito, it cannot be transfered using Ticket Machine. Please go
            to Tito to transfer ownership of the order."
                    closeModal={closeTitoWarningModal}
                    headerText="Unable to transfer ownership order"
                    isOpen={isTitoWarningModalOpen}
                />

              </SpacingBottom>

              <SpacingBottom>
                {isTitoOrder ? (
                  <TitoOrderSummary
                    error={error}
                    loading={loading}
                    order={order as Order}
                  />
                ) : (
                  <OrderSummary
                    commerceOrder={commerceOrder}
                    error={commerceOrderError}
                    loading={loadingCommerceOrder}
                  />
                )}
              </SpacingBottom>
              {refunds?.length > 0 && (
                <SpacingBottom>
                  <OrderRefundsSummary
                    currencySymbol={commerceOrder?.currencySymbol}
                    refunds={refunds}
                  />
                </SpacingBottom>
              )}
            </div>
            {tickets && tickets.edges?.length > 0 && (
              <div>
                <ContainerCard noPadding title="Ticket information">
                  <TicketList
                    list={tickets.edges.map(({ node }) => node as Ticket)}
                  />
                </ContainerCard>
              </div>
            )}
          </div>
        )}
      </PageContainer>
    </>
  );
};

export default OrderDetails;
