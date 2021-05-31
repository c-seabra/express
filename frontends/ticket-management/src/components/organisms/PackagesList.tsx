import Badge from '@websummit/components/src/atoms/Badge';
import ContainerCard from '@websummit/components/src/molecules/ContainerCard';
import Table, {
  ColumnDescriptors,
} from '@websummit/components/src/molecules/Table';
import { formatFullDateTime } from '@websummit/components/src/utils/time';
import { CommerceDeal } from '@websummit/graphql/src/@types/operations';
import useGetEventTimeZone from '@websummit/graphql/src/hooks/useGetEventTimeZone';
import React from 'react';
import styled from 'styled-components';

const StyledName = styled.span`
  color: #0067e9;
`;

type PackagesListProps = {
  onRowClick?: any;
  packages: CommerceDeal[];
};
const PackagesList = ({ packages, onRowClick }: PackagesListProps) => {
  const eventTimeZone = useGetEventTimeZone();
  const { ianaName } = eventTimeZone || {};

  const tableShape: ColumnDescriptors<CommerceDeal> = [
    {
      header: 'Product name',
      renderCell: (deal) => <StyledName>{deal.name || 'N/A'}</StyledName>,
      width: '20%',
    },
    {
      header: 'Sale start date',
      renderCell: (deal) =>
        formatFullDateTime(deal.startDate, ianaName) || 'N/A',
    },
    {
      header: 'Sale end date',
      renderCell: (deal) => formatFullDateTime(deal.endDate, ianaName) || 'N/A',
    },
    {
      header: 'Description',
      renderCell: (deal) => deal.description || 'N/A',
    },
    {
      header: 'Public sale status',
      renderCell: (deal) => {
        const badge = {
          background: deal.active ? '#EAF9EA' : '#FDEBEB',
          color: deal.active ? '#3BB273' : '#E15554',
        };

        return (
          <Badge background={badge.background} color={badge.color}>
            {deal.active ? 'Active' : 'Paused' || 'N/A'}
          </Badge>
        );
      },
    },
  ];

  return (
    <>
      <ContainerCard noPadding>
        <Table<CommerceDeal>
          items={packages}
          tableShape={tableShape}
          onRowClick={onRowClick}
        />
      </ContainerCard>
    </>
  );
};

export default PackagesList;
