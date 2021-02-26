import moment from 'moment';
import React, { useEffect, useState } from 'react';

import { Button, Select } from '../../lib/components';
import {
  useAttendanceInvestorSessionUpdateMutation,
  useEventQuery,
} from '../../lib/hooks';
import { AttendanceAppearanceSelection } from '../../lib/types';
import { StyledForm } from './AttendanceInvestorSession.styled';

type AttendanceInvestorSessionType = {
  attendanceId: string;
  currentEndsAt: string;
  currentStartsAt: string;
  selections: AttendanceAppearanceSelection[];
};

const AttendanceInvestorSession: React.FC<AttendanceInvestorSessionType> = ({
  currentStartsAt,
  currentEndsAt,
  attendanceId,
  selections = [],
}) => {
  const [newStartsAt, setNewStartsAt] = useState<string | undefined>();
  const [eventTimezone, setEventTimezone] = useState<string>('Europe/Dublin');
  const [selected, setSelected] = useState<boolean>(false);
  const [unlockInvestor, setUnlockInvestor] = useState<boolean>(false);
  const [hasAccepted, setHasAccepted] = useState<boolean>(false);

  const { data } = useEventQuery();

  const investorSessionsSummary = data?.event.investorSessionsSummary;

  const handleUnlock = () => {
    setUnlockInvestor(currentStartsAt !== undefined && selected === false);
  };

  const checkHasAccepted = () => {
    const item = selections.find(
      (selection) => selection.status === 'accepted',
    );
    setHasAccepted(item !== undefined);
  };

  const styledDateForMutation = (dateString?: string) => {
    if (dateString === undefined || dateString === '') {
      return undefined;
    }
    return moment(dateString).tz(eventTimezone, true).format();
  };

  useEffect(() => {
    checkHasAccepted();
    handleUnlock();
    setEventTimezone(data?.event.timeZone.ianaName || 'Europe/Dublin');
  });

  const startsAt = styledDateForMutation(newStartsAt);

  const {
    attendanceInvestorSessionUpdateMutation,
  } = useAttendanceInvestorSessionUpdateMutation({
    attendanceId,
    eventTimezone,
    startsAt,
    unlockInvestor,
  });

  const submit = async () => {
    await attendanceInvestorSessionUpdateMutation();
    handleUnlock();
  };

  return (
    <>
      <StyledForm>
        {currentStartsAt && (
          <span>
            {moment.tz(currentStartsAt, eventTimezone).format('dddd')}:{' '}
            {moment.tz(currentStartsAt, eventTimezone).format('HH:mm')} -{' '}
            {moment.tz(currentEndsAt, eventTimezone).format('HH:mm')}
          </span>
        )}
        {!currentStartsAt && (
          <div>Investor has not selected a session timeslot</div>
        )}
        {!hasAccepted && (
          <>
            <Select
              onChange={(e) => {
                setNewStartsAt(e.target.value);
                setSelected(true);
              }}
            >
              <option defaultChecked>Select another available session</option>
              {investorSessionsSummary?.map((item, i) => (
                <option
                  key={i}
                  disabled={item.available === '0'}
                  value={moment
                    .tz(item.startsAt, eventTimezone)
                    .format('YYYY-MM-DDTHH:mm')}
                >
                  {moment.tz(item?.startsAt, eventTimezone).format('dddd')}:{' '}
                  {moment.tz(item?.startsAt, eventTimezone).format('HH:mm')} -{' '}
                  {moment.tz(item?.endsAt, eventTimezone).format('HH:mm')}
                </option>
              ))}
            </Select>
            <Button onClick={submit}>
              {unlockInvestor ? 'Unlock Investor' : 'Submit'}
            </Button>
          </>
        )}
      </StyledForm>
    </>
  );
};

export default AttendanceInvestorSession;
