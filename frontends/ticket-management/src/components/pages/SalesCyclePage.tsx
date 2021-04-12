import { Button } from '@websummit/components/src/atoms/Button';
import Breadcrumbs, {
  Breadcrumb,
} from '@websummit/components/src/molecules/Breadcrumbs';
import { useErrorSnackbar } from '@websummit/components/src/molecules/Snackbar';
import React, { useState } from 'react';
import styled from 'styled-components';

import ContainerCard from '@websummit/components/src/molecules/ContainerCard';
import { useModalState } from '../../../../ticket-support/src/lib/components/molecules/Modal';
import { ModalInputMode } from '../../lib/types/modals';
import { useAppContext } from '../app/AppContext';
import { SaleCycleFormData } from '../modals/SaleCycleModalWrapper';
import SaleCycleForm from '../organisms/SaleCycleForm';
import { useLocation } from 'react-router-dom';

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

const SaleCyclesPage = () => {
  const errorSnackbar = useErrorSnackbar();
  const { isOpen, closeModal, openModal } = useModalState();
  const [modalMode, setModalMode] = useState<ModalInputMode>('ADD');
  const [prefillData, setPrefillData] = useState<SaleCycleFormData>();
  const onButtonClick = () => {
    setModalMode('ADD');
    openModal();
  };
  const onRowClick = (event: SaleCycleFormData) => {
    setPrefillData({
      description: event.description,
      endDate: event.endDate,
      id: event.id,
      name: event.name,
      startDate: event.startDate,
    });

    setModalMode('EDIT');
    openModal();
  };
  const { conferenceSlug, token } = useAppContext();
  const context = {
    conferenceSlug,
    token,
  };
  const location = useLocation();
  // @ts-ignore
  const { state } = location;
  console.log(location, state);
  // TODO Adjust for products
  // const { loading, data } = useSalesCyclesQuery({
  //   context,
  //   onError: (error) => errorSnackbar(error.message),
  // });

  // const hasCycles =
  //   data?.commerceListSales?.hits && data?.commerceListSales?.hits?.length;
  // const cycles: any = data?.commerceListSales?.hits;

  const breadcrumbsRoutes: Breadcrumb[] = [
    {
      label: 'Sale cycles',
      redirectUrl: '/sales-cycles',
    },
    {
      // label: `Cycle - ${cycle.name}`,
      label: `Cycle - ${'test name'}`,
    },
  ];

  return (
    <Container>
      {/* Products TBA */}
      {/* <SaleProductModalWrapper */}
      {/*  closeModal={closeModal} */}
      {/*  isOpen={isOpen} */}
      {/*  mode={modalMode} */}
      {/*  prefillData={prefillData} */}
      {/* /> */}

      <FlexCol>
        <FlexRow>
          <Breadcrumbs routes={breadcrumbsRoutes} />
        </FlexRow>

        <FlexRow>
          <ContainerCard title="Sale cycle">
            {/*// @ts-ignore*/}
            <SaleCycleForm prefillData={(state && state.cycle) || {}} />
          </ContainerCard>
        </FlexRow>

        <FlexRow>
          <HeaderText>Products</HeaderText>
          <Button onClick={onButtonClick}>Create new product</Button>
        </FlexRow>
      </FlexCol>
    </Container>
  );
};

export default SaleCyclesPage;
