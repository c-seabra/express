import React, { ReactElement } from 'react'
import styled from 'styled-components'

import { ContainerCard, Input, Label } from '../../lib/components'
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
  grid-gap: 16px;
  grid-template-columns: auto 1fr auto 1fr;
  grid-template-rows: auto auto auto auto;
  align-items: center;

  margin-bottom: 16px;
`

// Headers
const StyledHeader = styled.div`
  color: #0c1439;
  font-family: 'Azo Sans';
  font-size: 20px;
  font-weight: 500;
  letter-spacing: -0.5px;
  line-height: 32px;

  // TODO PP: spacing needs to be evaluated as modifier to box
  margin-bottom: 16px;
`

const StyledLabel = styled.label`
  color: #c2c0c2;
  font-family: 'Inter';
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 24px;
`

const StyledValue = styled.p`
  color: #0c1439;
  font-family: '.SF NS Display';
  font-size: 14px;
  letter-spacing: 0;
  line-height: 24;
`

type Props = {
  createdOn?: string
  error: boolean
  lastUpdatedOn?: string
  loading: boolean
  orderReference?: string
  orderStatus?: string
  sourceOfSale?: string
}

const OrderDetailsSummary = ({
  loading,
  error,
  orderReference,
  createdOn,
  lastUpdatedOn,
  sourceOfSale,
  orderStatus,
}: Props): ReactElement => {
  const missingDataAbbr = 'MD'

  return (
    <>
      <ContainerCard color="#654DA0">
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
                <StyledLabel>Order Reference #</StyledLabel>
                <StyledValue>#{orderReference}</StyledValue>
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
            </>
          )}
        </StyledContainer>
      </ContainerCard>
    </>
  )
}

export default OrderDetailsSummary
