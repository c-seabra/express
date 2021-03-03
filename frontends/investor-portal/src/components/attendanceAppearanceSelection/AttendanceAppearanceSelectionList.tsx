import { ApolloError } from '@apollo/client';
import React, { ReactElement, useEffect, useState } from 'react';

import { useAttendanceAppearanceSelectionUpdateMutation } from '../../lib/hooks';
import Loader from '../../lib/Loading';
import { AttendanceAppearanceSelection } from '../../lib/types';
import AttendanceAppearanceSelectionItem from './AttendanceAppearanceSelectionItem';
import RightButton from './AttendanceAppearanceSelectionList.styled';
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
  const [hasAccepted, setHasAccepted] = useState<boolean>(false);
  const [status, setStatus] = useState<string>('');

  const handleStatus = () => {
    if (list[0]?.status === 'submitted') {
      setStatus('pending');
    } else if (list[0]?.status === 'pending') {
      setStatus('submitted');
    }
  };

  const checkHasAccepted = () => {
    const item = list.find((selection) => selection.status === 'accepted');
    setHasAccepted(item !== undefined);
  };

  useEffect(() => {
    checkHasAccepted();
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
      {!hasAccepted && (
        <RightButton onClick={submit}>
          {status === 'pending' ? 'Unlock Startups' : 'Submit'}
        </RightButton>
      )}
    </>
  );
};

export default AttendanceAppearanceSelectionList;
