import ContainerCard from '@websummit/components/src/molecules/ContainerCard';
import SelectableTable from '@websummit/components/src/molecules/SelectableTable';
import { ColumnDescriptor } from '@websummit/components/src/molecules/Table';
import { TaxRate } from '@websummit/graphql/src/@types/operations';
import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const CapitalizedValue = styled.span`
  text-transform: lowercase;

  &:first-letter {
    text-transform: uppercase;
  }
`;

type TaxesListProps = {
  error: any;
  taxes: any;
  // taxes: TaxRate[];
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
      renderCell: (tax) => {
        return <>{`${tax.value}%` || 'N/A'}</>;
      },
      width: '20%',
    },
    {
      header: 'Country of tax',
      renderCell: (tax) => tax.country?.name || 'N/A',
    },
    {
      header: 'Tax type',
      renderCell: (tax) =>
        <CapitalizedValue>{tax.taxType}</CapitalizedValue> || 'N/A',
    },
  ];

  // TODO lift up error and reuse useQuery hook for error handling
  if (error) {
    return <>{error.message}</>;
  }

  const onSelect = (item: any) => {
    console.log('item', item);
    // TODO apply onSelect
  };

  const onSelectAll = () => {
    // TODO apply onSelectAll
  };

  return (
    <>
      <ContainerCard noPadding>
        <SelectableTable<TaxRate>
          items={taxes}
          tableShape={tableShape}
          onSelect={onSelect}
          onSelectAll={onSelectAll}
        />
      </ContainerCard>
    </>
  );
};

export default TaxList;
