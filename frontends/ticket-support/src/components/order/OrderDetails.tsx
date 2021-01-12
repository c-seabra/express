import { useQuery } from '@apollo/client'
import React from 'react'
import { Helmet } from 'react-helmet'
import { useHistory, useParams } from 'react-router-dom'
import styled from 'styled-components'

import { Tooltip } from '../../lib/components'
import ContainerCard from '../../lib/components/atoms/ContainerCard'
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
  border-radius: 8px;
  border: 1px solid grey;
  hr {
    border-color: grey;
    margin: 1rem 0;
  }
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

export const Button = styled.button`
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

  const { loading: mockedLoading, error: mockedError, orderDetails } = {
    error: false,
    loading: false,
    orderDetails: {
      createdOn: {
        value: order?.completedAt,
      },
      email: {
        value: owner?.email,
      },
      lastUpdatedOn: {
        value: order?.lastUpdatedAt,
      },
      name: {
        value: owner?.firstName,
      },
      orderReference: {
        value: orderRef,
      },
      sourceOfSale: {
        value: 'No data', // e.g. Salesforce (Mocked until integrated to SF)
      },
      status: {
        value: order?.state,
      },
      surname: {
        value: owner?.lastName,
      },
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
            <Button type="button" onClick={() => history.goBack()}>
              Back
            </Button>
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
                <OrderDetailsSummary
                  createdOn={orderDetails.createdOn.value}
                  error={mockedError}
                  lastUpdatedOn={orderDetails.lastUpdatedOn.value}
                  loading={mockedLoading}
                  orderReference={orderDetails.orderReference.value}
                  orderStatus={orderDetails.status.value}
                  sourceOfSale={orderDetails.sourceOfSale.value}
                />
              </SpacingBottom>

              <SpacingBottom>
                <OrderOwnerDetails
                  email={orderDetails.email.value}
                  firstName={orderDetails.name.value}
                  lastName={orderDetails.surname.value}
                />
              </SpacingBottom>

              <SpacingBottom>
                <OrderSummary
                  error={mockedError}
                  loading={mockedLoading}
                  orderType={order?.summary?.ticketType?.name}
                  purchasedTotal={order?.summary?.tickets}
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
