import ContainerCard from '@websummit/components/src/molecules/ContainerCard';
import Table, {
  ColumnDescriptors,
} from '@websummit/components/src/molecules/Table';
import { formatFullDateTime } from '@websummit/tsutils/src/utils/time';
import { CommerceDeal } from '@websummit/graphql/src/@types/operations';
import useGetEventTimeZone from '@websummit/graphql/src/hooks/useGetEventTimeZone';
import React from 'react';
import styled from 'styled-components';

const StyledName = styled.span`
  color: #0067e9;
`;

type PackagesListProps = {
  discounts: CommerceDeal[];
  onRowClick?: any;
};
const DiscountTemplatesList = ({
  discounts,
  onRowClick,
}: PackagesListProps) => {
  const eventTimeZone = useGetEventTimeZone();
  const { ianaName } = eventTimeZone || {};

  const tableShape: ColumnDescriptors<CommerceDeal> = [
    {
      header: 'Discount Template name',
      renderCell: (deal) => <StyledName>{deal.name || 'N/A'}</StyledName>,
      width: '20%',
    },
    {
      header: 'Valid from',
      renderCell: (deal) =>
        formatFullDateTime(deal.startDate, ianaName) || 'N/A',
    },
    {
      header: 'Valid upto',
      renderCell: (deal) => formatFullDateTime(deal.endDate, ianaName) || 'N/A',
    },
    {
      header: 'Code prefix',
      renderCell: (deal) => deal.code || 'N/A',
    },
    {
      header: 'Number of uses per discount',
      renderCell: (deal) => deal.usages || 'N/A',
    },
    {
      header: 'Reason for usage',
      renderCell: (deal) => deal.description || 'N/A',
    },
  ];

  return (
    <>
      <ContainerCard noPadding>
        <Table<CommerceDeal>
          items={discounts}
          tableShape={tableShape}
          onRowClick={onRowClick}
        />
      </ContainerCard>
    </>
  );
};

export default DiscountTemplatesList;
