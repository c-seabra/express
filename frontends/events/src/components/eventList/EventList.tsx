import ContainerCard from '@websummit/components/src/molecules/ContainerCard';
import Table, {
  ColumnDescriptor,
} from '@websummit/components/src/molecules/Table';
import React from 'react';

import { formatDefaultDateTime } from '../../../../ticket-support/src/lib/utils/time';
import { Event } from '../../lib/types';
import styled from "styled-components";

const StyledHeader = styled.span`
  color: #0C1439;
  font-size: 24px;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 24px;
`;

const StyledName = styled.span`
  color: #0067E9;
`;

type EventListProps = {
  error: any;
  events: any;
};
const EventList = ({ error, events }: EventListProps) => {
  const tableShape: ColumnDescriptor<Event>[] = [
    {
      header: 'Name',
      renderCell: (event) => <StyledName>{event.name || 'N/A'}</StyledName>,
      width: '20%',
    },
    {
      header: 'Start date',
      renderCell: (event) => formatDefaultDateTime(event.startDate) || 'N/A',
      width: '20%',
    },
    {
      header: 'End date',
      renderCell: (event) => formatDefaultDateTime(event.endDate) || 'N/A',
    },
    {
      header: 'Location',
      renderCell: (event) => event.country?.name || 'N/A',
    },
    // TODO check if we can get it via events query
    // {
    //   header: 'Created by',
    //   renderCell: (event) => event.createdBy,
    // },
  ];

  if (error) {
    return <>{error.message}</>;
  }

  return (
    <>
      <StyledHeader>All events</StyledHeader>
      <ContainerCard noPadding>
        <Table<Event> items={events} tableShape={tableShape} />
      </ContainerCard>
    </>
  );
};

export default EventList;
