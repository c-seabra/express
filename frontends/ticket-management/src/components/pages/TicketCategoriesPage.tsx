import { Button } from '@websummit/components/src/atoms/Button';
import Loader from '@websummit/components/src/atoms/Loader';
import ContainerCard from '@websummit/components/src/molecules/ContainerCard';
import { useModalState } from '@websummit/components/src/molecules/Modal';
import Table, {
  ColumnDescriptors,
} from '@websummit/components/src/molecules/Table';
import { Spacing } from '@websummit/components/src/templates/Spacing';
import { formatDefaultDateTime } from '@websummit/components/src/utils/time';
import {
  CommerceCategory,
  useCommerceListCategoriesQuery,
} from '@websummit/graphql/src/@types/operations';
import React, { useState } from 'react';
import styled from 'styled-components';

import { useErrorSnackbar } from '../../../../../packages/components/src/molecules/Snackbar';
import PageContainer from '../../lib/components/templates/PageContainer';
import NoTicketCategoriesPlaceholder from '../../lib/images/no-ticket-categories-placeholder.png';
import { useAppContext } from '../app/AppContext';
import TicketCategoryModal from '../ticketCategories/TicketCategoryModal';

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 500;
  color: #0c1439;
`;

const SearchBar = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Placeholder = styled.img`
  max-width: 1440px;
`;

type TicketCategory = Pick<
  CommerceCategory,
  'active' | 'id' | 'name' | 'lastUpdatedAt' | 'createdBy' | 'description'
>;

const ticketCategoriesTableShape: ColumnDescriptors<TicketCategory> = [
  {
    header: 'Name',
    renderCell: (item) => item.name,
  },
  {
    header: 'Created by',
    renderCell: (item) => item?.createdBy?.name,
    width: '30%',
  },
  {
    header: 'Last updated on',
    renderCell: (item) => formatDefaultDateTime(item.lastUpdatedAt || ''),
    width: '30%',
  },
];

const TicketCategoriesPage = () => {
  const { conferenceSlug, token } = useAppContext();
  const context = {
    slug: conferenceSlug,
    token,
  };
  const {
    isOpen: isTicketCategoryModalOpen,
    closeModal: closeTicketCategoryModal,
    openModal: openTicketCategoryModal,
  } = useModalState();
  const error = useErrorSnackbar();

  const [selectedTicketCategory, setSelectedTicketCategory] = useState<
    TicketCategory | undefined
  >();

  const { data, loading } = useCommerceListCategoriesQuery({
    context,
    onError: (e) => error(e.message),
  });

  const ticketCategories = data?.commerceListCategories?.hits || [];

  const areTicketCategoriesPresent = ticketCategories.length > 0;

  return (
    <PageContainer>
      <HeaderContainer>
        <Title>Ticket categories</Title>
        <SearchBar>
          <Button
            onClick={() => {
              setSelectedTicketCategory(undefined);
              openTicketCategoryModal();
            }}
          >
            Create new ticket category
          </Button>
          <TicketCategoryModal
            isOpen={isTicketCategoryModalOpen}
            ticketCategory={selectedTicketCategory}
            onRequestClose={closeTicketCategoryModal}
          />
        </SearchBar>
      </HeaderContainer>

      {loading && (
        <Spacing top="5rem">
          <Loader />
        </Spacing>
      )}

      {!loading && !areTicketCategoriesPresent && (
        <Placeholder
          alt="no ticket categories placeholder"
          src={NoTicketCategoriesPlaceholder}
        />
      )}

      {!loading && areTicketCategoriesPresent && (
        <Spacing top="1.5rem">
          <ContainerCard noPadding>
            <Table<TicketCategory & { id: string | null }>
              items={ticketCategories}
              tableShape={ticketCategoriesTableShape}
              onRowClick={(item) => {
                setSelectedTicketCategory(item);
                openTicketCategoryModal();
              }}
            />
          </ContainerCard>
        </Spacing>
      )}
    </PageContainer>
  );
};

export default TicketCategoriesPage;
