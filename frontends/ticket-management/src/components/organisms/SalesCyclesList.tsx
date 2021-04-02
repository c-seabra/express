import ContainerCard from '@websummit/components/src/molecules/ContainerCard';
import Table, {
  ColumnDescriptor,
} from '@websummit/components/src/molecules/Table';
import { formatFullDate } from '@websummit/components/src/utils/time';
import { CommerceSale } from '@websummit/graphql/src/@types/operations';
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
  const tableShape: ColumnDescriptor<CommerceSale>[] = [
    {
      header: 'Name',
      renderCell: (cycle) => <StyledName>{cycle.name || 'N/A'}</StyledName>,
      width: '25%',
    },
    {
      header: 'Start date',
      renderCell: (cycle) => formatFullDate(cycle.startDate) || 'N/A',
    },
    {
      header: 'End date',
      renderCell: (cycle) => formatFullDate(cycle.endDate) || 'N/A',
    },
    {
      header: 'Description',
      renderCell: (cycle) => cycle.description || 'N/A',
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
