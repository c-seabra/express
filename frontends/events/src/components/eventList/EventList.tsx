import React from 'react';

import ContainerCard from '@websummit/components/src/molecules/ContainerCard';
import Table, {
  ColumnDescriptor,
} from '@websummit/components/src/molecules/Table';
import { formatDefaultDateTime } from '../../../../ticket-support/src/lib/utils/time';
import Loader from '../../lib/Loading';
import { Event } from '../../lib/types';

type EventListProps = {
  error: any;
  events: any;
  loading: boolean;
};

const EventList = ({ loading, error, events }: EventListProps) => {
  const tableShape: ColumnDescriptor<Event>[] = [
    {
      header: 'Name',
      renderCell: (event) => event.name,
      width: '20%',
    },
    {
      header: 'Start date',
      renderCell: (event) => formatDefaultDateTime(event.startDate),
      width: '20%',
    },
    {
      header: 'End date',
      renderCell: (event) => formatDefaultDateTime(event.endDate),
    },
    {
      header: 'Location',
      renderCell: (event) => event.country,
    },
    {
      header: 'Created by',
      renderCell: (event) => 'cby',
    },
  ];

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <>{error.message}</>;
  }

  return (
    <>
      <h4>All events</h4>
      <ContainerCard noPadding>
        <Table<Event> items={events} tableShape={tableShape} />
      </ContainerCard>
    </>
  );
};

export default EventList;
