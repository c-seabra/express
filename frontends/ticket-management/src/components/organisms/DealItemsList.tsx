import Badge from '@websummit/components/src/atoms/Badge';
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

type DealItemsListProps = {
  currencySymbol?: string | undefined;
  onRowClick?: any;
  products: any[];
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
      renderCell: (saleProduct) => saleProduct.type || 'N/A',
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
