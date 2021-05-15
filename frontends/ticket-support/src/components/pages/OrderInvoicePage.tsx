import Loader from '@websummit/components/src/atoms/Loader';
import Breadcrumbs, {
  Breadcrumb,
} from '@websummit/components/src/molecules/Breadcrumbs';
import ContainerCard from '@websummit/components/src/molecules/ContainerCard';
import { useModalState } from '@websummit/components/src/molecules/Modal';
import { useErrorSnackbar } from '@websummit/components/src/molecules/Snackbar';
import { Spacing } from '@websummit/components/src/templates/Spacing';
import {
  SaleCyclesQueryVariables,
  useCommerceGetStoreQuery,
  useSaleCyclesQuery,
} from '@websummit/graphql/src/@types/operations';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import useEventDataQuery from '../../lib/hooks/useEventDataQuery';
import { useRequestContext } from '../app/AppContext';

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

const OrderInvoicePage = () => {
  const errorSnackbar = useErrorSnackbar();
  const { isOpen, closeModal, openModal } = useModalState();
  const [prefillData, setPrefillData] = useState<any>();
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
  const context = useRequestContext();
  const { data: store } = useCommerceGetStoreQuery({
    context,
    onError: (e) => console.error(e.message),
  });
  const { id: saleId } = useParams<SaleCyclesQueryVariables>();
  const { loading, data } = useSaleCyclesQuery({
    context,
    onError: (error) => errorSnackbar(error.message),
    variables: {
      id: saleId,
    },
  });

  const orderRef = 'test'
  const { event } = useEventDataQuery();
  const breadcrumbsRoutes: Breadcrumb[] = [
    {
      label: event?.name || 'Home',
      redirectUrl: '/',
    },
    {
      label: 'Orders',
      redirectUrl: '/orders',
    },
    {
      label: `Order ${orderRef}`,
      redirectUrl: `/order/${orderRef}`,
    },
    {
      label: 'Invoice',
    },
  ];

  return (
    <Container>
      <FlexCol>
        <FlexRow>
          <Breadcrumbs routes={breadcrumbsRoutes} />
        </FlexRow>

        <FlexRow>
          <InnerWrapper>
            <ContainerCard>
              <>
                <Spacing bottom="1.25rem">
                  <Header>Invoice information</Header>
                </Spacing>
                <SubHeader>Edit order invoice details</SubHeader>

                {loading && <Loader />}
                {/* {invoice && <OrderInvoiceForm prefillData={cycle} />} */}
              </>
            </ContainerCard>
          </InnerWrapper>
        </FlexRow>
      </FlexCol>
    </Container>
  );
};

export default OrderInvoicePage;
