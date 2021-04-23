import ContainerCard from '@websummit/components/src/molecules/ContainerCard';
import Table, {
  ColumnDescriptors,
} from '@websummit/components/src/molecules/Table';
import {
  CommerceDealItem,
  CommerceDealItemType,
} from '@websummit/graphql/src/@types/operations';
import React from 'react';
import styled from 'styled-components';

import { switchCase } from '../../../../ticket-support/src/lib/utils/logic';

const StyledName = styled.span`
  color: #0067e9;
`;

type DealItemsListProps = {
  onRowClick?: any;
  products: any;
};
const DealItemsList = ({ products, onRowClick }: DealItemsListProps) => {
  const tableShape: ColumnDescriptors<CommerceDealItem> = [
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
          })('N/A')(source);

        return formatSourceOfSale(saleProduct.type);
      },
    },
  ];

  return (
    <>
      <ContainerCard noPadding>
        <Table<CommerceDealItem>
          items={products}
          tableShape={tableShape}
          onRowClick={onRowClick}
        />
      </ContainerCard>
    </>
  );
};

export default DealItemsList;
