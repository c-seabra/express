import ContainerCard from '@websummit/components/src/molecules/ContainerCard';
import SelectableTable from '@websummit/components/src/molecules/SelectableTable';
import { ColumnDescriptor } from '@websummit/components/src/molecules/Table';
import { formatFullDate } from '@websummit/components/src/utils/time';
import {
  CommerceSale,
  useCommerceUpdateSaleMutation,
} from '@websummit/graphql/src/@types/operations';
import React from 'react';
import styled from 'styled-components';

import {
  useErrorSnackbar,
  useSuccessSnackbar,
} from '../../../../../packages/components/src/molecules/Snackbar';
import COMMERCE_SALES_LIST from '../../../../../packages/graphql/src/operations/queries/SalesCyclesList';
import { useAppContext } from '../app/AppContext';

const StyledName = styled.span`
  color: #0067e9;
`;

type SalesCyclesListProps = {
  cycles: CommerceSale[];
  onRowClick?: any;
};
const SalesCyclesList = ({ cycles, onRowClick }: SalesCyclesListProps) => {
  const tableShape: ColumnDescriptor<CommerceSale>[] = [
    {
      header: 'Name',
      renderCell: (cycle) => <StyledName>{cycle.name || 'N/A'}</StyledName>,
      width: '25%',
    },
    {
      header: 'Start date',
      renderCell: (cycle) => formatFullDate(cycle.startDate) || 'N/A',
    },
    {
      header: 'End date',
      renderCell: (cycle) => formatFullDate(cycle.endDate) || 'N/A',
    },
    {
      header: 'Description',
      renderCell: (cycle) => cycle.description || 'N/A',
    },
  ];

  const { token } = useAppContext();
  const snackbar = useSuccessSnackbar();
  const errorSnackbar = useErrorSnackbar();
  const [updateCycle] = useCommerceUpdateSaleMutation({
    context: { token },
    onCompleted: () => {
      snackbar('Sale cycle updated');
    },
    onError: (e) => errorSnackbar(e.message),
    refetchQueries: [{ context: { token }, query: COMMERCE_SALES_LIST }],
  });

  return (
    <>
      <ContainerCard noPadding>
        <SelectableTable<CommerceSale>
          disableToggleAll
          lastColumn
          header="Active"
          items={cycles?.map((cycle) => ({
            ...cycle,
            selected: cycle.active,
          }))}
          tableShape={tableShape}
          onRowClick={onRowClick}
          onSelect={async (selectedItem, selected) => {
            console.log('selectedItem', selectedItem);
            if (selectedItem?.id) {
              await updateCycle({
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

export default SalesCyclesList;
