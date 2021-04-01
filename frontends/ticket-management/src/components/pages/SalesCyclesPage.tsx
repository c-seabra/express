import { Button } from '@websummit/components/src/atoms/Button';
// TODO: Add svg when asset available
// import NoEventsPlaceholderImage from '../../lib/images/no-events-placeholder.png';
import { useErrorSnackbar } from '@websummit/components/src/molecules/Snackbar';
import { Spacing } from '@websummit/components/src/templates/Spacing';
import React from 'react';
import styled from 'styled-components';

import { useSalesCyclesQuery } from '@websummit/graphql/src/@types/operations';
import Loader from '../../lib/Loading';
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

const PlaceholderHeaderText = styled.h1`
  color: #0c1439;
  font-size: 36px;
  font-weight: 500;
  letter-spacing: -1px;
  line-height: 64px;
`;

const PlaceholderText = styled.span`
  color: #0c1439;
  font-size: 20px;
  letter-spacing: 0;
  line-height: 32px;
`;

const NoSalesCyclesPlaceholder = () => {
  return (
    <FlexCol>
      <Spacing bottom="6rem" top="4.125rem">
        <FlexRow>
          <Centered>
            <FlexCol>
              <PlaceholderHeaderText>Create a sale cycle</PlaceholderHeaderText>
              <PlaceholderText>
                Create anything from “super early bird” to “late late” cycles.
              </PlaceholderText>
            </FlexCol>

            <FlexCol>
              {/* <img alt="Sales cycles placeholder" src={NoEventsPlaceholderImage} /> */}
              <img alt="Sales cycles placeholder" src="#" />
            </FlexCol>
          </Centered>
        </FlexRow>
      </Spacing>
    </FlexCol>
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
  const cycles = data?.commerceListSales && data?.commerceListSales?.hits;

  return (
    <Container>
      {loading && <Loader />}

      <FlexCol>
        <FlexRow>
          <HeaderText>Sale cycles</HeaderText>
          <Button>Create new sale cycle</Button>
        </FlexRow>

        {!loading && !hasCycles && <NoSalesCyclesPlaceholder />}

        {hasCycles && (
          <FlexRow>
            <SalesCyclesList cycles={cycles} />
          </FlexRow>
        )}
      </FlexCol>
    </Container>
  );
};

export default SalesCyclesPage;
