import {
  Button,
  SecondaryButton,
} from '@websummit/components/src/atoms/Button';
import BoxMessage from '@websummit/components/src/molecules/BoxMessage';
import Breadcrumbs, {
  Breadcrumb,
} from '@websummit/components/src/molecules/Breadcrumbs';
import ContainerCard from '@websummit/components/src/molecules/ContainerCard';
import Select from '@websummit/components/src/molecules/Select';
import {
  useErrorSnackbar,
  useSuccessSnackbar,
} from '@websummit/components/src/molecules/Snackbar';
import {
  CommerceOrderPaymentStatus,
  CommerceTransaction,
  CommerceTransactionType,
  Order,
  useCommerceListPaymentMethodsQuery,
  useOrderByRefQuery,
  useOrderInvoiceSendMutation,
  useOrderRefundReceiptSendMutation,
} from '@websummit/graphql/src/@types/operations';
import { useRequestContext } from '@websummit/graphql/src/utils/AppContext';
import React, { ReactElement, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';

import ButtonLink from '../../lib/components/atoms/ButtonLink';
import TextHeading from '../../lib/components/atoms/Heading';
import Icon from '../../lib/components/atoms/Icon';
import ErrorInfoModal from '../../lib/components/molecules/ErrorInfoModal';
import { useModalState } from '../../lib/components/molecules/Modal';
import useEventDataQuery from '../../lib/hooks/useEventDataQuery';
import useSingleCommerceOrderQuery from '../../lib/hooks/useSingleCommerceOrderQuery';
import useTicketsQuery from '../../lib/hooks/useTicketsQuery';
import Loader from '../../lib/Loading';
import Pagination from '../../lib/Pagination';
import { Error } from '../../lib/types';
import { switchCase } from '../../lib/utils/logic';
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

const StyledSelect = styled(Select)`
  min-height: 36px;
  width: 70px;
`;

const pagingOptions = [
  { label: 10, value: 10 },
  { label: 15, value: 15 },
  { label: 20, value: 20 },
  { label: 25, value: 25 },
];

const DEFAULT_PER_PAGE = 10;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const OrderDetails = (): ReactElement => {
  const history = useHistory();
  const snackbar = useSuccessSnackbar();
  const errSnackbar = useErrorSnackbar();
  const { orderRef } = useParams<{ orderRef: string }>();
  const context = useRequestContext();
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
  const {
    openModal: openTransferWarningModal,
    isOpen: isTransferWarningModalOpen,
    closeModal: closeTransferWarningModal,
  } = useModalState();

  const { data, loading, error, refetch } = useOrderByRefQuery({
    context,
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
    refetch: refetchCommerceOrder,
  } = useSingleCommerceOrderQuery({
    id: sourceId,
  });

  const { data: paymentMethodsData } = useCommerceListPaymentMethodsQuery({
    context,
  });

  const [perPage, setPerPage] = useState(DEFAULT_PER_PAGE);

  const {
    results: tickets,
    loading: ticketsLoading,
    isForwardDisabled,
    isBackwardsDisabled,
    nextPage,
    previousPage,
  } = useTicketsQuery({
    orderId: order?.id,
    perPage: perPage || DEFAULT_PER_PAGE,
    skip: !order?.id,
  });

  const owner = order?.owner;
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

  let cancelReinstateModal: JSX.Element;
  if (isTitoOrder) {
    cancelReinstateModal = (
      <ErrorInfoModal
        alertHeader={orderRef}
        alertText="As this order was created in Tito, it cannot be canceled using Ticket Machine. Please go
            to Tito to cancel the order."
        closeModal={closeTitoWarningModal}
        headerText="Unable to cancel order"
        isOpen={isTitoWarningModalOpen}
      />
    );
  } else if (order?.state === 'CANCELLED') {
    cancelReinstateModal = (
      <OrderReinstateModal
        closeModal={closeOrderReinstateModal}
        isOpen={isOrderReinstateModalOpen}
        orderRef={orderRef}
        refetch={refetch}
        sourceId={sourceId}
      />
    );
  } else {
    cancelReinstateModal = (
      <OrderCancelModal
        closeModal={closeOrderCancelModal}
        isOpen={isOrderCancelModalOpen}
        orderRef={orderRef}
        refetch={refetch}
        sourceId={sourceId}
      />
    );
  }

  const refunds: CommerceTransaction[] = commerceOrder?.transactions
    ?.filter(Boolean)
    ?.filter(
      (transaction) => transaction?.type === CommerceTransactionType.Refund,
    ) as CommerceTransaction[];

  const editCustomerBillingRedirect = () => {
    history.push(`/order/${orderRef}/customer-billing/${sourceId}`);
  };

  const [sendRefundReceiptEmail] = useOrderRefundReceiptSendMutation({
    context,
    onCompleted: () => {
      snackbar('Email with refund receipt sent');
    },
    onError: (e: Error) => errSnackbar(e.message),
  });
  const [sendInvoiceEmail] = useOrderInvoiceSendMutation({
    context,
    onCompleted: () => {
      snackbar(`Email with invoice sent`);
    },
    onError: (e: Error) => errSnackbar(e.message),
  });
  const sendOrderDocumentInput = {
    variables: {
      input: {
        reference: orderRef,
      },
    },
  };
  const invoiceSendEmail = async () => {
    await sendInvoiceEmail(sendOrderDocumentInput);
  };
  const refundReceiptSendEmail = async () => {
    await sendRefundReceiptEmail(sendOrderDocumentInput);
  };

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
                    {cancelReinstateModal}
                    {(commerceOrder?.total || 0) > 0 ? (
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
                    ) : null}
                    {commerceOrder && paymentMethodsData && (
                      <OrderRefundModal
                        commerceOrder={commerceOrder}
                        isOpen={isRefundModalOpen}
                        orderRef={orderRef}
                        paymentMethods={
                          paymentMethodsData?.commerceListPaymentMethods?.hits
                        }
                        refetchCommerceOrder={refetchCommerceOrder}
                        onRequestClose={closeRefundModal}
                      />
                    )}
                  </div>
                </StyledRow>
              </SpacingBottom>

              <SpacingBottom>
                <OrderDetailsSummary
                  commerceOrder={commerceOrder}
                  editCustomerBillingRedirect={editCustomerBillingRedirect}
                  error={error}
                  invoiceSendEmail={invoiceSendEmail}
                  loading={loading}
                  loadingCommerceOrder={loadingCommerceOrder}
                  order={order as Order}
                  refundReceiptSendEmail={refundReceiptSendEmail}
                />
              </SpacingBottom>

              <SpacingBottom>
                <OrderOwnerDetails
                  accountId={owner?.id}
                  closeEditMode={closeEditMode}
                  editModeOn={isOwnerDetailsEditOn}
                  email={owner?.email}
                  firstName={owner?.firstName}
                  lastName={owner?.lastName || ''}
                  orderRef={orderRef}
                  refetch={refetch}
                  renderActions={() => {
                    return (
                      <>
                        {!isOwnerDetailsEditOn ? (
                          <ButtonLink
                            onClick={
                              isTitoOrder
                                ? openTransferWarningModal
                                : openEditMode
                            }
                          >
                            <Icon>create</Icon>
                            <span>Edit</span>
                          </ButtonLink>
                        ) : null}
                      </>
                    );
                  }}
                />
                <ErrorInfoModal
                  alertHeader={orderRef}
                  alertText="As this order was created in Tito, it cannot be transferred using Ticket Machine. Please go
            to Tito to transfer ownership of the order."
                  closeModal={closeTransferWarningModal}
                  headerText="Unable to transfer order ownership"
                  isOpen={isTransferWarningModalOpen}
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
            {tickets && tickets.length > 0 && (
              <div>
                <ContainerCard noPadding title="Ticket information">
                  <TicketList list={tickets} loading={ticketsLoading} />
                  {!ticketsLoading ? (
                    <PaginationContainer>
                      <Pagination
                        isForwardDisabled={isForwardDisabled}
                        isPreviousDisabled={isBackwardsDisabled}
                        nextPage={nextPage}
                        previousPage={previousPage}
                      />
                      {isForwardDisabled &&
                      isBackwardsDisabled &&
                      perPage === DEFAULT_PER_PAGE ? null : (
                        <StyledSelect
                          options={pagingOptions}
                          value={perPage}
                          onChange={(e) => {
                            const newPerPage = parseInt(e.target.value, 10);
                            setPerPage(newPerPage);
                          }}
                        />
                      )}
                    </PaginationContainer>
                  ) : null}
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
