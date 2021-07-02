import { Button } from '@websummit/components/src/atoms/Button';
import Loader from '@websummit/components/src/atoms/Loader';
import BoxMessage from '@websummit/components/src/molecules/BoxMessage';
import Breadcrumbs, {
  Breadcrumb,
} from '@websummit/components/src/molecules/Breadcrumbs';
import ContainerCard from '@websummit/components/src/molecules/ContainerCard';
import { useModalState } from '@websummit/components/src/molecules/Modal';
import { useSnackbars } from '@websummit/components/src/molecules/Snackbar';
import TextInput from '@websummit/components/src/molecules/TextInput';
import { Spacing } from '@websummit/components/src/templates/Spacing';
import {
  CommerceGetProductQueryVariables,
  CommerceProduct,
  CommerceProductType,
  CommerceStore,
  useCommerceGetProductQuery,
  useCommerceGetStoreQuery,
  useCommerceListCategoriesQuery,
  useCommerceListPaymentMethodsQuery,
} from '@websummit/graphql/src/@types/operations';
import { switchCase } from '@websummit/tsutils/src/lib/utils/logic';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import useCopyToClipboard from '../../lib/hooks/useCopyToClipboard';
import { useRequestContext } from '../app/AppContext';
import InviteToPurhcaseModal from '../modals/InviteToPurchaseModal';
import TicketPackageItemModalWrapper from '../modals/TicketPackageItemModalWrapper';
import TicketPackageItemRemovalModal from '../modals/TicketPackageItemRemovalModal';
import PackageProductsList from '../organisms/PackageProductsList';
import TicketTypeForm from '../organisms/TicketTypeForm';

const Separator = styled.div`
  width: 100%;
  height: 1px;
  border-top: 3px solid #f1f1f1;
`;

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
  width: 70%;
  min-width: 700px;
