import Loader from '@websummit/components/src/atoms/Loader';
import Breadcrumbs, {
  Breadcrumb,
} from '@websummit/components/src/molecules/Breadcrumbs';
import ContainerCard from '@websummit/components/src/molecules/ContainerCard';
import { useSnackbars } from '@websummit/components/src/molecules/Snackbar';
import { Spacing } from '@websummit/components/src/templates/Spacing';
import {
  CommerceGetProductQueryVariables,
  CommerceProduct,
  useCommerceGetProductQuery,
  useCommerceGetStoreQuery,
  useCommerceListCategoriesQuery,
} from '@websummit/graphql/src/@types/operations';
import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { useRequestContext } from '../app/AppContext';
import TicketTypeForm from '../organisms/TicketTypeForm';

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

const TicketTypePage = () => {
  const context = useRequestContext();
  const { error } = useSnackbars();
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

  const { data: storeData } = useCommerceGetStoreQuery({
    context,
  });

  const store = storeData?.commerceGetStore;

  const taxTypes = store?.taxTypes || [];

  const ticketCategories =
    commerceCategoriesData?.commerceListCategories?.hits || [];

  const breadcrumbsRoutes: Breadcrumb[] = [
    {
      label: 'Ticket types',
      redirectUrl: '/ticket-types',
    },
    {
      label: `${ticketType?.name as string}`,
    },
  ];

  return (
    <Container>
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

        <FlexRow>
          <ContainerCard>
            <>
              <Spacing bottom="2rem" top="1rem">
                <Header>Invite to purchase</Header>
                <SubHeader>Create an invite to purchase</SubHeader>
              </Spacing>
            </>
          </ContainerCard>
        </FlexRow>
      </FlexCol>
    </Container>
  );
};

export default TicketTypePage;
