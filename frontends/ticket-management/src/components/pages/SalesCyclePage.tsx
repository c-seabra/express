import { Button } from '@websummit/components/src/atoms/Button';
import Loader from '@websummit/components/src/atoms/Loader';
import Breadcrumbs, {
  Breadcrumb,
} from '@websummit/components/src/molecules/Breadcrumbs';
import ContainerCard from '@websummit/components/src/molecules/ContainerCard';
import { useErrorSnackbar } from '@websummit/components/src/molecules/Snackbar';
import { Spacing } from '@websummit/components/src/templates/Spacing';
import {
  SaleCyclesQueryVariables,
  useCommerceListProductsQuery,
  useCommerceListSaleProductsQuery,
  useSaleCyclesQuery,
} from '@websummit/graphql/src/@types/operations';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { useModalState } from '../../../../ticket-support/src/lib/components/molecules/Modal';
import { ModalInputMode } from '../../lib/types/modals';
import { useAppContext } from '../app/AppContext';
import { SaleCycleFormData } from '../modals/SaleCycleModalWrapper';
import SaleProductModalWrapper from '../modals/SaleProductModalWrapper';
import ProductsList from '../organisms/ProductsList';
import SaleCycleForm from '../organisms/SaleCycleForm';

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
  // const onRowClick = (event: SaleCycleFormData) => {
  //   setPrefillData({
  //     description: event.description,
  //     endDate: event.endDate,
  //     id: event.id,
  //     name: event.name,
  //     startDate: event.startDate,
  //   });
  //
  //   setModalMode('EDIT');
  //   openModal();
  // };
  const { conferenceSlug, token } = useAppContext();
  const context = {
    conferenceSlug,
    token,
  };
  const { id: saleId } = useParams<SaleCyclesQueryVariables>();
  const { loading: loadingCycles, data: saleCycles } = useSaleCyclesQuery({
    context,
    onError: (error) => errorSnackbar(error.message),
    variables: {
      id: saleId,
    },
  });
  const cycle = saleCycles?.commerceGetSale;
  const { loading: loadingProducts, data } = useCommerceListSaleProductsQuery({
    context,
    onError: (error) => errorSnackbar(error.message),
    variables: {
      saleId,
    },
  });
  const products: any = data?.commerceListSaleProducts?.hits;
  const breadcrumbsRoutes: Breadcrumb[] = [
    {
      label: 'Sale cycles',
      redirectUrl: '/sale-cycles',
    },
    {
      label: `${cycle?.name as string}`,
    },
  ];

  return (
    <Container>
      <SaleProductModalWrapper
        closeModal={closeModal}
        isOpen={isOpen}
        mode={modalMode}
        prefillData={prefillData}
      />

      <FlexCol>
        <FlexRow>
          <Breadcrumbs routes={breadcrumbsRoutes} />
        </FlexRow>

        <FlexRow>
          <ContainerCard title="Sale cycle">
            <>
              {loadingCycles && <Loader />}
              {cycle && <SaleCycleForm prefillData={cycle} />}
            </>
          </ContainerCard>
        </FlexRow>

        <FlexRow>
          <HeaderText>Products</HeaderText>
          <Button onClick={onButtonClick}>Create new product</Button>
        </FlexRow>

        {!products && (
          <FlexRow>
            <Spacing bottom="2rem">
              <span>No products added yet.</span>
            </Spacing>
          </FlexRow>
        )}

        {products && (
          <FlexRow>
            <Spacing bottom="2rem">
              <>
                {loadingProducts && <Loader />}
                <ProductsList products={products} />
              </>
            </Spacing>
          </FlexRow>
        )}

        <FlexRow>
          <Spacing bottom="1rem">
            <Button onClick={onButtonClick}>Add product to sale cycle</Button>
          </Spacing>
        </FlexRow>
      </FlexCol>
    </Container>
  );
};

export default SaleCyclesPage;
