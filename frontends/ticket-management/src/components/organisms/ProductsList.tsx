import ContainerCard from '@websummit/components/src/molecules/ContainerCard';
import SelectableTable from '@websummit/components/src/molecules/SelectableTable';
import {
  useErrorSnackbar,
  useSuccessSnackbar,
} from '@websummit/components/src/molecules/Snackbar';
import { ColumnDescriptor } from '@websummit/components/src/molecules/Table';
import { formatFullDateTime } from '@websummit/components/src/utils/time';
import {
  CommerceSale,
  useCommerceUpdateSaleMutation,
} from '@websummit/graphql/src/@types/operations';
// import COMMERCE_SALES_LIST from '@websummit/graphql/src/operations/queries/ProductsList';
import React from 'react';
import styled from 'styled-components';

import { useAppContext } from '../app/AppContext';

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
      header: 'Product',
      renderCell: (saleProduct) => <StyledName>{saleProduct?.product?.name || 'N/A'}</StyledName>,
      width: '20%',
    },
    {
      header: 'Sale name of ticket',
      renderCell: (saleProduct) => saleProduct.name || 'N/A',
    },
    {
      header: 'Description',
      renderCell: (saleProduct) => saleProduct.description || 'N/A',
    },
    {
      header: 'Price for sale saleProduct',
      renderCell: (saleProduct) => saleProduct.price || 'N/A',
    },
  ];

  const { token } = useAppContext();
  const snackbar = useSuccessSnackbar();
  const errorSnackbar = useErrorSnackbar();
  // TODO change to product
  const [updateProduct] = useCommerceUpdateSaleMutation({
    context: { token },
    onCompleted: () => {
      snackbar('Product updated');
    },
    onError: (e) => errorSnackbar(e.message),
    // TODO change to product list
    // refetchQueries: [{ context: { token }, query: COMMERCE_SALES_LIST }],
  });

  return (
    <>
      <ContainerCard noPadding>
        <SelectableTable<CommerceSale>
          disableToggleAll
          lastColumn
          header="Active"
          items={products?.map((product) => ({
            ...product,
            selected: product.active,
          }))}
          tableShape={tableShape}
          onRowClick={onRowClick}
          onSelect={async (selectedItem, selected) => {
            if (selectedItem?.id) {
              await updateProduct({
                variables: {
                  commerceSale: {
                    active: selected,
                  },
                  id: selectedItem.id,
                },
              });
            }
          }}
        />
      </ContainerCard>
    </>
  );
};

export default ProductsList;
