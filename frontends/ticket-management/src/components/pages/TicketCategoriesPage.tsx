import Badge from '@websummit/components/src/atoms/Badge';
import { Button } from '@websummit/components/src/atoms/Button';
import Loader from '@websummit/components/src/atoms/Loader';
import BlockMessage from '@websummit/components/src/molecules/BlockMessage';
import ContainerCard from '@websummit/components/src/molecules/ContainerCard';
import { useModalState } from '@websummit/components/src/molecules/Modal';
import { useErrorSnackbar } from '@websummit/components/src/molecules/Snackbar';
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

import PageContainer from '../../lib/components/templates/PageContainer';
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
  {
    header: 'Status',
    renderCell: (item) => {
      const badge = {
        background: item.active ? '#EAF9EA' : '#FDEBEB',
        color: item.active ? '#3BB273' : '#E15554',
      };

      return (
        <Badge background={badge.background} color={badge.color}>
          {item.active ? 'Active' : 'Inactive' || 'N/A'}
        </Badge>
      );
    },
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

  const shouldRenderCategories = !loading && areTicketCategoriesPresent;
  const shouldNotRenderCategories = !loading && !areTicketCategoriesPresent;

  return (
    <PageContainer>
      <HeaderContainer>
        <Spacing bottom="1rem">
          <Title>Ticket categories</Title>
        </Spacing>

        <SearchBar>
          {shouldRenderCategories && (
            <Button
              onClick={() => {
                setSelectedTicketCategory(undefined);
                openTicketCategoryModal();
              }}
            >
              Create new ticket category
            </Button>
          )}
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

      {shouldNotRenderCategories && (
        <ContainerCard>
          <Spacing bottom="36px" left="24px" right="24px" top="36px">
            <BlockMessage
              buttonText="Create now"
              header="Create new ticket category"
              message="Please create a new ticket category to see results"
              onClickAction={() => {
                setSelectedTicketCategory(undefined);
                openTicketCategoryModal();
              }}
            />
          </Spacing>
        </ContainerCard>
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
