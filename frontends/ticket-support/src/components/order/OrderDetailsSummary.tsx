import React, { ReactElement } from 'react'
import styled from 'styled-components'

import Loader from '../../lib/Loading'
import Badge from '../shared/Badge'
import Warning from '../ticketActions/Warning'
import { Button } from '../ticketDetails/TicketDetails'
import StatePlate from '../ticketItem/StatePlate'

const StyledContainer = styled.section`
  display: flex;
  flex-direction: column;
  font-size: 16px;

  // TODO PP: spacing needs to be evaluated as modifier to box
  margin-bottom: 16px;
`

const StyledFieldContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;

  margin-bottom: 16px;
`

const StyledField = styled.input`
  display: flex;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #999;
  padding: 8px 16px;

  // TODO PP: Move to some utility (s)css class eg. spacing--md
  margin-left: 16px;
  margin-right: 16px;
`
const StyledDefaultContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const StyledCenteredContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

// Headers
const StyledHeader = styled.div`
  font-weight: bold;
  font-size: 18px;

  // TODO PP: spacing needs to be evaluated as modifier to box
  margin-bottom: 16px;
`

const StyledInfoHeader = styled.span`
  font-weight: 500;
  font-size: 18px;
  color: #97b5e8; // TODO: add color constants, needs to be discussed

  // TODO PP: Move to some utility (s)css class eg. spacing--md
  // Cause: spacing needs to be evaluated as modifier to box otherwise style lost its ability to be reusable
  margin-bottom: 16px;
`

export type OrderDetailsSummaryProps = {
  error: boolean
  loading: boolean
  orderDetails?: any // mocked only
  orderReference?: string
  orderStatus?: string
}

const OrderDetailsSummary = ({
  loading,
  error,
  orderReference,
  orderStatus,
  orderDetails,
}: OrderDetailsSummaryProps): ReactElement<OrderDetailsSummaryProps> => {
  return (
    <>
      <StyledContainer>
        <StyledHeader>Order Details</StyledHeader>

        {loading && <Loader />}
        {error && (
          <Warning>
            <span>{error}</span>
          </Warning>
        )}

        {!loading && !error && (
          <>
            <StyledDefaultContainer>
              <StyledFieldContainer>
                <span>Order Reference #</span>
                <StyledField disabled type="text" value={orderReference} />
              </StyledFieldContainer>
            </StyledDefaultContainer>

            <StyledDefaultContainer>
              <StyledFieldContainer>
                <span>Created On:</span>
                <StyledField
                  disabled
                  type="text"
                  value={formatDefaultDate(orderDetails.createdOn.value)}
                />
              </StyledFieldContainer>

              <StyledFieldContainer>
                <span>Last Updated On:</span>
                <StyledField disabled type="text" value={orderDetails.lastUpdatedOn.value} />
              </StyledFieldContainer>
            </StyledDefaultContainer>

            <StyledDefaultContainer>
              <StyledFieldContainer>
                <span>Source of Sale:</span>
                <StyledField disabled type="text" value={orderDetails.sourceOfSale.value} />
              </StyledFieldContainer>

              <StyledFieldContainer>
                <span>Order Status:</span>
                <StatePlate state={orderStatus} />
                {/*<Badge>{orderStatus}</Badge>*/}
              </StyledFieldContainer>
            </StyledDefaultContainer>

            <StyledHeader>
              Order Owner’s Details&nbsp;
              <StyledInfoHeader>
                (Changes to this section shall transfer ticket assignment ownership)
              </StyledInfoHeader>
            </StyledHeader>

            <StyledDefaultContainer>
              <StyledFieldContainer>
                <span>First Name*:</span>
                <StyledField disabled type="text" value={orderDetails.name.value} />
              </StyledFieldContainer>

              <StyledFieldContainer>
                <span>Last Name:</span>
                <StyledField disabled type="text" value={orderDetails.surname.value} />
              </StyledFieldContainer>
            </StyledDefaultContainer>

            <StyledCenteredContainer>
              <StyledFieldContainer>
                <span>Email:</span>
                <StyledField disabled type="email" value={orderDetails.email.value} />
              </StyledFieldContainer>

              <Button>Edit</Button>
            </StyledCenteredContainer>
          </>
        )}
      </StyledContainer>
    </>
  )
}

export default OrderDetailsSummary
