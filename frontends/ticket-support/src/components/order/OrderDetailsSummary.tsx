import React, { ReactElement } from 'react'
import styled from 'styled-components'

import Loader from '../../lib/Loading'
import Badge from '../shared/Badge'
import Warning from '../ticketActions/Warning'

const StyledContainer = styled.section`
  display: flex;
  flex-direction: column;
  font-size: 16px;

  // TODO PP: spacing needs to be evaluated as modifier to box
  margin-bottom: 16px;
`

const StyledFieldContainer = styled.div`
  display: flex;
  font-size: 16px;
`

const StyledField = styled.input`
  display: flex;
  font-size: 16px;

  // TODO PP: Move to some utility (s)css class eg. spacing--md
  margin-right: 16px;
`

const StyledHeader = styled.div`
  font-weight: 500;
  font-size: 24px;
`

const StyledInfoHeader = styled.div`
  font-weight: 500;
  font-size: 18px;
  color: #97b5e8; // TODO: add color constants, needs to be discussed

  // TODO PP: Move to some utility (s)css class eg. spacing--md
  // Cause: spacing needs to be evaluated as modifier to box otherwise style lost its ability to be reusable
  margin-bottom: 16px;
`

const StyledDefaultContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
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
                <StyledField type="text" disabled value={orderReference} />
              </StyledFieldContainer>

              <StyledFieldContainer>
                <span>Created On:</span>
                <input type="text" disabled value={orderDetails.createdOn.value} />
              </StyledFieldContainer>

              <StyledFieldContainer>
                <span>Last Updated On:</span>
                <input type="text" disabled value={orderDetails.lastUpdatedOn.value} />
              </StyledFieldContainer>

              <StyledFieldContainer>
                <span>Source of Sale:</span>
                <input type="text" disabled value={orderDetails.sourceOfSale.value} />
              </StyledFieldContainer>

              <StyledFieldContainer>
                <span>Order Status:</span>
                <Badge>{orderStatus}</Badge>
              </StyledFieldContainer>
            </StyledDefaultContainer>

            <StyledInfoHeader>
              Order Owner’s Details ( Changes to this section shall transfer ticket assignment
              ownership)
            </StyledInfoHeader>

            <StyledDefaultContainer>
              <StyledFieldContainer>
                <span>First Name*:</span>
                <input type="text" disabled value={orderDetails.name.value} />
              </StyledFieldContainer>

              <StyledFieldContainer>
                <span>Last Name:</span>
                <input type="text" disabled value={orderDetails.surname.value} />
              </StyledFieldContainer>

              <StyledFieldContainer>
                <span>Email:</span>
                <input type="email" disabled value={orderDetails.email.value} />
              </StyledFieldContainer>
            </StyledDefaultContainer>
          </>
        )}
      </StyledContainer>
    </>
  )
}

export default OrderDetailsSummary
