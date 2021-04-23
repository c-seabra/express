import ContainerCard from '@websummit/components/src/molecules/ContainerCard';
import Table, {
  ColumnDescriptor,
} from '@websummit/components/src/molecules/Table';
import {
  CommerceDealItemType,
  CommerceSale,
} from '@websummit/graphql/src/@types/operations';
import React from 'react';
import styled from 'styled-components';
import { switchCase } from '../../../../ticket-support/src/lib/utils/logic';

const StyledName = styled.span`
  color: #0067e9;
`;

type DealItemsListProps = {
  currencySymbol?: string | undefined;
  onRowClick?: any;
  products: any;
};
const DealItemsList = ({
  products,
  onRowClick,
  currencySymbol,
}: DealItemsListProps) => {
  const tableShape: ColumnDescriptor<any>[] = [
    {
      header: 'Ticket type',
      renderCell: (saleProduct) => (
        <StyledName>{saleProduct?.product?.name || 'N/A'}</StyledName>
      ),
      width: '20%',
    },
    {
      header: 'Min',
      renderCell: (saleProduct) => saleProduct.min || 'N/A',
    },
    {
      header: 'Max',
      renderCell: (saleProduct) => saleProduct.max || 'N/A',
    },
    {
      header: 'Step',
      renderCell: (saleProduct) => saleProduct.step || 'N/A',
    },
    {
      header: 'Amount',
      renderCell: (saleProduct) => saleProduct.amount || 'N/A',
    },
    {
      header: 'Pricing applied',
      renderCell: (saleProduct) => {
        const formatSourceOfSale = (source: string): string =>
          switchCase({
            [CommerceDealItemType.PercentageDiscount]: 'Percentage discount',
            [CommerceDealItemType.AbsoluteDiscount]: 'Absolute discount',
            [CommerceDealItemType.AbsolutePrice]: 'Absolute price',
          })('N/A')(source) as string;

        return formatSourceOfSale(saleProduct.type);
      },
    },
  ];

  return (
    <>
      <ContainerCard noPadding>
        <Table<CommerceSale>
          items={products}
          tableShape={tableShape}
          onRowClick={onRowClick}
        />
      </ContainerCard>
    </>
  );
};

export default DealItemsList;
