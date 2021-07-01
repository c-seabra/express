import ContainerCard from '@websummit/components/src/molecules/ContainerCard';
import Table, {
  ColumnDescriptor,
} from '@websummit/components/src/molecules/Table';
import { Spacing } from '@websummit/components/src/templates/Spacing';
import { formatFullDate } from '@websummit/tsutils/src/utils/time';
import { Event } from '@websummit/graphql/src/@types/operations';
import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const StyledHeader = styled.span`
  color: #0c1439;
  font-size: 24px;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 24px;
`;

const StyledName = styled.span`
  color: #0067e9;
`;

type EventListProps = {
  error: any;
  events: any;
};
const EventList = ({ error, events }: EventListProps) => {
  const history = useHistory();
  const tableShape: ColumnDescriptor<Event>[] = [
    {
      header: 'Name',
      renderCell: (event) => <StyledName>{event.name || 'N/A'}</StyledName>,
      width: '20%',
    },
    {
      header: 'Start date',
      renderCell: (event) => formatFullDate(event.startDate) || 'N/A',
      width: '20%',
    },
    {
      header: 'End date',
      renderCell: (event) => formatFullDate(event.endDate) || 'N/A',
    },
    {
      header: 'Location',
      renderCell: (event) => event.country?.name || 'N/A',
    },
    {
      header: 'Created by',
      renderCell: (event) =>
        (event.versions && event.versions[0].whodunnit) || 'N/A',
    },
  ];

  // TODO lift up error and reuse useQuery hook for error handling
  if (error) {
    return <>{error.message}</>;
  }

  const redirectToEvent = (item: Event) => {
    history.push(`/${item.slug.toString()}/settings`);
  };

  return (
    <>
      <Spacing bottom="1.5rem">
        <StyledHeader>All events</StyledHeader>
      </Spacing>
      <ContainerCard noPadding>
        <Table<Event>
          items={events}
          tableShape={tableShape}
          onRowClick={redirectToEvent}
        />
      </ContainerCard>
    </>
  );
};

export default EventList;
