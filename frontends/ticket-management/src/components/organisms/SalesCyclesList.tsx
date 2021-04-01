import ContainerCard from '@websummit/components/src/molecules/ContainerCard';
import Table, {
  ColumnDescriptor,
} from '@websummit/components/src/molecules/Table';
import { formatFullDate } from '@websummit/components/src/utils/time';
// import { SalesCycles } from '@websummit/graphql/src/@types/operations';
import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const StyledName = styled.span`
  color: #0067e9;
`;

type SalesCyclesListProps = {
  cycles: any;
  error: any;
};
const SalesCyclesList = ({ error, cycles }: SalesCyclesListProps) => {
  const history = useHistory();
  const tableShape: ColumnDescriptor<any>[] = [
  // const tableShape: ColumnDescriptor<SalesCycles>[] = [
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

  // TODO lift up error and reuse useQuery hook for error handling
  if (error) {
    return <>{error.message}</>;
  }

  // const redirectToSalesCycles = (item: any) => {
  //   history.push(`/${item.slug.toString()}/settings`);
  // };
  //
  return (
    <>
      <ContainerCard noPadding>
        <Table<any>
          items={cycles}
          tableShape={tableShape}
          // onRowClick={redirectToSalesCycles}
        />
      </ContainerCard>
    </>
  );
};

export default SalesCyclesList;
