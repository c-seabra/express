import Badge from '@websummit/components/src/atoms/Badge';
import ContainerCard from '@websummit/components/src/molecules/ContainerCard';
import Table, {
  ColumnDescriptor,
} from '@websummit/components/src/molecules/Table';
import { formatFullDateTime } from '@websummit/components/src/utils/time';
import { CommerceSale } from '@websummit/graphql/src/@types/operations';
import useGetEventTimeZone from '@websummit/graphql/src/hooks/useGetEventTimeZone';
import React from 'react';
import styled from 'styled-components';

const StyledName = styled.span`
  color: #0067e9;
`;

type SalesCyclesListProps = {
  cycles: CommerceSale[];
  onRowClick?: any;
};
const SalesCyclesList = ({ cycles, onRowClick }: SalesCyclesListProps) => {
  const eventTimeZone = useGetEventTimeZone();
  const { ianaName } = eventTimeZone || {};

  const tableShape: ColumnDescriptor<CommerceSale>[] = [
    {
      header: 'Name',
      renderCell: (cycle) => <StyledName>{cycle.name || 'N/A'}</StyledName>,
      width: '20%',
    },
    {
      header: 'Start date',
      renderCell: (cycle) =>
        formatFullDateTime(cycle.startDate, ianaName) || 'N/A',
    },
    {
      header: 'End date',
      renderCell: (cycle) =>
        formatFullDateTime(cycle.endDate, ianaName) || 'N/A',
    },
    {
      header: 'Description',
      renderCell: (cycle) => cycle.description || 'N/A',
    },
    {
      header: 'Status',
      renderCell: (cycle) => {
        const badge = {
          background: cycle.active ? '#EAF9EA' : '#FDEBEB',
          color: cycle.active ? '#3BB273' : '#E15554',
        };

        return (
          <Badge background={badge.background} color={badge.color}>
            {cycle.active ? 'Active' : 'Inactive' || 'N/A'}
          </Badge>
        );
      },
    },
  ];

  return (
    <>
      <ContainerCard noPadding>
        <Table<CommerceSale>
          items={cycles}
          tableShape={tableShape}
          onRowClick={onRowClick}
        />
      </ContainerCard>
    </>
  );
};

export default SalesCyclesList;
