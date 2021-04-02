import { Button } from '@websummit/components/src/atoms/Button';
import { useErrorSnackbar } from '@websummit/components/src/molecules/Snackbar';
import { Spacing } from '@websummit/components/src/templates/Spacing';
import { useSalesCyclesQuery } from '@websummit/graphql/src/@types/operations';
import React, { useState } from 'react';
import styled from 'styled-components';

import { useModalState } from '../../../../ticket-support/src/lib/components/molecules/Modal';
import PageContainer from '../../lib/components/templates/PageContainer';
import NoCyclesPlaceholderImage from '../../lib/images/no-sale-cycle-placeholder.png';
import Loader from '../../lib/Loading';
import { ModalInputMode } from '../../lib/types/modals';
import { useAppContext } from '../app/AppContext';
import SaleCycleModalWrapper from '../modals/SaleCycleModalWrapper';
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
  const { isOpen, closeModal, openModal } = useModalState();
  const [modalMode, setModalMode] = useState<ModalInputMode>('ADD');
  const onButtonClick = () => {
    setModalMode('ADD');
    openModal();
  };
  const onRowClick = () => {
    setModalMode('EDIT');
    openModal();
  };
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

      <SaleCycleModalWrapper
        closeModal={closeModal}
        isOpen={isOpen}
        mode={modalMode}
        prefillData={{
          description: 'test desc',
          name: 'test name',
        }}
      />

      <FlexCol>
        <FlexRow>
          <HeaderText>Sale cycles</HeaderText>
          <Button onClick={onButtonClick}>Create new sale cycle</Button>
        </FlexRow>

        {!loading && !hasCycles && <NoSalesCyclesPlaceholder />}

        {cycles && hasCycles && (
          <FlexRow>
            <SalesCyclesList cycles={cycles} onRowClick={onRowClick} />
          </FlexRow>
        )}
      </FlexCol>
    </Container>
  );
};

export default SalesCyclesPage;
