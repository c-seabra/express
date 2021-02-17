import React, { ReactElement } from 'react';
import styled from 'styled-components';

import ContainerCard from '../../lib/components/atoms/ContainerCard';
import Loader from '../../lib/Loading';
import { formatDefaultDateTime } from '../../lib/utils/time';
import Warning from '../ticketActions/Warning';
import StatePlate from '../ticketItem/StatePlate';

// Containers
const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledGridContainer = styled.section`
  display: grid;
  grid-gap: 8px;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(2, 32px);
  align-items: center;
`;

// Headers
const StyledLabel = styled.label`
  color: #c2c0c2;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 24px;
`;

const StyledValue = styled.p`
  color: #0c1439;
  font-size: 14px;
  letter-spacing: 0;
  line-height: 24;
`;

type Props = {
  createdOn?: string;
  error: boolean;
  lastUpdatedOn?: string;
  loading: boolean;
  orderReference?: string;
  orderStatus?: string;
  sourceOfSale?: string;
};

const OrderDetailsSummary = ({
  loading,
  error,
  orderReference,
  createdOn,
  lastUpdatedOn,
  sourceOfSale,
  orderStatus,
}: Props): ReactElement => {
  const missingDataAbbr = 'MD';

  return (
    <ContainerCard color="#654DA0" title="Order details">
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
              <StyledLabel>Order reference #</StyledLabel>
              <StyledLabel>Last updated</StyledLabel>
              <StyledLabel>Date created</StyledLabel>
              <StyledLabel>Source of sale</StyledLabel>
              <StyledLabel>Order status</StyledLabel>

              <StyledValue>#{orderReference}</StyledValue>
              <StyledValue>
                {(lastUpdatedOn && formatDefaultDateTime(lastUpdatedOn)) ||
                  missingDataAbbr}
              </StyledValue>

              <StyledValue>
                {(createdOn && formatDefaultDateTime(createdOn)) ||
                  missingDataAbbr}
              </StyledValue>

              <StyledValue>{sourceOfSale}</StyledValue>

              <StatePlate state={orderStatus || missingDataAbbr} />
            </StyledGridContainer>
          </>
        )}
      </StyledContainer>
    </ContainerCard>
  );
};

export default OrderDetailsSummary;
