import { ApolloError } from '@apollo/client';
import React, { ReactElement, useEffect, useState } from 'react';

import { useAttendanceAppearanceSelectionUpdateMutation } from '../../lib/hooks';
import Loader from '../../lib/Loading';
import { AttendanceAppearanceSelection } from '../../lib/types';
import AttendanceAppearanceSelectionItem from './AttendanceAppearanceSelectionItem';
import SubmitButton from './AttendanceAppearanceSelectionList.styled';
import AttendanceAppearanceSelectionListHeader from './AttendanceAppearanceSelectionListHeader';

type AtendanceAppearanceSelectionListProps = {
  attendanceId: string;
  error?: ApolloError;
  list: AttendanceAppearanceSelection[];
  loading: boolean;
};

const AttendanceAppearanceSelectionList = ({
  attendanceId,
  list = [],
  loading,
  error,
}: AtendanceAppearanceSelectionListProps): ReactElement => {
  const [hideAction, setHideAction] = useState<boolean>(false);
  const [status, setStatus] = useState<string>('');

  const handleStatus = () => {
    const statuses = list
      .map((l) => {
        return l.status;
      })
      .filter((v, i, a) => a.indexOf(v) === i);
    if (
      statuses.some((x) => x === 'accepted') ||
      statuses.some((x) => x === 'rejected')
    ) {
      setHideAction(true);
    } else if (statuses.some((x) => x === 'submitted')) {
      setStatus('pending');
    } else if (statuses.some((x) => x === 'pending')) {
      setStatus('submitted');
    }
  };

  useEffect(() => {
    handleStatus();
  });

  const {
    updateAttendanceAppearanceSelections,
  } = useAttendanceAppearanceSelectionUpdateMutation({
    attendanceIds: [attendanceId],
    status,
  });

  const submit = async () => {
    await updateAttendanceAppearanceSelections();
    handleStatus();
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <>{error.message}</>;
  }

  return (
    <>
      <AttendanceAppearanceSelectionListHeader />
      {list.map((selection) => (
        <AttendanceAppearanceSelectionItem
          key={selection.id}
          selection={selection}
        />
      ))}
      {!hideAction && (
        <SubmitButton onClick={submit}>
          {status === 'pending' ? 'Unlock Startups' : 'Submit'}
        </SubmitButton>
      )}
    </>
  );
};

export default AttendanceAppearanceSelectionList;
