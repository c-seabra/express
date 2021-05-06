import Icon from '@websummit/components/src/atoms/Icon';
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

const IconWrapper = styled.div`
  > .material-icons {
    font-size: 24px;
  }
`;

type DealItemsListProps = {
  currencySymbol: string;
  onActionClick?: any;
  onRowClick?: any;
  products: any;
};
const DealItemsList = ({
  products,
  onRowClick,
  currencySymbol,
  onActionClick,
}: DealItemsListProps) => {
  const formatPricingApplied = (source: string): string =>
    switchCase({
      [CommerceDealItemType.PercentageDiscount]: 'Percentage discount',
      [CommerceDealItemType.AbsoluteDiscount]: 'Absolute discount',
      [CommerceDealItemType.AbsolutePrice]: 'Absolute price',
    })('N/A')(source);

  const formatAmount = (amount: number, source: string): string =>
    switchCase({
      [CommerceDealItemType.PercentageDiscount]: `${amount}%`,
      [CommerceDealItemType.AbsoluteDiscount]: `${amount}${currencySymbol}`,
      [CommerceDealItemType.AbsolutePrice]: `${amount}${currencySymbol}`,
    })('N/A')(source);

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
      renderCell: (saleProduct) =>
        formatAmount(saleProduct.amount, saleProduct.type),
    },
    {
      header: 'Pricing applied',
      renderCell: (saleProduct) => formatPricingApplied(saleProduct.type),
    },
    {
      header: 'Action',
      renderCell: (saleProduct) => {
        return (
          <>
            <IconWrapper onClick={(e) => onActionClick(e, saleProduct.id)}>
              <Icon>delete</Icon>
            </IconWrapper>
          </>
        );
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
