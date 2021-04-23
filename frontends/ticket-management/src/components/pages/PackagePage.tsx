import { Button } from '@websummit/components/src/atoms/Button';
import Loader from '@websummit/components/src/atoms/Loader';
import BoxMessage from '@websummit/components/src/molecules/BoxMessage';
import Breadcrumbs, {
  Breadcrumb,
} from '@websummit/components/src/molecules/Breadcrumbs';
import ContainerCard from '@websummit/components/src/molecules/ContainerCard';
import { useModalState } from '@websummit/components/src/molecules/Modal';
import { useErrorSnackbar } from '@websummit/components/src/molecules/Snackbar';
import TextInput from '@websummit/components/src/molecules/TextInput';
import { Spacing } from '@websummit/components/src/templates/Spacing';
import {
  CommerceDeal,
  CommerceDealItem,
  CommerceProduct,
  CommerceStore,
  Maybe,
  useCommerceGetDealQuery,
  useCommerceGetStoreQuery,
} from '@websummit/graphql/src/@types/operations';
import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import useCopyToClipboard from '../../lib/hooks/useCopyToClipboard';
import { useRequestContext } from '../app/AppContext';
import PackageForm from '../organisms/PackageForm';

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

const StyledContainerCard = styled(ContainerCard)`
  width: 75%;
`;

const Separator = styled.div`
  width: 100%;
  height: 1px;
  border-top: 3px solid #f1f1f1;
`;

const GenericLinkContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const StyledTextInput = styled(TextInput)`
  width: 100%;
`;

const StyledButton = styled(Button)`
  min-height: 40px;
  margin-bottom: 3px;
  margin-left: -5px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
`;

const generateLink = (
  deal?:
    | ({ __typename?: 'CommerceDeal' } & Pick<
        CommerceDeal,
        | 'active'
        | 'createdAt'
        | 'description'
        | 'endDate'
        | 'id'
        | 'lastUpdatedAt'
        | 'metadata'
        | 'name'
        | 'startDate'
      > & {
          dealItems: Maybe<
            Array<
              { __typename?: 'CommerceDealItem' } & Pick<
                CommerceDealItem,
                | 'amount'
                | 'createdAt'
                | 'id'
                | 'lastUpdatedAt'
                | 'max'
                | 'metadata'
                | 'min'
                | 'step'
                | 'type'
              > & {
                  product: Maybe<
                    { __typename?: 'CommerceProduct' } & Pick<
                      CommerceProduct,
                      'id' | 'active' | 'description' | 'name'
                    >
                  >;
                }
            >
          >;
        })
    | null
    | undefined,
  store?: Pick<CommerceStore, 'baseUrl' | 'slug'> | null | undefined,
) => {
  if (deal && store) {
    const productData = encodeURIComponent(
      JSON.stringify(
        deal?.dealItems?.map((dealItem) => ({
          product: dealItem?.product?.id,
          quantity: dealItem?.min,
        })),
      ),
    );

    return `${store?.baseUrl || ''}/store/${
      store?.slug || ''
    }/orders/create-order?products=${productData}&deal=${deal?.id || ''}`;
  }

  return 'Generating link...';
};

const PackagePage = () => {
  const context = useRequestContext();
  const errorSnackbar = useErrorSnackbar();
  /* DO NOTE REMOVE: WILL BE USED IN NEXT ITERATION */
  // const { isOpen, closeModal, openModal } = useModalState();
  // const [prefillData, setPrefillData] = useState<PackageFormData>();
  // const onButtonClick = () => {
  //   setPrefillData({
  //     active: false,
  //     description: '',
  //     id: '',
  //     name: '',
  //     // product: '',
  //     type: '',
  //   });
  //
  //   openModal();
  // };
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
  // const { data: store } = useCommerceGetStoreQuery({
  //   context,
  //   onError: (e) => console.error(e.message),
  // });
  // const storeCurrencySymbol = store?.commerceGetStore?.currencySymbol;
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
  /* DO NOTE REMOVE: WILL BE USED IN NEXT ITERATION */

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

  const copyToClipboard = useCopyToClipboard();
  const { isOpen, closeModal, openModal } = useModalState();

  const { data: storeData, loading: loadingStore } = useCommerceGetStoreQuery({
    context,
  });

  const store = storeData?.commerceGetStore;
  const isStoreConfigured = Boolean(!loadingStore && store);

  const genericLink = generateLink(deal, store);

  return (
    <Container>
      {/* DO NOTE REMOVE: WILL BE USED IN NEXT ITERATION */}

      {/* <DealProductModalWrapper */}
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

        {/* DO NOTE REMOVE: WILL BE USED IN NEXT ITERATION */}

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

        <FlexRow>
          <StyledContainerCard>
            <Spacing bottom="2rem" top="1rem">
              <Spacing bottom="1rem">
                <Header>Invite to purchase</Header>
              </Spacing>
              <SubHeader>
                Create a custom invite for an individual or copy a generic link
                for mass distribution
              </SubHeader>
            </Spacing>
            {isStoreConfigured ? (
              <Button onClick={openModal}>Generate an invite</Button>
            ) : (
              <BoxMessage backgroundColor="#333333" color="#fff" dimension="sm">
                The store for this event has not been configured properly. Some
                functionality may be limited.
              </BoxMessage>
            )}
            {/*<InviteToPurhcaseModal*/}
            {/*  activePaymentMethods={activePaymentMethods}*/}
            {/*  isOpen={isOpen}*/}
            {/*  store={store}*/}
            {/*  ticketType={ticketType}*/}
            {/*  onRequestClose={closeModal}*/}
            {/*/>*/}
            <Spacing bottom="2rem" top="2rem">
              <Separator />
            </Spacing>
            <>
              {isStoreConfigured && (
                <GenericLinkContainer>
                  <StyledTextInput
                    label="Generic invite link for mass distribution"
                    value={genericLink}
                  />
                  <StyledButton onClick={() => copyToClipboard(genericLink)}>
                    Copy
                  </StyledButton>
                </GenericLinkContainer>
              )}
            </>
          </StyledContainerCard>
        </FlexRow>
      </FlexCol>
    </Container>
  );
};

export default PackagePage;
