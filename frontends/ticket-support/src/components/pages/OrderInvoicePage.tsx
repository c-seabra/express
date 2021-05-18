import Loader from '@websummit/components/src/atoms/Loader';
import Breadcrumbs, {
  Breadcrumb,
} from '@websummit/components/src/molecules/Breadcrumbs';
import ContainerCard from '@websummit/components/src/molecules/ContainerCard';
import { Spacing } from '@websummit/components/src/templates/Spacing';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import useEventDataQuery from '../../lib/hooks/useEventDataQuery';
import useSingleCommerceOrderQuery from '../../lib/hooks/useSingleCommerceOrderQuery';
import OrderInvoiceForm from '../order/OrderInvoiceForm';

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
  const { orderRef, orderId } = useParams<{
    orderId: string;
    orderRef: string;
  }>();
  const { commerceOrder, loadingCommerceOrder } = useSingleCommerceOrderQuery({
    id: orderId,
  });

  const customer = commerceOrder?.customer;
  const [prefillData, setPrefillData] = useState({});
  useEffect(() => {
    setPrefillData({
      addressLine1: customer?.address?.line1?.trim(),
      addressLine2: customer?.address?.line2?.trim(),
      city: customer?.address?.city.trim(),
      companyName: customer?.companyName?.trim(),
      companyTaxNo: customer?.vatNumber?.trim(),
      country: customer?.address?.country?.trim(),
      email: customer?.email.trim(),
      firstName: customer?.firstName.trim(),
      id: customer?.id,
      lastName: customer?.lastName.trim(),
      phoneNumber: customer?.phoneNumber?.trim(),
      postalCode: customer?.address?.postalCode.trim(),
    });
  }, [customer]);

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

                {loadingCommerceOrder && <Loader />}
                {!loadingCommerceOrder && (
                  <OrderInvoiceForm
                    orderId={orderId}
                    prefillData={prefillData}
                  />
                )}
              </>
            </ContainerCard>
          </InnerWrapper>
        </FlexRow>
      </FlexCol>
    </Container>
  );
};

export default OrderInvoicePage;
