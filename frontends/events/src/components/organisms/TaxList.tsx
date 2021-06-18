import ContainerCard from '@websummit/components/src/molecules/ContainerCard';
import Table, {
  ColumnDescriptor,
} from '@websummit/components/src/molecules/Table';
import {CommerceTax, TaxRate} from '@websummit/graphql/src/@types/operations';
import React from 'react';
import styled from 'styled-components';

const CapitalizedValue = styled.span`
  text-transform: lowercase;

  &:first-letter {
    text-transform: uppercase;
  }
`;

type TaxesListProps = {
  onTaxClick?: (event: any) => void;
  taxes: any;
};

const TaxList = ({ taxes, onTaxClick }: TaxesListProps) => {
  console.log('taxes:tab' ,taxes)
  const tableShape: ColumnDescriptor<CommerceTax>[] = [
    {
      header: 'Tax name',
      renderCell: (tax) => tax.name || 'N/A',
    },
    {
      header: 'Tax amount %',
      renderCell: (tax) => {
        return <>{`${tax.rateAmount}%` || 'N/A'}</>;
      },
      width: '14%',
    },
    {
      header: 'Country of tax',
      renderCell: (tax) => (
        <>{`${tax.country}` || 'N/A'}</>
        // <>{`${tax.country} - ${tax.country?.name}` || 'N/A'}</>
      ),
      width: '20%',
    },
    {
      header: 'Tax type',
      renderCell: (tax) =>
        <CapitalizedValue>{tax.taxType.name}</CapitalizedValue> || 'N/A',
      width: '16%',
    },
  ];

  return (
    <>
      <ContainerCard noPadding>
        <Table<CommerceTax>
          items={taxes}
          tableShape={tableShape}
          onRowClick={onTaxClick}
        />
      </ContainerCard>
    </>
  );
};

export default TaxList;
