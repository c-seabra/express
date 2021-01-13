import { useQuery } from '@apollo/client'
import React from 'react'
import { Helmet } from 'react-helmet'
import { useHistory, useParams } from 'react-router-dom'
import styled from 'styled-components'

import { Tooltip } from '../../lib/components'
import { Button, SecondaryButton } from '../../lib/components/atoms/Button'
import ContainerCard from '../../lib/components/atoms/ContainerCard'
import TextHeading from '../../lib/components/atoms/Heading'
import Loader from '../../lib/Loading'
import { Ticket } from '../../lib/types'
import ORDER_QUERY, { OrderByRefQuery } from '../../operations/queries/OrderByRef'
import { useAppContext } from '../app/AppContext'
import Warning from '../ticketActions/Warning'
import TicketList from '../ticketList/TicketList'
import OrderDetailsSummary from './OrderDetailsSummary'
import OrderOwnerDetails from './OrderOwnerDetails'
import OrderSummary from './OrderSummary'

const StyledContainer = styled.section`
  padding: 1rem;
  max-width: 1440px;
  margin: 0 auto;
  font-size: 16px;
`

const Heading = styled.div`
  border-radius: 8px;
  padding-top: 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  font-weight: bold;
  button {
    margin-right: 1rem;
  }
  span {
    color: #00ac93;
  }
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
`
const TicketHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const StyledRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-top: 4rem;
`

const ButtonWithSpacing = styled(Button)`
  margin-right: 16px;
`

const OrderDetails: React.FC = () => {
  const { orderRef } = useParams<{ orderRef: string }>()
  const history = useHistory()
  const { conferenceSlug, token } = useAppContext()

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
  const missingDataAbbr = 'No data'

  const { loading: mockedLoading, error: mockedError, orderDetails, orderSummary } = {
    error: false,
    loading: false,
    orderDetails: {
      createdOn: order?.completedAt,
      email: owner?.email,
      lastUpdatedOn: order?.lastUpdatedAt,
      name: owner?.firstName,
      orderReference: orderRef,
      sourceOfSale: missingDataAbbr, // e.g. Salesforce (Mocked until integrated to SF)
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

  return (
    <>
      <Helmet>
        <title>Manage {orderRef} order - Ticket machine</title>
      </Helmet>
      <StyledContainer>
        <TicketHeader>
          <Heading>
            <Button onClick={history.goBack}>Back</Button>
            Manage Order/
            <Tooltip copyToClip value={orderRef}>
              <TextHighlight>{orderRef}</TextHighlight>
            </Tooltip>
          </Heading>
        </TicketHeader>
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
                  <TextHeading>Order management</TextHeading>
                  <div>
                    <ButtonWithSpacing disabled as={SecondaryButton}>
                      Cancel order
                    </ButtonWithSpacing>
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
                <ContainerCard color="#DF0079" title="Ticket information">
                  <TicketList list={tickets.edges.map(({ node }) => node) as Ticket[]} />
                </ContainerCard>
              </div>
            )}
          </div>
        )}
      </StyledContainer>
    </>
  )
}

export default OrderDetails
