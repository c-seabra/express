import { DateTime } from 'luxon'
import React, { ReactElement } from 'react'
import styled from 'styled-components'

import Loader from '../../lib/Loading'
// import Badge from '../shared/Badge'
import Warning from '../ticketActions/Warning'
import { Button } from '../ticketDetails/TicketDetails'
import StatePlate from '../ticketItem/StatePlate'

// TODO PP: move to lib/utils
const formatDefaultDate = (isoDate: string) => {
  const date = DateTime.fromISO(isoDate)
  return date.toLocaleString(DateTime.DATETIME_MED)
}

// Containers
const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;

  // TODO PP: spacing needs to be evaluated as modifier to box
  // margin-bottom: 16px;
`

const StyledGridContainer = styled.section`
  display: grid;
  grid-gap: 16px;
  grid-template-columns: auto 1fr auto 1fr;
  grid-template-rows: auto auto auto auto;
  align-items: center;

  margin-bottom: 16px;
`

const StyledField = styled.input`
  display: flex;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #999;
  padding: 8px 16px;
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
  font-size: 14px;
  color: #97b5e8; // TODO: add color constants, needs to be discussed

  // TODO PP: Move to some utility (s)css class eg. spacing--md
  // Cause: spacing needs to be evaluated as modifier to box otherwise style lost its ability to be reusable
  margin-bottom: 16px;
`

// Button
const StyledButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

export type OrderDetailsSummaryProps = {
  createdOn: string
  email?: string
  error: boolean
  lastUpdatedOn: string
  loading: boolean
  name?: string
  orderReference?: string
  orderStatus: string
  sourceOfSale?: string
  surname?: string
}

const OrderDetailsSummary = ({
  loading,
  error,
  orderReference,
  createdOn,
  lastUpdatedOn,
  sourceOfSale,
  name,
  surname,
  email,

  orderStatus,
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
            <StyledGridContainer>
              <span>Order Reference</span>
              <StyledField disabled type="text" value={orderReference} />
              <span>&nbsp;</span>
              <span>&nbsp;</span>

              <span>Created On:</span>
              <StyledField disabled type="text" value={formatDefaultDate(createdOn)} />

              <span>Last Updated On:</span>
              <StyledField disabled type="text" value={formatDefaultDate(lastUpdatedOn)} />

              <span>Source of Sale:</span>
              <StyledField disabled type="text" value={sourceOfSale} />

              <span>Order Status:</span>
              <StatePlate state={orderStatus} />
            </StyledGridContainer>

            <StyledHeader>
              Order Owner’s Details&nbsp;
              <StyledInfoHeader>
                (Changes to this section shall transfer ticket assignment ownership)
              </StyledInfoHeader>
            </StyledHeader>

            <StyledGridContainer>
              <span>First Name:</span>
              <StyledField disabled type="text" value={name} />

              <span>Last Name*:</span>
              <StyledField disabled type="text" value={surname} />
              <span>Email*:</span>
              <StyledField disabled type="email" value={email} />
              <span>&nbsp;</span>
              <StyledButtonContainer>
                <Button>Edit</Button>
              </StyledButtonContainer>
            </StyledGridContainer>
          </>
        )}
      </StyledContainer>
    </>
  )
}

export default OrderDetailsSummary
