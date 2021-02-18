import React, { ReactElement, useState } from 'react';

import { Button, Icon, ListItem } from '../../lib/components';
import { ListColumn } from '../../lib/components/atoms';
import { ItemListHeader } from '../../lib/components/molecules';
import { SpacingBottom } from './InvestorPermissionsDashboard.styled';

type TicketSummary = {
  attendanceId?: string;
  bookingRef: string;
  eventSlug?: string;
  name?: string;
};

type InvestorPermissionsListProps = {
  tickets: Array<TicketSummary>;
};

const InvestorPermissionsList = ({
  tickets,
}: InvestorPermissionsListProps): ReactElement => {
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const toggleDetails = () => setShowDetails((show) => !show);

  return (
    <>
      <SpacingBottom>
        {tickets?.length !== 0 && (
          <Button
            type="button"
            onClick={() => {
              toggleDetails();
            }}
          >
            Toggle detail panel
          </Button>
        )}
      </SpacingBottom>
      <SpacingBottom hidden={!showDetails}>
        <ItemListHeader
          columns={['Booking Reference', 'Name', 'Event', 'Attendance ID']}
        />
        {tickets.map((ticket) => {
          const { attendanceId, bookingRef, eventSlug, name } = ticket;
          return (
            <ListItem key={bookingRef}>
              <ListColumn columnCount={4}>
                <Icon color={attendanceId ? '#00B66D' : '#E15554'}>
                  {attendanceId ? 'check' : 'close'}
                </Icon>
                {bookingRef}
              </ListColumn>
              <ListColumn columnCount={4}>{name}</ListColumn>
              <ListColumn columnCount={4}>{eventSlug}</ListColumn>
              <ListColumn columnCount={4}>{attendanceId}</ListColumn>
            </ListItem>
          );
        })}
      </SpacingBottom>
    </>
  );
};

export default InvestorPermissionsList;
