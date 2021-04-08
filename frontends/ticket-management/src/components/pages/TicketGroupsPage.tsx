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

import PageContainer from '../../lib/components/templates/PageContainer';
import NoTicketGroupsPlaceholder from '../../lib/images/no-ticket-groups-placeholder.png';
import { useAppContext } from '../app/AppContext';
import TicketGroupModal from '../ticketGroups/TicketGroupModal';

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

type TicketGroup = Pick<
  CommerceCategory,
  'active' | 'id' | 'name' | 'lastUpdatedAt' | 'createdBy' | 'description'
>;

const ticketGroupsTableShape: ColumnDescriptors<TicketGroup> = [
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

const TicketGroupsPage = () => {
  const { token } = useAppContext();
  const {
    isOpen: isTicketGroupModalOpen,
    closeModal: closeTicketGroupModal,
    openModal: openTicketGroupModal,
  } = useModalState();

  const [selectedTicketGroup, setSelectedTicketGroup] = useState<
    TicketGroup | undefined
  >();

  const { data, loading } = useCommerceListCategoriesQuery({
    context: { token },
  });

  const ticketGroups = data?.commerceListCategories?.hits || [];

  const areTicketGroupsPresent = ticketGroups.length > 0;

  return (
    <PageContainer>
      <HeaderContainer>
        <Title>Ticket groups</Title>
        <SearchBar>
          <Button
            onClick={() => {
              setSelectedTicketGroup(undefined);
              openTicketGroupModal();
            }}
          >
            Create new ticket group
          </Button>
          <TicketGroupModal
            isOpen={isTicketGroupModalOpen}
            ticketGroup={selectedTicketGroup}
            onRequestClose={closeTicketGroupModal}
          />
        </SearchBar>
      </HeaderContainer>

      {loading && (
        <Spacing top="5rem">
          <Loader />
        </Spacing>
      )}

      {!loading && !areTicketGroupsPresent && (
        <Placeholder
          alt="no ticket groups placeholder"
          src={NoTicketGroupsPlaceholder}
        />
      )}

      {!loading && areTicketGroupsPresent && (
        <Spacing top="1.5rem">
          <ContainerCard noPadding>
            <Table<TicketGroup & { id: string | null }>
              items={ticketGroups}
              tableShape={ticketGroupsTableShape}
              onRowClick={(item) => {
                setSelectedTicketGroup(item);
                openTicketGroupModal();
              }}
            />
          </ContainerCard>
        </Spacing>
      )}
    </PageContainer>
  );
};

export default TicketGroupsPage;
