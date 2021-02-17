import React, { ReactElement, useState } from 'react';

import { Button, Icon } from '../../lib/components';
import {
  SpacingBottom,
  StripedTable,
} from './InvestorPermissionsDashboard.styled';

type Ticket = {
  attendanceId?: string;
  bookingRef: string;
  name?: string;
};

type InvestorPermissionsListProps = {
  tickets: Array<Ticket>;
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
        <StripedTable>
          <thead>
            <tr>
              <th colSpan={2}>Booking Reference</th>
              <th>Attendance ID</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => {
              const { attendanceId, bookingRef, name } = ticket;
              return (
                <tr key={bookingRef}>
                  <td className={attendanceId ? 'icon success' : 'icon fail'}>
                    <Icon>{attendanceId ? 'check' : 'close'}</Icon>
                  </td>
                  <td>{bookingRef}</td>
                  <td>{attendanceId}</td>
                  <td>{name}</td>
                </tr>
              );
            })}
          </tbody>
        </StripedTable>
      </SpacingBottom>
    </>
  );
};

export default InvestorPermissionsList;
