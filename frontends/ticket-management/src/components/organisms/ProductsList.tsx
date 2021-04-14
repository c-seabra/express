import ContainerCard from '@websummit/components/src/molecules/ContainerCard';
import Table, {
  ColumnDescriptor,
} from '@websummit/components/src/molecules/Table';
import { CommerceSale } from '@websummit/graphql/src/@types/operations';
import React from 'react';
import styled from 'styled-components';

const StyledName = styled.span`
  color: #0067e9;
`;

type ProductsListProps = {
  onRowClick?: any;
  products: any[];
};
const ProductsList = ({ products, onRowClick }: ProductsListProps) => {
  const tableShape: ColumnDescriptor<any>[] = [
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
      renderCell: (saleProduct) => saleProduct.price || 'N/A',
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

export default ProductsList;
