import React, { ReactElement } from 'react'
import styled from 'styled-components'

import ContainerCard from '../../lib/components/atoms/ContainerCard'
import Loader from '../../lib/Loading'
import { formatDefaultDateTime } from '../../lib/utils/time'
import Warning from '../ticketActions/Warning'
import StatePlate from '../ticketItem/StatePlate'

// Containers
const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledGridContainer = styled.section`
  display: grid;
  grid-gap: 8px;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(2, 32px);
  align-items: center;
`

// Headers
const StyledLabel = styled.label`
  color: #c2c0c2;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 24px;
`

const StyledValue = styled.p`
  color: #0c1439;
  font-size: 14px;
  letter-spacing: 0;
  line-height: 24;
`

type Props = {
  billedAmount?: string
  discountCodeApplied?: string
  discountedAmount?: string
  error: boolean
  loading: boolean
  orderType?: string
  purchasedTotal?: number
  salesTaxApplied?: string
  ticketPrice?: string
}

const OrderSummary = ({
  loading,
  error,
  orderType,
  purchasedTotal,
  discountCodeApplied,
  discountedAmount,
  salesTaxApplied,
  ticketPrice,
  billedAmount,
}: Props): ReactElement => {
  const missingDataAbbr = 'MD'

  return (
    <ContainerCard color="#008BEE" title="Order summary">
      <StyledContainer>
        {loading && <Loader />}
        {error && (
          <Warning>
            <span>{error}</span>
          </Warning>
        )}

        {!loading && !error && (
          <>
            <StyledGridContainer>
              <StyledLabel>Ticket Type</StyledLabel>
              <StyledLabel>Qty purchased</StyledLabel>
              <StyledLabel>Discount Code applied</StyledLabel>
              <StyledLabel>Discounted amount</StyledLabel>
              <StyledLabel>Sales Tax Applied</StyledLabel>
              <StyledLabel>Ticket Price ( incl. Tax)</StyledLabel> {/*: Price and currency */}
              <StyledLabel>Billed Amount</StyledLabel>{' '}
              {/*: Computed amount ( includes Sales Tax minus discount  applied) */}
              <StyledValue>{orderType}</StyledValue>
              <StyledValue>{purchasedTotal}</StyledValue>
              <StyledValue>{discountCodeApplied}</StyledValue>
              <StyledValue>{discountedAmount}</StyledValue>
              {/* Sales Tax applied :  percentage of tax applied and sales tax name . Example 23% VAT -  Web Summit ;  13% HST - Collision. */}
              <StyledValue>{salesTaxApplied}</StyledValue>
              <StyledValue>{ticketPrice}</StyledValue>
              <StyledValue>{billedAmount}</StyledValue>
            </StyledGridContainer>
          </>
        )}
      </StyledContainer>
    </ContainerCard>
  )
}

export default OrderSummary
