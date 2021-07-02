import { Button } from '@websummit/components/src/atoms/Button';
import Loader from '@websummit/components/src/atoms/Loader';
import BoxMessage from '@websummit/components/src/molecules/BoxMessage';
import Breadcrumbs, {
  Breadcrumb,
} from '@websummit/components/src/molecules/Breadcrumbs';
import ContainerCard from '@websummit/components/src/molecules/ContainerCard';
import { useModalState } from '@websummit/components/src/molecules/Modal';
import { useErrorSnackbar } from '@websummit/components/src/molecules/Snackbar';
import { Spacing } from '@websummit/components/src/templates/Spacing';
import {
  CommerceDeal,
  useCommerceGetDealQuery,
  useCommerceGetStoreQuery,
  useCommerceListDealItemsQuery,
  useCommerceListDealsQuery,
  useCommerceListPaymentMethodsQuery,
} from '@websummit/graphql/src/@types/operations';
import {
  discountFilter,
  discountTemplateFilter,
} from '@websummit/graphql/src/lib/presets/dealSearchTerms';
import { useRequestContext } from '@websummit/graphql/src/utils/AppContext';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import DiscountTemplateItemModalWrapper from '../modals/DiscountTemplateItemModalWrapper';
import DiscountTemplateItemRemovalModal from '../modals/DiscountTemplateItemRemovalModal';
import DealItemsList from '../organisms/DealItemsList';
import DiscountList from '../organisms/DiscountsList';
import DiscountTemplateForm from '../organisms/DiscountTemplateForm';

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

const StyledContainerCard = styled(ContainerCard)``;

const Separator = styled.div`
  width: 100%;
  height: 1px;
  border-top: 3px solid #f1f1f1;
`;

const DiscountTemplatePage = () => {
  const context = useRequestContext();
  const errorSnackbar = useErrorSnackbar();
  const {
    isOpen: packageIsOpen,
    closeModal: packageCloseModal,
    openModal: packageOpenModal,
  } = useModalState();
  const { isOpen, closeModal, openModal } = useModalState();
  const [prefillData, setPrefillData] = useState<any>(); // TODO reuse PackageFormData
  const onButtonClick = () => {
    setPrefillData({
      amount: 1,
      max: 999, // TODO fix to undefined / empty value?
      min: 1,
      name: '',
      product: '',
      step: 1,
      type: undefined,
    });

    packageOpenModal();
  };
  const onRowClick = (event: any) => {
    setPrefillData({
      amount: event.amount,
      id: event.id,
      max: event.max,
      min: event.min,
      name: event.name,
      product: event.product.id,
      step: event.step,
      type: event.type,
    });

    packageOpenModal();
  };
  const { id: dealId } = useParams<any>();
  const { loading: dealLoading, data: dealResponse } = useCommerceGetDealQuery({
    context,
    onError: (error) => errorSnackbar(error.message),
    variables: {
      id: dealId,
    },
  });
  const deal = dealResponse?.commerceGetDeal;
  const { loading: dealItemsLoading, data: dealItemsResponse } =
    useCommerceListDealItemsQuery({
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
      label: 'Discount Templates',
      redirectUrl: '/discounts',
    },
    {
      label: `${deal?.name as string}`,
    },
  ];

  const { data: storeData, loading: loadingStore } = useCommerceGetStoreQuery({
    context,
  });
  const store = storeData?.commerceGetStore;
  const isStoreConfigured = Boolean(!loadingStore && store);
  const storeCurrencySymbol = storeData?.commerceGetStore?.currencySymbol;
  const { data: paymentMethodsData } = useCommerceListPaymentMethodsQuery({
    context,
  });

  const activePaymentMethods =
    paymentMethodsData?.commerceListPaymentMethods?.hits?.filter(
      (method) => method.active,
    );
  const [dealItemId, setDealItemId] = useState<string>();
  const {
    isOpen: isPackageItemModalOpen,
    closeModal: packageItemModalClose,
    openModal: packageItemOpenModal,
  } = useModalState();
  const openDeleteItemModal = (itemId: string) => {
    setDealItemId(itemId);
    packageItemOpenModal();
  };

  const { loading, data: dealsResponse } = useCommerceListDealsQuery({
    context,
    onError: (error) => errorSnackbar(error.message),
    variables: {
      terms: discountFilter,
    },
  });
  const discounts = dealsResponse?.commerceListDeals?.hits as CommerceDeal[];
  const shouldRenderDiscounts = !loading && discounts?.length > 0;
  const shouldNotRenderDiscounts = loading && !discounts?.length;

  return (
    <Container>
      <DiscountTemplateItemModalWrapper
        closeModal={packageCloseModal}
        currencySymbol={storeCurrencySymbol as string}
        dealId={dealId}
        isOpen={packageIsOpen}
        prefillData={prefillData}
      />

      <DiscountTemplateItemRemovalModal
        closeModal={packageItemModalClose}
        dealId={dealId}
        dealItemId={dealItemId as string}
        isOpen={isPackageItemModalOpen}
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
                  <Header>Discount Template</Header>
                </Spacing>
                <SubHeader>Edit discount template details</SubHeader>

                {dealLoading && <Loader />}
                {deal && <DiscountTemplateForm prefillData={deal} />}
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
                  <Header>Specify Discount Template constraints</Header>
                </Spacing>
                <SubHeader>
                  Add one or more ticket types as constraints to the discount
                  template
                </SubHeader>
              </Spacing>
              <Spacing bottom="1rem">
                <Button onClick={onButtonClick}>
                  Add ticket constraints to discount template
                </Button>
              </Spacing>

              {dealItemsLoading && <Loader />}

              {hasDealItems && (
                <Spacing bottom="2rem" top="2rem">
                  <DealItemsList
                    currencySymbol={storeCurrencySymbol as string}
                    products={dealItems}
                    onActionClick={openDeleteItemModal}
                    onRowClick={onRowClick}
                  />
                </Spacing>
              )}
            </>
          </ContainerCard>
        </FlexRow>

        <FlexRow>
          <StyledContainerCard>
            <Spacing bottom="2rem" top="1rem">
              <Spacing bottom="1rem">
                <Header>Bulk Create Discount Codes</Header>
              </Spacing>
              <SubHeader>
                Create a bulk of discount codes for distribution
              </SubHeader>
            </Spacing>
            {isStoreConfigured ? (
              <Button disabled>Bulk Create Discount Codes</Button>
            ) : (
              <BoxMessage backgroundColor="#333333" color="#fff" dimension="sm">
                The store for this event has not been configured properly. Some
                functionality may be limited.
              </BoxMessage>
            )}
            <Spacing bottom="2rem" top="2rem">
              <Separator />
            </Spacing>

            {shouldNotRenderDiscounts && <Loader />}
            {shouldRenderDiscounts && <DiscountList discounts={discounts} />}
          </StyledContainerCard>
        </FlexRow>
      </FlexCol>
    </Container>
  );
};

export default DiscountTemplatePage;
