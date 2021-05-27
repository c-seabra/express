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
  CommerceProductType,
  useCommerceGetStoreQuery,
  useCommerceListCategoriesQuery,
  useCommerceListProductsQuery,
} from '@websummit/graphql/src/@types/operations';
import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { switchCase } from '../../../../ticket-support/src/lib/utils/logic';
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

const groupTicketTypesByCategories = (
  ticketTypes: Partial<CommerceProduct>[] = [],
  ticketCategories: Pick<CommerceCategory, 'name' | 'id'>[] = [],
) => {
  let ticketTypesByCategories: GroupedTicketTypes = {};

  ticketCategories.forEach((category) => {
    const ticketTypesByCategory = ticketTypes.filter((type) =>
      type?.categories?.some((typeCategory) => typeCategory.id === category.id),
    );

    if (ticketTypesByCategory.length > 0) {
      ticketTypesByCategories = {
        ...ticketTypesByCategories,
        [category.name]: ticketTypesByCategory,
      };
    }
  });

  const ticketsWithoutCategory = ticketTypes.filter(
    (type) => !type.categories || type?.categories?.length === 0,
  );

  if (ticketsWithoutCategory.length > 0) {
    return {
      ...ticketTypesByCategories,
      [ungroupedCategoryName]: ticketsWithoutCategory,
    };
  }

  return ticketTypesByCategories;
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
    header: 'Type',
    renderCell: (item) => {
      const type = item?.type;
      return switchCase({
        [CommerceProductType.Simple]: '-',
        [CommerceProductType.Package]: 'Package',
      })('N/A')(type as string);
    },
  },
  {
    header: 'On sale',
    renderCell: (item) => <TicketTypeState state={item.active} />,
  },
];

const TicketTypesPage = () => {
  const { conferenceSlug, token } = useAppContext();
  const history = useHistory();

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

  const ticketCategories =
    commerceCategoriesData?.commerceListCategories?.hits || [];

  const ticketTypesByCategories = groupTicketTypesByCategories(
    ticketTypes as Partial<CommerceProduct>[],
    ticketCategories,
  );

  const { data: storeData } = useCommerceGetStoreQuery({
    context,
  });

  const store = storeData?.commerceGetStore;

  const taxTypes = store?.taxTypes || [];

  const openTicketTypePage = (ticketType: Partial<CommerceProduct>) => {
    history.push(`/ticket-type/${ticketType?.id || ''}`);
  };

  return (
    <PageContainer>
      <HeaderContainer>
        <Title>Ticket types</Title>
        <TableActionsContainer>
          <Button onClick={openTicketTypeModal}>Create new ticket type</Button>
          <TicketTypeModal
            country={store?.country}
            currencySymbol={store?.currencySymbol || ''}
            isOpen={isTicketTypeModalOpen}
            taxTypes={taxTypes}
            ticketCategories={ticketCategories}
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
        Object.entries(ticketTypesByCategories).map(([key, value]) => (
          <Spacing key={key} top="1.5rem">
            <ContainerCard noPadding title={key}>
              <Table<CommerceProductTableItem>
                items={value as CommerceProductTableItem[]}
                tableShape={tableShape}
                onRowClick={openTicketTypePage}
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
