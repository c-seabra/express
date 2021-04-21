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
} from '@websummit/graphql/src/@types/operations';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { useRequestContext } from '../app/AppContext';
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
  const errorSnackbar = useErrorSnackbar();
  const { isOpen, closeModal, openModal } = useModalState();
  const [prefillData, setPrefillData] = useState<PackageFormData>();
  const onButtonClick = () => {
    // setPrefillData({
    //   active: false,
    //   description: '',
    //   id: '',
    //   name: '',
    //   // product: '',
    //   type: '',
    // });

    openModal();
  };
  // const onRowClick = (event: any) => {
  //   setPrefillData({
  //     active: event.active,
  //     amount: event.price,
  //     description: event.description,
  //     id: event.id,
  //     name: event.name,
  //     product: event.product,
  //     type: event.type,
  //   });
  //
  //   openModal();
  // };
  const context = useRequestContext();
  const { data: store } = useCommerceGetStoreQuery({
    context,
    onError: (e) => console.error(e.message),
  });
  const storeCurrencySymbol = store?.commerceGetStore?.currencySymbol;
  const { id: dealId } = useParams<any>();
  const {
    loading: loadingCycles,
    data: dealResponse,
  } = useCommerceGetDealQuery({
    context,
    onError: (error) => errorSnackbar(error.message),
    variables: {
      id: dealId,
    },
  });
  const deal = dealResponse?.commerceGetDeal;
  // const { loading: loadingDeals, data } = useCommerceListSaleDealsQuery({
  //   context,
  //   fetchPolicy: 'network-only',
  //   onError: (error) => errorSnackbar(error.message),
  //   variables: {
  //     saleId,
  //     sort: [
  //       {
  //         direction: CommerceSortTermDirection.Asc,
  //         field: 'createdAt',
  //       },
  //     ],
  //   },
  // });

  // const hasDeals =
  //   data?.commerceListSaleDeals?.hits &&
  //   data?.commerceListSaleDeals?.hits?.length > 0;
  // const products: any = data?.commerceListSaleDeals?.hits;
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
      {/* <SaleProductModalWrapper */}
      {/*  closeModal={closeModal} */}
      {/*  currencySymbol={storeCurrencySymbol as string} */}
      {/*  existingDeals={products} */}
      {/*  isOpen={isOpen} */}
      {/*  prefillData={prefillData} */}
      {/*  saleId={saleId} */}
      {/* /> */}

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

                {loadingCycles && <Loader />}
                {deal && <PackageForm prefillData={deal} />}
              </>
            </ContainerCard>
          </InnerWrapper>
        </FlexRow>

        {/* {!products && ( */}
        {/*  <FlexRow> */}
        {/*    <Spacing bottom="2rem"> */}
        {/*      <span>No pricing added yet.</span> */}
        {/*    </Spacing> */}
        {/*  </FlexRow> */}
        {/* )} */}

        {/* <FlexRow> */}
        {/*  <ContainerCard> */}
        {/*    <> */}
        {/*      <Spacing bottom="2rem" top="1rem"> */}
        {/*        <Spacing bottom="1.25rem"> */}
        {/*          <Header>Price information during sale cycle</Header> */}
        {/*        </Spacing> */}
        {/*        <SubHeader> */}
        {/*          Add price information for ticket types during the sales cycle */}
        {/*        </SubHeader> */}
        {/*      </Spacing> */}
        {/*      <Spacing bottom="1rem"> */}
        {/*        <Button onClick={onButtonClick}> */}
        {/*          Add pricing for sales cycle */}
        {/*        </Button> */}
        {/*      </Spacing> */}

        {/*      {loadingDeals && <Loader />} */}

        {/*      {hasDeals && ( */}
        {/*        <Spacing bottom="2rem" top="2rem"> */}
        {/*          <DealsList */}
        {/*            currencySymbol={storeCurrencySymbol as string} */}
        {/*            products={products} */}
        {/*            onRowClick={onRowClick} */}
        {/*          /> */}
        {/*        </Spacing> */}
        {/*      )} */}
        {/*    </> */}
        {/*  </ContainerCard> */}
        {/* </FlexRow> */}
      </FlexCol>
    </Container>
  );
};

export default PackagePage;
