import React, { ReactElement } from 'react'
import styled from 'styled-components'

import Loader from '../../lib/Loading'
import Warning from '../ticketActions/Warning'
import Badge from '../shared/Badge'

const StyledContainer = styled.section`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  // max-width: 1440px;
  margin: 0 auto;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid grey;
`

const StyledField = styled.div`
  display: flex;
  font-size: 16px;
`

const StyledHeader = styled.div`
  font-weight: 500;
  font-size: 24px;
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
              <StyledField>
                <div>Order Reference #</div>
                <input type="text" value={orderReference} />
              </StyledField>

              <StyledField>
                <div>Created On:</div>
                <input type="text" value={orderDetails.createdOn.value} />
              </StyledField>

              <StyledField>
                <div>Last Updated On:</div>
                <input type="text" value={orderDetails.createdOn.value} />
              </StyledField>

              <StyledField>
                <div>Source of Sale:</div>
                <input type="text" value={orderDetails.createdOn.value} />
              </StyledField>

              <StyledField>
                <div>Order Status:</div>
                <Badge>{orderStatus}</Badge>
              </StyledField>
            </StyledDefaultContainer>

            <div>
              Order Owner’s Details ( Changes to this section shall transfer ticket assignment
              ownership)
            </div>

            <StyledDefaultContainer>
              <StyledField>
                <div>First Name*:</div>
                <input type="text" value={orderDetails.createdOn.value} />
              </StyledField>

              <StyledField>
                <div>Last Name:</div>
                <input type="text" value={orderDetails.createdOn.value} />
              </StyledField>

              <StyledField>
                <div>Email:</div>
                <input type="text" value={orderDetails.createdOn.value} />
              </StyledField>
            </StyledDefaultContainer>
          </>
        )}
      </StyledContainer>
    </>
  )
}

export default OrderDetailsSummary
