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
import COMMERCE_SALES_LIST from '@websummit/graphql/src/operations/queries/SalesCyclesList';
import React from 'react';
import styled from 'styled-components';

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
      width: '20%',
    },
    {
      header: 'Start date',
      renderCell: (cycle) => formatFullDateTime(cycle.startDate) || 'N/A',
    },
    {
      header: 'End date',
      renderCell: (cycle) => formatFullDateTime(cycle.endDate) || 'N/A',
    },
    {
      header: 'Description',
      renderCell: (cycle) => cycle.description || 'N/A',
    },
  ];

  const { conferenceSlug, token } = useAppContext();
  const context = {
    slug: conferenceSlug,
    token,
  };

  const snackbar = useSuccessSnackbar();
  const errorSnackbar = useErrorSnackbar();
  const [updateCycle] = useCommerceUpdateSaleMutation({
    context,
    onCompleted: () => {
      snackbar('Sale cycle updated');
    },
    onError: (e) => errorSnackbar(e.message),
    refetchQueries: [{ context, query: COMMERCE_SALES_LIST }],
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
