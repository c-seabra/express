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
};
const SalesCyclesList = ({ cycles }: SalesCyclesListProps) => {
  const tableShape: ColumnDescriptor<CommerceSale>[] = [
    {
      header: 'Name',
      renderCell: (cycle) => <StyledName>{cycle.name || 'N/A'}</StyledName>,
      width: '30%',
    },
    {
      header: 'Start date',
      renderCell: (cycle) => formatFullDate(cycle.startDate) || 'N/A',
      width: '30%',
    },
    {
      header: 'End date',
      renderCell: (cycle) => formatFullDate(cycle.endDate) || 'N/A',
    },
  ];

  return (
    <>
      <ContainerCard noPadding>
        <Table<CommerceSale> items={cycles} tableShape={tableShape} />
      </ContainerCard>
    </>
  );
};

export default SalesCyclesList;
