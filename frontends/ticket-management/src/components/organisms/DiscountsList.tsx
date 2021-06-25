import ContainerCard from '@websummit/components/src/molecules/ContainerCard';
import Table, {
  ColumnDescriptors,
} from '@websummit/components/src/molecules/Table';
import { formatFullDateTime } from '@websummit/components/src/utils/time';
import { CommerceDeal } from '@websummit/graphql/src/@types/operations';
import useGetEventTimeZone from '@websummit/graphql/src/hooks/useGetEventTimeZone';
import React from 'react';
import styled from 'styled-components';
import Badge from '../../../../../packages/components/src/atoms/Badge';

const StyledName = styled.span`
  color: #0067e9;
`;

type PackagesListProps = {
  discounts: CommerceDeal[];
  onRowClick?: any;
};
const DiscountList = ({ discounts, onRowClick }: PackagesListProps) => {
  const eventTimeZone = useGetEventTimeZone();
  const { ianaName } = eventTimeZone || {};

  // Is Active : Green for Active, Red for Inactive
  //
  //   Total Usage : Display count of configured  usage number
  //
  // Times Used, Display count of actual usage
  const tableShape: ColumnDescriptors<CommerceDeal> = [
    {
      header: 'Discount code',
      renderCell: (deal) => <StyledName>{deal.code || 'N/A'}</StyledName>,
      width: '20%',
    },
    {
      header: 'Valid from date',
      renderCell: (deal) =>
        formatFullDateTime(deal.startDate, ianaName) || 'N/A',
    },
    {
      header: 'Valid up-to date',
      renderCell: (deal) => formatFullDateTime(deal.endDate, ianaName) || 'N/A',
    },
    {
      header: 'Total usage',
      renderCell: (deal) => deal.usages || 'N/A',
    },
    {
      header: 'Times used',
      renderCell: (deal) => deal.timesUsed || 'N/A',
    },
    {
      header: 'Status',
      renderCell: (deal) => {
        const badge = {
          background: deal.active ? '#EAF9EA' : '#FDEBEB',
          color: deal.active ? '#3BB273' : '#E15554',
        };

        return (
          <Badge background={badge.background} color={badge.color}>
            {deal.active ? 'Active' : 'Inactive' || 'N/A'}
          </Badge>
        );
      },
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

export default DiscountList;
