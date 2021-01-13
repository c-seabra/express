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
`

const StyledColumnContainer = styled.div`
  display: flex;
  flex-direction: column;

  margin-right: 4rem;
`

// Headers
const StyledLabel = styled.label`
  color: #c2c0c2;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 1.5rem;

  margin-bottom: 1rem;
`

const StyledValue = styled.span`
  color: #0c1439;
  font-size: 0.875rem;
  letter-spacing: 0;
  line-height: 1.5rem;
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
  purchasedTotal, // Computed amount includes Sales Tax minus discount  applied)
  discountCodeApplied,
  discountedAmount,
  salesTaxApplied, // percentage of tax applied and sales tax name . Example 23% VAT -  Web Summit ;  13% HST - Collision.
  ticketPrice,
  billedAmount,
}: Props): ReactElement => {
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
            <StyledContainer>
              <StyledColumnContainer>
                <StyledLabel>Ticket Type</StyledLabel>
                <StyledValue>{orderType}</StyledValue>
              </StyledColumnContainer>
              <StyledColumnContainer>
                <StyledLabel>Qty purchased</StyledLabel>
                <StyledValue>{purchasedTotal}</StyledValue>
              </StyledColumnContainer>

              <StyledColumnContainer>
                <StyledLabel>Ticket Price (incl. Tax)</StyledLabel>
                <StyledValue>{ticketPrice}</StyledValue>
              </StyledColumnContainer>

              <StyledColumnContainer>
                <StyledLabel>Billed Amount</StyledLabel>
                <StyledValue>{billedAmount}</StyledValue>
              </StyledColumnContainer>

              <StyledColumnContainer>
                <StyledLabel>Discount Code applied</StyledLabel>
                <StyledValue>{discountCodeApplied}</StyledValue>
              </StyledColumnContainer>

              <StyledColumnContainer>
                <StyledLabel>Discounted amount</StyledLabel>
                <StyledValue>{discountedAmount}</StyledValue>
              </StyledColumnContainer>

              <StyledColumnContainer>
                <StyledLabel>Sales Tax Applied</StyledLabel>
                <StyledValue>{salesTaxApplied}</StyledValue>
              </StyledColumnContainer>
            </StyledContainer>
          </>
        )}
      </StyledContainer>
    </ContainerCard>
  )
}

export default OrderSummary
