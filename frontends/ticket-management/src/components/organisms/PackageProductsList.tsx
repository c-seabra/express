import Icon from '@websummit/components/src/atoms/Icon';
import ContainerCard from '@websummit/components/src/molecules/ContainerCard';
import Table, {
  ColumnDescriptors,
} from '@websummit/components/src/molecules/Table';
import { CommercePackagedProduct } from '@websummit/graphql/src/@types/operations';
import { Maybe } from 'graphql/jsutils/Maybe';
import React from 'react';
import styled from 'styled-components';

const StyledName = styled.span`
  color: #0067e9;
`;

const IconWrapper = styled.div`
  > .material-icons {
    font-size: 24px;
  }
`;

type PackageProductsListProps = {
  onActionClick?: any;
  onRowClick?: any;
  packages: any;
};
const PackageProductsList = ({
  packages,
  onRowClick,
  onActionClick,
}: PackageProductsListProps) => {
  const eventWrapper = (event: any, id: Maybe<string>) => {
    event.preventDefault();
    event.stopPropagation();

    onActionClick(id);
  };

  const tableShape: ColumnDescriptors<CommercePackagedProduct> = [
    {
      header: 'Ticket type',
      renderCell: (packageItem) => (
        <StyledName>{packageItem?.packagedProduct?.name || 'N/A'}</StyledName>
      ),
      width: '25%',
    },
    {
      header: 'Qty of tickets',
      renderCell: (packageItem) => packageItem.quantity || 'N/A',
      // width: '70%',
    },
    {
      header: 'packageItem Id',
      renderCell: (packageItem) => packageItem.id || 'N/A',
      // width: '70%',
    },
    {
      header: 'packagedProduct Id',
      renderCell: (packageItem) => packageItem?.packagedProduct?.id || 'N/A',
      // width: '70%',
    },
    {
      header: 'Action',
      renderCell: (packageItem) => {
        return (
          <>
            <IconWrapper onClick={(e) => eventWrapper(e, packageItem?.id)}>
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
        <Table<CommercePackagedProduct>
          items={packages}
          tableShape={tableShape}
          onRowClick={onRowClick}
        />
      </ContainerCard>
    </>
  );
};

export default PackageProductsList;
