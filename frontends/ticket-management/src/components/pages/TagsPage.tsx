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
  CommerceTag,
  useCommerceListTagsQuery,
} from '@websummit/graphql/src/@types/operations';
import React, { useState } from 'react';
import styled from 'styled-components';

import PageContainer from '../../lib/components/templates/PageContainer';
import { useRequestContext } from '../app/AppContext';
import TagModal from '../modals/TagModal';

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 500;
  color: #0c1439;
`;

const SubTitle = styled(Title)`
  margin-top: 12px;
  font-size: 16px;
  font-weight: 400;
`;

const SearchBar = styled.div`
  display: flex;
  justify-content: space-between;
`;

const NoTagsHeader = styled.div`
  text-align: center;
  margin: 2rem auto;
  width: 100%;
  height: 400px;
`;

type CommerceTagTableItem = Pick<
  CommerceTag,
  'id' | 'name' | 'code' | 'description'
>;

const tagsTableShape: ColumnDescriptors<CommerceTagTableItem> = [
  {
    header: 'Name',
    renderCell: (item) => item.name,
  },
  {
    header: 'Description',
    renderCell: (item) => item.description,
  },
  {
    header: 'Tag code',
    renderCell: (item) => item.code,
  },
];

const TagsPage = () => {
  const context = useRequestContext();
  const error = useErrorSnackbar();
  // TODO - add modal for editing and creation
  const {
    isOpen: isTagModalOpen,
    closeModal: closeTagModal,
    openModal: openTagModal,
  } = useModalState();

  const [selectedTag, setSelectedTag] = useState<
    CommerceTagTableItem | undefined
  >();

  const { data, loading } = useCommerceListTagsQuery({
    context,
    onError: (e) => error(e.message),
  });

  const tags = data?.commerceListTags?.hits || [];

  const areTagsPresent = tags.length > 0;

  return (
    <PageContainer>
      <HeaderContainer>
        <div>
          <Title>Benefits & permissions</Title>
          <SubTitle>
            Create tags on ticket - benefits and permissions associated to the
            ticket
          </SubTitle>
        </div>

        <SearchBar>
          <Button
            onClick={() => {
              setSelectedTag(undefined);
              openTagModal();
            }}
          >
            Create new tag
          </Button>
          <TagModal
            isOpen={isTagModalOpen}
            tag={selectedTag}
            onRequestClose={closeTagModal}
          />
        </SearchBar>
      </HeaderContainer>

      {loading && (
        <Spacing top="5rem">
          <Loader />
        </Spacing>
      )}

      {!loading && !areTagsPresent && (
        <NoTagsHeader>No tags found</NoTagsHeader>
      )}

      {!loading && areTagsPresent && (
        <Spacing top="1.5rem">
          <ContainerCard noPadding>
            <Table<CommerceTagTableItem & { id: string | null }>
              items={tags}
              tableShape={tagsTableShape}
              onRowClick={(item) => {
                setSelectedTag(item);
                openTagModal();
              }}
            />
          </ContainerCard>
        </Spacing>
      )}
    </PageContainer>
  );
};

export default TagsPage;
