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
  useCommerceGetDealQuery,
  useCommerceGetStoreQuery,
  useCommerceListDealItemsQuery,
} from '@websummit/graphql/src/@types/operations';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { useRequestContext } from '../app/AppContext';
import PackageItemModalWrapper from '../modals/PackageItemModalWrapper';
import DealItemsList from '../organisms/DealItemsList';
import PackageForm, { PackageFormData } from '../organisms/PackageForm';

export const Container = styled.div`
  max-width: 1440px;
  margin: auto;
  padding-top: 1rem;
`;

export const InnerWrapper = styled.div`
  width: 75%;
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

const PackagePage = () => {
  const context = useRequestContext();
  const errorSnackbar = useErrorSnackbar();
  const { isOpen, closeModal, openModal } = useModalState();
  const [prefillData, setPrefillData] = useState<PackageFormData>();
  const onButtonClick = () => {
    openModal();
  };
  // const onRowClick = (event: PackageItemFormData) => {
  const onRowClick = (event: any) => {
    console.log('onRowClick', event);
    setPrefillData({
      amount: event.amount,
      id: event.id,
      max: event.max,
      min: event.min,
      product: event.product,
      step: event.step,
      type: event.type,
    });

    openModal();
  };
  const { data: store } = useCommerceGetStoreQuery({
    context,
    onError: (e) => console.error(e.message),
  });
  const storeCurrencySymbol = store?.commerceGetStore?.currencySymbol;
  const { id: dealId } = useParams<any>();
  const { loading: dealLoading, data: dealResponse } = useCommerceGetDealQuery({
    context,
    onError: (error) => errorSnackbar(error.message),
    variables: {
      id: dealId,
    },
  });
  const deal = dealResponse?.commerceGetDeal;
  const {
    loading: dealItemsLoading,
    data: dealItemsResponse,
  } = useCommerceListDealItemsQuery({
    context,
    onError: (error) => errorSnackbar(error.message),
    variables: {
      dealId,
    },
  });
  const dealItems = dealItemsResponse?.commerceListDealItems?.hits;
  const hasDealItems = dealItems && dealItems.length > 0;
  const breadcrumbsRoutes: Breadcrumb[] = [
    {
      label: 'Packages',
      redirectUrl: '/packages',
    },
    {
      label: `${deal?.name as string}`,
    },
  ];

  return (
    <Container>
      <PackageItemModalWrapper
        closeModal={closeModal}
        currencySymbol={storeCurrencySymbol as string}
        dealId={dealId}
        existingDeals={dealItems}
        isOpen={isOpen}
        prefillData={prefillData}
      />

      <FlexCol>
        <FlexRow>
          <Breadcrumbs routes={breadcrumbsRoutes} />
        </FlexRow>

        <FlexRow>
          <InnerWrapper>
            <ContainerCard>
              <>
                <Spacing bottom="1.25rem">
                  <Header>Package</Header>
                </Spacing>
                <SubHeader>Edit package details</SubHeader>

                {dealLoading && <Loader />}
                {deal && <PackageForm prefillData={deal} />}
              </>
            </ContainerCard>
          </InnerWrapper>
        </FlexRow>

        {!dealItems && (
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
                <Spacing bottom="1.25rem">
                  <Header>Specify package details</Header>
                </Spacing>
                <SubHeader>
                  Add one or more ticket types to the package
                </SubHeader>
              </Spacing>
              <Spacing bottom="1rem">
                <Button onClick={onButtonClick}>Add tickets to package</Button>
              </Spacing>

              {dealItemsLoading && <Loader />}

              {hasDealItems && (
                <Spacing bottom="2rem" top="2rem">
                  <DealItemsList products={dealItems} onRowClick={onRowClick} />
                </Spacing>
              )}
            </>
          </ContainerCard>
        </FlexRow>
      </FlexCol>
    </Container>
  );
};

export default PackagePage;
