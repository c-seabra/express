import React, { ReactElement } from 'react'
import styled from 'styled-components'

import { Input, Label } from '../../lib/components'
import Loader from '../../lib/Loading'
import { formatDefaultDateTime } from '../../lib/utils/time'
import Warning from '../ticketActions/Warning'
import { Button } from '../ticketDetails/TicketDetails'
import StatePlate from '../ticketItem/StatePlate'

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

type Props = {
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
}: Props): ReactElement => {
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
              <Label>Order Reference</Label>
              <Input disabled type="text" value={orderReference} />
              <span>&nbsp;</span>
              <span>&nbsp;</span>

              <Label>Created On:</Label>
              <Input
                disabled
                type="text"
                value={(createdOn && formatDefaultDateTime(createdOn)) || missingDataAbbr}
              />

              <Label>Last Updated On:</Label>
              <Input
                disabled
                type="text"
                value={(lastUpdatedOn && formatDefaultDateTime(lastUpdatedOn)) || missingDataAbbr}
              />

              <Label>Source of Sale:</Label>
              <Input disabled type="text" value={sourceOfSale} />

              <Label>Order Status:</Label>
              <StatePlate state={orderStatus || missingDataAbbr} />
            </StyledGridContainer>

            <StyledHeader>
              Order Owner’s Details&nbsp;
              <StyledInfoHeader>
                (Changes to this section shall transfer ticket assignment ownership)
              </StyledInfoHeader>
            </StyledHeader>

            <StyledGridContainer>
              <Label withAsterix>First Name</Label>
              <Input disabled type="text" value={name} />

              <Label withAsterix>Last Name</Label>
              <Input disabled type="text" value={surname} />

              <Label withAsterix>Email</Label>
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
