import Badge from '@websummit/components/src/atoms/Badge';
import ContainerCard from '@websummit/components/src/molecules/ContainerCard';
import Table, {
  ColumnDescriptor,
} from '@websummit/components/src/molecules/Table';
import { formatFullDateTime } from '@websummit/components/src/utils/time';
import { CommerceSale } from '@websummit/graphql/src/@types/operations';
import React from 'react';
import styled from 'styled-components';

const StyledName = styled.span`
  color: #0067e9;
`;

type PackagesListProps = {
  onRowClick?: any;
  packages: CommerceSale[];
};
const PackagesList = ({ packages, onRowClick }: PackagesListProps) => {
  const tableShape: ColumnDescriptor<any>[] = [
    {
      header: 'Name',
      renderCell: (deal) => <StyledName>{deal.name || 'N/A'}</StyledName>,
      width: '20%',
    },
    {
      header: 'Start date',
      renderCell: (deal) => formatFullDateTime(deal.startDate) || 'N/A',
    },
    {
      header: 'End date',
      renderCell: (deal) => formatFullDateTime(deal.endDate) || 'N/A',
    },
    {
      header: 'Description',
      renderCell: (deal) => deal.description || 'N/A',
    },
    {
      header: 'Status',
      renderCell: (deal) => {
        const badge = {
          background: deal.active ? '#EAF9EA' : '#FDEBEB',
          color: deal.active ? '#3BB273' : '#E15554',
        };

        return (
          <Badge background={badge.background} color={badge.color}>
            {deal.active ? 'Active' : 'Inactive' || 'N/A'}
          </Badge>
        );
      },
    },
  ];

  return (
    <>
      <ContainerCard noPadding>
        <Table<CommerceSale>
          items={packages}
          tableShape={tableShape}
          onRowClick={onRowClick}
        />
      </ContainerCard>
    </>
  );
};

export default PackagesList;