`;

// Good candidate to move to package templates
const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
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
  ticketType?: Partial<CommerceProduct>,
  store?: Pick<CommerceStore, 'baseUrl' | 'slug'> | null,
) => {
  if (ticketType && store) {
    const productData = encodeURIComponent(
      JSON.stringify([{ product: ticketType?.id, quantity: 1 }]),
    );

    return `${store?.baseUrl || ''}/store/${
      store?.slug || ''
    }/orders/create-order?products=${productData}`;
  }

  return 'Generating link...';
};

const TicketTypePage = () => {
  const copyToClipboard = useCopyToClipboard();

  const context = useRequestContext();
  const { error } = useSnackbars();
  const { isOpen, closeModal, openModal } = useModalState();
  const { id: ticketTypeId } = useParams<CommerceGetProductQueryVariables>();

  const { data, loading } = useCommerceGetProductQuery({
    context,
    onError: (e) => error(e.message),
    variables: { id: ticketTypeId },
  });

  const ticketType = data?.commerceGetProduct as
    | (Partial<CommerceProduct> & {
        active: boolean;
        id: string;
        name?: string;
      })
    | undefined;

  const { data: commerceCategoriesData } = useCommerceListCategoriesQuery({
    context,
    onError: (e) => error(e.message),
  });

  const { data: paymentMethodsData } = useCommerceListPaymentMethodsQuery({
    context,
  });

  const { data: storeData, loading: loadingStore } = useCommerceGetStoreQuery({
    context,
  });

  const store = storeData?.commerceGetStore;

  const genericLink = generateLink(ticketType, store);

  const taxTypes = store?.taxTypes || [];

  const ticketCategories =
    commerceCategoriesData?.commerceListCategories?.hits || [];

  const activePaymentMethods =
    paymentMethodsData?.commerceListPaymentMethods?.hits?.filter(
      (method) => method.active,
    );

  const breadcrumbsRoutes: Breadcrumb[] = [
    {
      label: 'Ticket types',
      redirectUrl: '/ticket-types',
    },
    {
      label: `${ticketType?.name as string}`,
    },
  ];

  const isStoreConfigured = Boolean(!loadingStore && store);

  const isTicketTypeFree = ticketType?.price === 0;

  const hasPackageProducts =
    ticketType?.packagedProducts && ticketType?.packagedProducts?.length > 0;
  const packagedProducts = ticketType?.packagedProducts;
  const mapInitialType = (type: CommerceProductType): boolean => {
    return switchCase({
      [CommerceProductType.Simple]: false,
      [CommerceProductType.Package]: true,
    })(false)(type);
  };
  const productId = ticketType?.id as string;

  const isPackage = mapInitialType(ticketType?.type as CommerceProductType);
  const {
    isOpen: isPackageItemRemovalModalOpen,
    closeModal: packageItemRemovalModalClose,
    openModal: packageItemRemovalOpenModal,
  } = useModalState();
  const [packageItemId, setPackageItemId] = useState<any>();
  const openDeleteItemModal = (itemId: string) => {
    setPackageItemId(itemId);
    packageItemRemovalOpenModal();
  };

  const {
    isOpen: packageIsOpen,
    closeModal: packageCloseModal,
    openModal: packageOpenModal,
  } = useModalState();

  const [prefillData, setPrefillData] = useState<any>({
    product: '',
    quantity: 1,
  });
  const onButtonClick = () => {
    setPrefillData({
      product: '',
      quantity: 1,
    });

    packageOpenModal();
  };
  const onRowClick = (event: any) => {
    setPrefillData({
      id: event.id,
      product: event.packagedProduct.id,
      quantity: event.quantity,
    });

    packageOpenModal();
  };

  return (
    <Container>
      {productId && (
        <TicketPackageItemModalWrapper
          closeModal={packageCloseModal}
          isOpen={packageIsOpen}
          prefillData={prefillData}
          productId={productId}
        />
      )}

      <TicketPackageItemRemovalModal
        closeModal={packageItemRemovalModalClose}
        id={ticketType?.id as string}
        isOpen={isPackageItemRemovalModalOpen}
        itemId={packageItemId}
      />

      <FlexCol>
        <FlexRow>
          <Breadcrumbs routes={breadcrumbsRoutes} />
        </FlexRow>

        <FlexRow>
          <ContainerCard>
            <>
              <Spacing bottom="1rem">
                <Header>Ticket type</Header>
              </Spacing>
              {loading && <Loader />}
              {ticketType && (
                <TicketTypeForm
                  country={store?.country}
                  currencySymbol={store?.currencySymbol || ''}
                  taxTypes={taxTypes}
                  ticketCategories={ticketCategories}
                  ticketType={ticketType}
                />
              )}
            </>
          </ContainerCard>
        </FlexRow>

        {isPackage && (
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
                  <Button onClick={onButtonClick}>
                    Add tickets to package
                  </Button>
                </Spacing>

                {loading && <Loader />}

                {hasPackageProducts && (
                  <Spacing bottom="2rem" top="2rem">
                    <PackageProductsList
                      packages={packagedProducts}
                      onActionClick={openDeleteItemModal}
                      onRowClick={onRowClick}
                    />
                  </Spacing>
                )}
              </>
            </ContainerCard>
          </FlexRow>
        )}

        <FlexRow>
          <ContainerCard>
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
            <InviteToPurhcaseModal
              activePaymentMethods={activePaymentMethods}
              isOpen={isOpen}
              store={store}
              ticketType={ticketType}
              onRequestClose={closeModal}
            />

            {isStoreConfigured && !isTicketTypeFree && (
              <>
                <Spacing bottom="2rem" top="2rem">
                  <Separator />
                </Spacing>
                <GenericLinkContainer>
                  <StyledTextInput
                    label="Generic invite link for mass distribution"
                    value={genericLink}
                  />
                  <StyledButton onClick={() => copyToClipboard(genericLink)}>
                    Copy
                  </StyledButton>
                </GenericLinkContainer>
              </>
            )}
          </ContainerCard>
        </FlexRow>
      </FlexCol>
    </Container>
  );
};

export default TicketTypePage;
