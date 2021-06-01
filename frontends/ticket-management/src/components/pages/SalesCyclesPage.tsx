import { Button } from '@websummit/components/src/atoms/Button';
import Loader from '@websummit/components/src/atoms/Loader';
import BlockMessage from '@websummit/components/src/molecules/BlockMessage';
import ContainerCard from '@websummit/components/src/molecules/ContainerCard';
import { useErrorSnackbar } from '@websummit/components/src/molecules/Snackbar';
import { Spacing } from '@websummit/components/src/templates/Spacing';
import { useSalesCyclesQuery } from '@websummit/graphql/src/@types/operations';
import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { useModalState } from '../../../../ticket-support/src/lib/components/molecules/Modal';
import { useRequestContext } from '../app/AppContext';
import SaleCycleModalWrapper, {
  SaleCycleFormData,
} from '../modals/SaleCycleModalWrapper';
import SalesCyclesList from '../organisms/SalesCyclesList';

export const Container = styled.div`
  max-width: 1440px;
  margin: auto;
  padding-top: 1rem;
`;

const FlexRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 26px 0;
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

const SalesCyclesPage = () => {
  const context = useRequestContext();
  const history = useHistory();
  const errorSnackbar = useErrorSnackbar();
  const { isOpen, closeModal, openModal } = useModalState();
  const redirectToCycle = (id: string) => {
    history.push(`/sale-cycle/${id}`);
  };
  const onRowClick = (event: SaleCycleFormData) => {
    redirectToCycle(event.id);
  };

  const { loading, data } = useSalesCyclesQuery({
    context,
    onError: (error) => errorSnackbar(error.message),
  });

  const hasCycles =
    data?.commerceListSales?.hits && data?.commerceListSales?.hits?.length > 0;
  const cycles: any = data?.commerceListSales?.hits;
  const sortedCycles: any = cycles?.slice()?.sort((a: any, b: any) => {
    return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
  });

  const shouldRenderCycles = !loading && !!hasCycles;
  const shouldNotRenderCycles = !!hasCycles;

  return (
    <Container>
      {loading && <Loader />}

      <SaleCycleModalWrapper closeModal={closeModal} isOpen={isOpen} />

      <FlexCol>
        <FlexRow>
          <Spacing bottom="1rem">
            <HeaderText>Sale cycles</HeaderText>
          </Spacing>

          {shouldRenderCycles && (
            <Button onClick={openModal}>Create new sale cycle</Button>
          )}
        </FlexRow>

        {!shouldNotRenderCycles && (
          <ContainerCard>
            <Spacing bottom="36px" left="24px" right="24px" top="36px">
              <BlockMessage
                buttonText="Create now"
                header="Create new sale cycle"
                message="Please create a new cycle to see results"
                onClickAction={openModal}
              />
            </Spacing>
          </ContainerCard>
        )}

        {shouldRenderCycles && (
          <FlexRow>
            <SalesCyclesList cycles={sortedCycles} onRowClick={onRowClick} />
          </FlexRow>
        )}
      </FlexCol>
    </Container>
  );
};

export default SalesCyclesPage;
