import { useQuery } from '@apollo/client'
import React from 'react'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

import { Button, SecondaryButton } from '../../lib/components/atoms/Button'
import ContainerCard from '../../lib/components/atoms/ContainerCard'
import TextHeading from '../../lib/components/atoms/Heading'
import BoxMessage from '../../lib/components/molecules/BoxMessage'
import Breadcrumbs, { Breadcrumb } from '../../lib/components/molecules/Breadcrumbs'
import ErrorInfoModal from '../../lib/components/molecules/ErrorInfoModal'
import { useModalState } from '../../lib/components/molecules/Modal'
import useEventDataQuery from '../../lib/hooks/useEventDataQuery'
import Loader from '../../lib/Loading'
import { Ticket } from '../../lib/types'
import { switchCase } from '../../lib/utils/logic'
import ORDER_QUERY, { OrderByRefQuery } from '../../operations/queries/OrderByRef'
import { useAppContext } from '../app/AppContext'
import Warning from '../ticketActions/Warning'
import TicketList from '../ticketList/TicketList'
import OrderCancelModal from './OrderCancelModal'
import OrderDetailsSummary from './OrderDetailsSummary'
import OrderOwnerDetails from './OrderOwnerDetails'
import OrderSummary from './OrderSummary'

const PageContainer = styled.section`
  padding: 1rem;
  max-width: 1440px;
  margin: 0 auto;
  font-size: 16px;
`

const BreadcrumbsContainer = styled.div`
  display: flex;
  margin: 20px 0 4px;
`

export const Text = styled.div`
  border-radius: 8px;
  padding: 0.25rem;
  font-size: 1rem;
  font-weight: 400;
  a {
    color: #337ab7;
    margin: 0 0.25rem;
  }
`

export const TextHighlight = styled.span`
  color: #337ab7;
  margin: 0 0.25rem;
`

const SpacingBottom = styled.div`
  margin-bottom: 2.5rem;
`

const StyledRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const StyledInnerRow = styled.div`
  display: flex;
  align-items: center;

  > * {
    margin-right: 16px;
  }
`

const ButtonWithSpacing = styled(SecondaryButton)`
  margin-right: 16px;
`

const OrderDetails: React.FC = () => {
  const { orderRef } = useParams<{ orderRef: string }>()
  const { conferenceSlug, token } = useAppContext()
  const {
    openModal: openOrderCancelModal,
    isOpen: isOrderCancelModalOpen,
    closeModal: closeOrderCancelModal,
  } = useModalState()

  const { loading, error, data }: OrderByRefQuery = useQuery(ORDER_QUERY, {
    context: {
      slug: conferenceSlug,
      token,
    },
    variables: {
      reference: orderRef,
    },
  })

  const order = data?.order
  const tickets = order?.tickets
  const owner = order?.owner
  const missingDataAbbr = 'N/A'
  const formatSourceOfSale = (source: string): string =>
    switchCase({
      TICKET_MACHINE: 'Ticket Machine',
      TITO: 'Tito',
    })(missingDataAbbr)(source)

  const { loading: mockedLoading, error: mockedError, orderDetails, orderSummary } = {
    error: false,
    loading: false,
    orderDetails: {
      createdOn: order?.completedAt,
      email: owner?.email,
      lastUpdatedOn: order?.lastUpdatedAt,
      name: owner?.firstName,
      orderReference: orderRef,
      sourceOfSale: order && formatSourceOfSale(order?.source),
      status: order?.state,
      surname: owner?.lastName,
    },
    orderSummary: {
      billedAmount: missingDataAbbr,
      discountCodeApplied: missingDataAbbr, // Mocked until fully integrated with BE
      discountedAmount: missingDataAbbr, // Mocked until fully integrated with BE
      orderType: order?.summary?.ticketType?.name,
      purchasedTotal: order?.summary?.tickets,
      salesTaxApplied: missingDataAbbr, // Mocked until fully integrated with BE
      ticketPrice: missingDataAbbr, // Mocked until fully integrated with BE
    },
  }
  const isFromTito = (source: string): boolean => {
    return switchCase({
      TICKET_MACHINE: false,
      TITO: true,
    })(false)(source)
  }
  const isTitoOrder = order && isFromTito(order?.source)

  const { event } = useEventDataQuery()
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
  ]

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
            <span>{error}</span>
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
                      <BoxMessage backgroundColor="#333333" color="#fff" dimension="sm">
                        <>As this order was sold via Tito, some functionality may be limited</>
                      </BoxMessage>
                    )}
                  </StyledInnerRow>

                  <div>
                    <ButtonWithSpacing onClick={openOrderCancelModal}>
                      Cancel order
                    </ButtonWithSpacing>
                    {isTitoOrder && (
                      <ErrorInfoModal
                        alertHeader={orderRef}
                        alertText="As this order was created in Tito, it cannot be canceled using Ticket Machine. Please go
            to Tito to cancel the order."
                        closeModal={closeOrderCancelModal}
                        headerText="Unable to cancel order"
                        isOpen={isOrderCancelModalOpen}
                      />
                    )}

                    {!isTitoOrder && (
                      <OrderCancelModal
                        closeModal={closeOrderCancelModal}
                        isOpen={isOrderCancelModalOpen}
                        orderRef={orderRef}
                      />
                    )}

                    <Button disabled>Refund order</Button>
                  </div>
                </StyledRow>
              </SpacingBottom>

              <SpacingBottom>
                <OrderDetailsSummary
                  createdOn={orderDetails.createdOn}
                  error={mockedError}
                  lastUpdatedOn={orderDetails.lastUpdatedOn}
                  loading={mockedLoading}
                  orderReference={orderDetails.orderReference}
                  orderStatus={orderDetails.status}
                  sourceOfSale={orderDetails.sourceOfSale}
                />
              </SpacingBottom>

              <SpacingBottom>
                <OrderOwnerDetails
                  email={orderDetails.email}
                  firstName={orderDetails.name}
                  lastName={orderDetails.surname}
                />
              </SpacingBottom>

              <SpacingBottom>
                <OrderSummary
                  billedAmount={orderSummary.billedAmount}
                  discountCodeApplied={orderSummary.discountCodeApplied}
                  discountedAmount={orderSummary.discountedAmount}
                  error={mockedError}
                  loading={mockedLoading}
                  orderType={orderSummary.orderType}
                  purchasedTotal={orderSummary.purchasedTotal}
                  salesTaxApplied={orderSummary.salesTaxApplied}
                  ticketPrice={orderSummary.ticketPrice}
                />
              </SpacingBottom>
            </div>
            {tickets && tickets.edges?.length > 0 && (
              <div>
                <ContainerCard noPadding color="#DF0079" title="Ticket information">
                  <TicketList list={tickets.edges.map(({ node }) => node) as Ticket[]} />
                </ContainerCard>
              </div>
            )}
          </div>
        )}
      </PageContainer>
    </>
  )
}

export default OrderDetails
