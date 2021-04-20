import { Button } from '@websummit/components/src/atoms/Button';
import Loader from '@websummit/components/src/atoms/Loader';
import ContainerCard from '@websummit/components/src/molecules/ContainerCard';
import { useModalState } from '@websummit/components/src/molecules/Modal';
import { useErrorSnackbar } from '@websummit/components/src/molecules/Snackbar';
import Table, {
  ColumnDescriptors,
} from '@websummit/components/src/molecules/Table';
import { Spacing } from '@websummit/components/src/templates/Spacing';
import {
  CommerceCategory,
  CommerceProduct,
  useCommerceGetStoreQuery,
  useCommerceListCategoriesQuery,
  useCommerceListProductsQuery,
} from '@websummit/graphql/src/@types/operations';
import React, { useState } from 'react';
import styled from 'styled-components';

import PageContainer from '../../lib/components/templates/PageContainer';
import NoTicketTypesPlaceholder from '../../lib/images/no-ticket-types-placeholder.png';
import { useAppContext } from '../app/AppContext';
import TicketTypeModal from '../ticketTypes/TicketTypeModal';

export const Badge = styled.span`
  font-size: 14px;
  font-weight: 300;
  line-height: 24px;
  padding: 8px 16px;
  color: #fff;
  background-color: #000;
  border-radius: 4px;
  min-width: 75px;
  text-align: center;
`;

const ActiveState = styled(Badge)`
  background-color: #eaf9ea;
  color: #44c242;
`;
const VoidState = styled(Badge)`
  background-color: #f14d4c;
  color: #d8d8d8;
`;

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

const TicketTypeState = ({ state }: { state: boolean }) => {
  return state ? (
    <ActiveState>Active</ActiveState>
  ) : (
    <VoidState>Paused</VoidState>
  );
};

type GroupedTicketTypes = {
  [k: string]: Partial<CommerceProduct>[];
};

const ungroupedCategoryName = 'Other';

const groupTicketTypesByGroups = (
  ticketTypes: Partial<CommerceProduct>[] = [],
  ticketGroups: Pick<CommerceCategory, 'name' | 'id'>[] = [],
) => {
  let ticketTypesByGroups: GroupedTicketTypes = {};

  ticketGroups.forEach((category) => {
    const ticketTypesByGroup = ticketTypes.filter((type) =>
      type?.categories?.some((typeCategory) => typeCategory.id === category.id),
    );

    if (ticketTypesByGroup.length > 0) {
      ticketTypesByGroups = {
        ...ticketTypesByGroups,
        [category.name]: ticketTypesByGroup,
      };
    }
  });

  const ticketsWithoutGroup = ticketTypes.filter(
    (type) => !type.categories || type?.categories?.length === 0,
  );

  if (ticketsWithoutGroup.length > 0) {
    return {
      ...ticketTypesByGroups,
      [ungroupedCategoryName]: ticketsWithoutGroup,
    };
  }

  return ticketTypesByGroups;
};

type CommerceProductTableItem = Partial<CommerceProduct> & {
  active: boolean;
  id: string;
  name?: string;
};

const tableShape: ColumnDescriptors<CommerceProductTableItem> = [
  {
    header: 'Name',
    renderCell: (item) => item.name,
  },
  {
    header: 'On sale',
    renderCell: (item) => <TicketTypeState state={item.active} />,
  },
];

const TicketTypesPage = () => {
  const { conferenceSlug, token } = useAppContext();
  const context = {
    slug: conferenceSlug,
    token,
  };
  const error = useErrorSnackbar();
  const {
    isOpen: isTicketTypeModalOpen,
    closeModal: closeTicketTypeModal,
    openModal: openTicketTypeModal,
  } = useModalState();

  const [selectedTicketType, setSelectedTicketType] = useState<
    CommerceProductTableItem | undefined
  >();

  const { data, loading } = useCommerceListProductsQuery({
    context,
    onError: (e) => error(e.message),
  });

  const { data: commerceCategoriesData } = useCommerceListCategoriesQuery({
    context,
    onError: (e) => error(e.message),
  });

  const ticketTypes = data?.commerceListProducts?.hits || [];
  const areCommerceProductsPresent =
    ticketTypes?.length && ticketTypes?.length > 0;

  const ticketGroups =
    commerceCategoriesData?.commerceListCategories?.hits || [];

  const ticketTypesByGroups = groupTicketTypesByGroups(
    ticketTypes as Partial<CommerceProduct>[],
    ticketGroups,
  );

  const { data: storeData } = useCommerceGetStoreQuery({
    context,
  });

  const store = storeData?.commerceGetStore;

  const taxTypes = store?.taxTypes || [];

  return (
    <PageContainer>
      <HeaderContainer>
        <Title>Ticket types</Title>
        <TableActionsContainer>
          <Button
            onClick={() => {
              setSelectedTicketType(undefined);
              openTicketTypeModal();
            }}
          >
            Create new ticket type
          </Button>
          <TicketTypeModal
            country={store?.country}
            currencySymbol={store?.currencySymbol || ''}
            isOpen={isTicketTypeModalOpen}
            taxTypes={taxTypes}
            ticketGroups={ticketGroups}
            ticketType={selectedTicketType}
            onRequestClose={closeTicketTypeModal}
          />
        </TableActionsContainer>
      </HeaderContainer>

      {loading && (
        <Spacing top="5rem">
          <Loader />
        </Spacing>
      )}

      {areCommerceProductsPresent ? (
        Object.entries(ticketTypesByGroups).map(([key, value]) => (
          <Spacing key={key} top="1.5rem">
            <ContainerCard noPadding title={key}>
              <Table<CommerceProductTableItem>
                items={value as CommerceProductTableItem[]}
                tableShape={tableShape}
                onRowClick={(item) => {
                  setSelectedTicketType(item);
                  openTicketTypeModal();
                }}
              />
            </ContainerCard>
          </Spacing>
        ))
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
