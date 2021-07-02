import Badge from '@websummit/components/src/atoms/Badge';
import ContainerCard from '@websummit/components/src/molecules/ContainerCard';
import Table, {
  ColumnDescriptor,
} from '@websummit/components/src/molecules/Table';
import { CommerceListSaleProductsQuery } from '@websummit/graphql/src/@types/operations';
import { CommerceListQueryHitsResult } from '@websummit/graphql/src/lib/types';
import {
  formatDisplayPrice,
  TotalInCents,
} from '@websummit/tsutils/src/lib/utils/price';
import React from 'react';
import styled from 'styled-components';

const StyledName = styled.span`
  color: #0067e9;
`;

type SaleProducts = CommerceListQueryHitsResult<
  CommerceListSaleProductsQuery,
  'commerceListSaleProducts'
>;

type SaleProduct = NonNullable<SaleProducts>[0];

type ProductsListProps = {
  currencySymbol?: string | undefined;
  onRowClick?: any;
  products?: SaleProducts;
};
const ProductsList = ({
  products = [],
  onRowClick,
  currencySymbol,
}: ProductsListProps) => {
  const tableShape: ColumnDescriptor<SaleProduct>[] = [
    {
      header: 'Ticket type',
      renderCell: (saleProduct) => (
        <StyledName>{saleProduct?.product?.name || 'N/A'}</StyledName>
      ),
      width: '20%',
    },
    {
      header: 'Display name',
      renderCell: (saleProduct) => saleProduct.name || 'N/A',
    },
    {
      header: 'Description',
      renderCell: (saleProduct) => saleProduct.description || 'N/A',
    },
    {
      header: 'Price for sale cycle',
      renderCell: (saleProduct) =>
        formatDisplayPrice(
          saleProduct?.price as TotalInCents,
          currencySymbol,
        ) || 'N/A',
    },
    {
      header: 'Status',
      renderCell: (saleProduct) => {
        const badge = {
          background: saleProduct.active ? '#EAF9EA' : '#FDEBEB',
          color: saleProduct.active ? '#3BB273' : '#E15554',
        };

        return (
          <Badge background={badge.background} color={badge.color}>
            {saleProduct.active ? 'Active' : 'Inactive' || 'N/A'}
          </Badge>
        );
      },
    },
  ];

  return (
    <>
      <ContainerCard noPadding>
        <Table<SaleProduct>
          items={products || []}
          tableShape={tableShape}
          onRowClick={onRowClick}
        />
      </ContainerCard>
    </>
  );
};

export default ProductsList;
