import ContainerCard from '@websummit/components/src/molecules/ContainerCard';
import Table, {
  ColumnDescriptor,
} from '@websummit/components/src/molecules/Table';
import { TaxRate } from '@websummit/graphql/src/@types/operations';
import React from 'react';
import styled from 'styled-components';

const CapitalizedValue = styled.span`
  text-transform: lowercase;

  &:first-letter {
    text-transform: uppercase;
  }
`;

type TaxesListProps = {
  onTaxClick?: () => void;
  taxes: any;
};

const TaxList = ({ taxes, onTaxClick }: TaxesListProps) => {
  const tableShape: ColumnDescriptor<TaxRate>[] = [
    {
      header: 'Tax name',
      renderCell: (tax) => tax.name || 'N/A',
    },
    {
      header: 'Tax amount %',
      renderCell: (tax) => {
        return <>{`${tax.value}%` || 'N/A'}</>;
      },
      width: '14%',
    },
    {
      header: 'Country of tax',
      renderCell: (tax) => (
        <>{`${tax.country?.code} - ${tax.country?.name}` || 'N/A'}</>
      ),
      width: '20%',
    },
    {
      header: 'Tax type',
      renderCell: (tax) =>
        <CapitalizedValue>{tax.taxType}</CapitalizedValue> || 'N/A',
      width: '16%',
    },
  ];

  return (
    <>
      <ContainerCard noPadding>
        <Table<TaxRate>
          items={taxes}
          tableShape={tableShape}
          onRowClick={onTaxClick}
        />
      </ContainerCard>
    </>
  );
};

export default TaxList;
