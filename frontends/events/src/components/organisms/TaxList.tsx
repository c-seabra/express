import ContainerCard from '@websummit/components/src/molecules/ContainerCard';
import Table, {
  ColumnDescriptor,
} from '@websummit/components/src/molecules/Table';
import { CommerceTax } from '@websummit/graphql/src/@types/operations';
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

type ExtendedCommerceTax = CommerceTax & { countryName: string };

const TaxList = ({ taxes, onTaxClick }: TaxesListProps) => {
  const tableShape: ColumnDescriptor<ExtendedCommerceTax>[] = [
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
        <>{`${tax.country} - ${tax.countryName}` || 'N/A'}</>
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
        <Table<ExtendedCommerceTax>
          items={taxes}
          tableShape={tableShape}
          onRowClick={onTaxClick}
        />
      </ContainerCard>
    </>
  );
};

export default TaxList;
