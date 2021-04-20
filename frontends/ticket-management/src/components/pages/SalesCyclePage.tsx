import { Button } from '@websummit/components/src/atoms/Button';
import Loader from '@websummit/components/src/atoms/Loader';
import Breadcrumbs, {
  Breadcrumb,
} from '@websummit/components/src/molecules/Breadcrumbs';
import ContainerCard from '@websummit/components/src/molecules/ContainerCard';
import { useModalState } from '@websummit/components/src/molecules/Modal';
import { useErrorSnackbar } from '@websummit/components/src/molecules/Snackbar';
import { Spacing } from '@websummit/components/src/templates/Spacing';
import {
  CommerceSortTermDirection,
  SaleCyclesQueryVariables,
  useCommerceGetStoreQuery,
  useCommerceListSaleProductsQuery,
  useSaleCyclesQuery,
} from '@websummit/graphql/src/@types/operations';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { useAppContext } from '../app/AppContext';
import SaleProductModalWrapper, {
  SaleProductFormData,
} from '../modals/SaleProductModalWrapper';
import ProductsList from '../organisms/ProductsList';
import SaleCycleForm from '../organisms/SaleCycleForm';

export const Container = styled.div`
  max-width: 1440px;
  margin: auto;
  padding-top: 1rem;
`;

const Header = styled.div`
  color: #0c1439;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 24px;
`;

const SubHeader = styled.div`
  color: #0c1439;
  font-size: 16px;
  letter-spacing: 0;
  line-height: 21px;
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

const SaleCyclesPage = () => {
  const errorSnackbar = useErrorSnackbar();
  const { isOpen, closeModal, openModal } = useModalState();
  const [prefillData, setPrefillData] = useState<SaleProductFormData>();
  const onButtonClick = () => {
    setPrefillData({
      active: false,
      description: '',
      id: '',
      name: '',
      product: '',
      type: '',
    });

    openModal();
  };
  const onRowClick = (event: any) => {
    setPrefillData({
      active: event.active,
      amount: event.price,
      description: event.description,
      id: event.id,
      name: event.name,
      product: event.product,
      type: event.type,
    });

    openModal();
  };
  const { conferenceSlug, token } = useAppContext();
  const context = {
    slug: conferenceSlug,
    token,
  };
  const { data: store } = useCommerceGetStoreQuery({
    context,
    onError: (e) => console.error(e.message),
  });
  const storeCurrencySymbol = store?.commerceGetStore?.currencySymbol;
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
    fetchPolicy: 'network-only',
    onError: (error) => errorSnackbar(error.message),
    variables: {
      saleId,
      sort: [
        {
          direction: CommerceSortTermDirection.Asc,
          field: 'createdAt',
        },
      ],
    },
  });
  const hasProducts =
    data?.commerceListSaleProducts?.hits &&
    data?.commerceListSaleProducts?.hits?.length > 0;
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
        currencySymbol={storeCurrencySymbol as string}
        existingProducts={products}
        isOpen={isOpen}
        prefillData={prefillData}
        saleId={saleId}
      />

      <FlexCol>
        <FlexRow>
          <Breadcrumbs routes={breadcrumbsRoutes} />
        </FlexRow>

        <FlexRow>
          <ContainerCard>
            <>
              <Header>Sale cycle</Header>
              {loadingCycles && <Loader />}
              {cycle && <SaleCycleForm prefillData={cycle} />}
            </>
          </ContainerCard>
        </FlexRow>

        {!products && (
          <FlexRow>
            <Spacing bottom="2rem">
              <span>No pricing added yet.</span>
            </Spacing>
          </FlexRow>
        )}

        <FlexRow>
          <ContainerCard>
            <>
              <Spacing bottom="2rem" top="1rem">
                <Header>Price information during sale cycle</Header>
                <SubHeader>
                  Add price information for ticket types during the sales cycle
                </SubHeader>
              </Spacing>
              <Spacing bottom="1rem">
                <Button onClick={onButtonClick}>
                  Add pricing for sales cycle
                </Button>
              </Spacing>

              {loadingProducts && <Loader />}

              {hasProducts && (
                <Spacing bottom="2rem" top="2rem">
                  <ProductsList
                    currencySymbol={storeCurrencySymbol as string}
                    products={products}
                    onRowClick={onRowClick}
                  />
                </Spacing>
              )}
            </>
          </ContainerCard>
        </FlexRow>
      </FlexCol>
    </Container>
  );
};

export default SaleCyclesPage;
