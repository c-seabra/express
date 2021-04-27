import Icon from '@websummit/components/src/atoms/Icon';
import ContainerCard from '@websummit/components/src/molecules/ContainerCard';
import { useModalState } from '@websummit/components/src/molecules/Modal';
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
import PackageItemRemovalModal from '../modals/PackageItemRemovalModal';

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
  dealId: string;
  onRowClick?: any;
  products: any;
};
const DealItemsList = ({
  products,
  onRowClick,
  currencySymbol,
  dealId,
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
        const {
          isOpen: isPackageItemModalOpen,
          closeModal: packageItemModalClose,
          openModal: packageItemOpenModal,
        } = useModalState();
        const openDeleteItemModal = (event: any, dealItemId: string | null) => {
          event.preventDefault();
          event.stopPropagation();

          packageItemOpenModal();
        };

        return (
          <>
            <PackageItemRemovalModal
              closeModal={packageItemModalClose}
              dealId={dealId}
              isOpen={isPackageItemModalOpen}
            />

            <IconWrapper
              onClick={(e) => openDeleteItemModal(e, saleProduct.id)}
            >
              <Icon>edit</Icon>
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
