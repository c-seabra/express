import { DateTime } from 'luxon'
import React, { ReactElement } from 'react'
import styled from 'styled-components'

import Loader from '../../lib/Loading'
import Warning from '../ticketActions/Warning'
import { Button } from '../ticketDetails/TicketDetails'
import StatePlate from '../ticketItem/StatePlate'
import Input from '../../lib/components/atoms/Input'
// import Input from 'components' // TODO add default path to TS config

// TODO PP: move to lib/utils
const formatDefaultDate = (isoDate: string): string => {
  const date = DateTime.fromISO(isoDate)
  return date.toLocaleString(DateTime.DATETIME_MED)
}

// Containers
const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledGridContainer = styled.section`
  display: grid;
  grid-gap: 16px;
  grid-template-columns: auto 1fr auto 1fr;
  grid-template-rows: auto auto auto auto;
  align-items: center;

  margin-bottom: 16px;
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
  createdOn?: string
  email?: string
  error: boolean
  lastUpdatedOn?: string
  loading: boolean
  name?: string
  orderReference?: string
  orderStatus?: string
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
  const missingDataAbbr = 'MD'

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
              <Input disabled type="text" value={orderReference} />
              <span>&nbsp;</span>
              <span>&nbsp;</span>

              <span>Created On:</span>
              <Input
                disabled
                type="text"
                value={(createdOn && formatDefaultDate(createdOn)) || missingDataAbbr}
              />

              <span>Last Updated On:</span>
              <Input
                disabled
                type="text"
                value={(lastUpdatedOn && formatDefaultDate(lastUpdatedOn)) || missingDataAbbr}
              />

              <span>Source of Sale:</span>
              <Input disabled type="text" value={sourceOfSale} />

              <span>Order Status:</span>
              <StatePlate state={orderStatus || missingDataAbbr} />
            </StyledGridContainer>

            <StyledHeader>
              Order Owner’s Details&nbsp;
              <StyledInfoHeader>
                (Changes to this section shall transfer ticket assignment ownership)
              </StyledInfoHeader>
            </StyledHeader>

            <StyledGridContainer>
              <span>First Name:</span>
              <Input disabled type="text" value={name} />

              <span>Last Name*:</span>
              <Input disabled type="text" value={surname} />
              <span>Email*:</span>
              <Input disabled type="email" value={email} />
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
