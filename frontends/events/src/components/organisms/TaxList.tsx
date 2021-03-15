import ContainerCard from '@websummit/components/src/molecules/ContainerCard';
import Table, {
  ColumnDescriptor,
} from '@websummit/components/src/molecules/Table';
import { formatFullDate } from '@websummit/components/src/utils/time';
import { Event, TaxRate } from '@websummit/graphql/src/@types/operations';
import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

// const StyledHeader = styled.span`
//   color: #0c1439;
//   font-size: 24px;
//   font-weight: 500;
//   letter-spacing: 0;
//   line-height: 24px;
// `;

type TaxesListProps = {
  error: any;
  taxes: TaxRate[];
};
const TaxList = ({ error, taxes }: TaxesListProps) => {
  const history = useHistory();
  const tableShape: ColumnDescriptor<TaxRate>[] = [
    {
      header: 'Tax name',
      renderCell: (tax) => tax.name || 'N/A',
      width: '20%',
    },
    {
      header: 'Tax amount %',
      renderCell: (tax) => tax.value || 'N/A',
      width: '20%',
    },
    {
      header: 'Country of tax',
      renderCell: (tax) => tax.country?.name || 'N/A',
    },
    {
      header: 'Tax type',
      renderCell: (tax) => tax.taxType || 'N/A',
    },
  ];

  // TODO lift up error and reuse useQuery hook for error handling
  if (error) {
    return <>{error.message}</>;
  }

  // const redirectToEvent = (item: Event) => {
  //   history.push(`/${item.slug.toString()}/edit`);
  // };

  return (
    <>
      <ContainerCard noPadding>
        <Table<TaxRate>
          items={taxes}
          tableShape={tableShape}
          // onRowClick={redirectToEvent}
        />
      </ContainerCard>
    </>
  );
};

export default TaxList;
