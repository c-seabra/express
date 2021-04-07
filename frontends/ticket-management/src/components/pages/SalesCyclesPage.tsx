import { Button } from '@websummit/components/src/atoms/Button';
import Loader from '@websummit/components/src/atoms/Loader';
import { useErrorSnackbar } from '@websummit/components/src/molecules/Snackbar';
import { Spacing } from '@websummit/components/src/templates/Spacing';
import { useSalesCyclesQuery } from '@websummit/graphql/src/@types/operations';
import React from 'react';
import styled from 'styled-components';

import PageContainer from '../../lib/components/templates/PageContainer';
import NoCyclesPlaceholderImage from '../../lib/images/no-sale-cycle-placeholder.png';
import { useAppContext } from '../app/AppContext';
import SalesCyclesList from '../organisms/SalesCyclesList';

export const Container = styled.div`
  max-width: 1440px;
  margin: auto;
  padding-top: 1rem;
`;

const Centered = styled.div`
  display: flex;
  margin: 0 auto;
`;

const FlexRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 26px 36px;
`;

// Good candidate to move to package templates
const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeaderText = styled.h1`
  color: #0c1439;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 32px;
  margin: 0;
`;

const Placeholder = styled.img`
  max-width: 1440px;
`;

const NoSalesCyclesPlaceholder = () => {
  return (
    <PageContainer>
      <Spacing bottom="4rem" top="2.125rem">
        <Placeholder
          alt="No sales cycles placeholder"
          src={NoCyclesPlaceholderImage}
        />
      </Spacing>
    </PageContainer>
  );
};

const SalesCyclesPage = () => {
  const errorSnackbar = useErrorSnackbar();
  const { conferenceSlug, token } = useAppContext();
  const context = {
    conferenceSlug,
    token,
  };

  const { loading, data } = useSalesCyclesQuery({
    context,
    onError: (error) => errorSnackbar(error.message),
  });

  const hasCycles =
    data?.commerceListSales?.hits && data?.commerceListSales?.hits?.length;
  const cycles: any = data?.commerceListSales?.hits;

  return (
    <Container>
      {loading && <Loader />}

      <FlexCol>
        <FlexRow>
          <HeaderText>Sale cycles</HeaderText>
          <Button>Create new sale cycle</Button>
        </FlexRow>

        {!loading && !hasCycles && <NoSalesCyclesPlaceholder />}

        {cycles && hasCycles && (
          <FlexRow>
            <SalesCyclesList cycles={cycles} />
          </FlexRow>
        )}
      </FlexCol>
    </Container>
  );
};

export default SalesCyclesPage;
