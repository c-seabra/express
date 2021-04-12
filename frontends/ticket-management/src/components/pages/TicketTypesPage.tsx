import { Button } from '@websummit/components/src/atoms/Button';
import Loader from '@websummit/components/src/atoms/Loader';
import ContainerCard from '@websummit/components/src/molecules/ContainerCard';
import { useErrorSnackbar } from '@websummit/components/src/molecules/Snackbar';
import Table, {
  ColumnDescriptors,
} from '@websummit/components/src/molecules/Table';
import { Spacing } from '@websummit/components/src/templates/Spacing';
import {
  CommerceCategory,
  CommerceProduct,
  useCommerceListCategoriesQuery,
  useCommerceListProductsQuery,
} from '@websummit/graphql/src/@types/operations';
import React from 'react';
import styled from 'styled-components';

import PageContainer from '../../lib/components/templates/PageContainer';
import NoTicketTypesPlaceholder from '../../lib/images/no-ticket-types-placeholder.png';
import { useAppContext } from '../app/AppContext';

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 500;
  color: #0c1439;
`;

const TableActionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Placeholder = styled.img`
  max-width: 1440px;
`;

type GroupedTicketTypes = {
  [k: string]: Partial<CommerceProduct>[];
};

const ungroupedCategoryName = 'Other';

const groupTicketTypesByGroups = (
  ticketTypes: Partial<CommerceProduct>[] = [],
  ticketGroups: Pick<CommerceCategory, 'name' | 'id'>[] = [],
) => {
  let ticketTypesByGroups: GroupedTicketTypes = {};

  ticketTypes.forEach((ticketType) => {
    const ticketTypesGroupIds = ticketType?.categories || [];
    const matchedGroups = ticketTypesGroupIds
      .map((groupId) => ticketGroups.find((group) => group.id === groupId))
      .filter(Boolean);

    if (matchedGroups.length > 0) {
      matchedGroups.forEach((group) => {
        if (group?.name) {
          ticketTypesByGroups = {
            ...ticketTypesByGroups,
            [group.name]: [...ticketTypesByGroups[group.name], ticketType],
          };
        }
      });

      ticketTypesByGroups = {
        ...ticketTypesByGroups,
        [ungroupedCategoryName]: [
          ...ticketTypesByGroups[ungroupedCategoryName],
          ticketType,
        ],
      };
    }
  });

  return ticketTypesByGroups;
};

type CommerceProductTableItem = Pick<CommerceProduct, 'name' | 'id'>;

const tableShape: ColumnDescriptors<CommerceProductTableItem> = [
  {
    header: 'Name',
    renderCell: (item) => item.name,
  },
];

const TicketTypesPage = () => {
  const { token } = useAppContext();
  const error = useErrorSnackbar();
  const { data, loading } = useCommerceListProductsQuery({
    context: { token },
    onError: (e) => error(e.message),
  });

  const { data: commerceCategoriesData } = useCommerceListCategoriesQuery({
    context: { token },
  });

  const commerceProducts = data?.commerceListProducts?.hits || [];
  const areCommerceProductsPresent =
    commerceProducts?.length && commerceProducts?.length > 0;

  const commerceCategories =
    commerceCategoriesData?.commerceListCategories?.hits || [];

  // TODO - check if function groups tickets properly
  const grouped = groupTicketTypesByGroups(
    commerceProducts,
    commerceCategories,
  );

  return (
    <PageContainer>
      <HeaderContainer>
        <Title>Ticket types</Title>
        <TableActionsContainer>
          <Button>Create new ticket type</Button>
        </TableActionsContainer>
      </HeaderContainer>

      {loading && (
        <Spacing top="5rem">
          <Loader />
        </Spacing>
      )}

      {areCommerceProductsPresent ? (
        <Spacing top="1.5rem">
          <ContainerCard noPadding>
            <Table<CommerceProductTableItem>
              items={commerceProducts}
              tableShape={tableShape}
            />
          </ContainerCard>
        </Spacing>
      ) : (
        <Placeholder
          alt="no ticket types placeholder"
          src={NoTicketTypesPlaceholder}
        />
      )}
    </PageContainer>
  );
};

export default TicketTypesPage;
