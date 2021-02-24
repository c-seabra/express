import { ApolloError } from '@apollo/client';
import React, { ReactElement, useEffect, useState } from 'react';

import { useAttendanceAppearancesUpdateMutation } from '../../lib/hooks';
import Loader from '../../lib/Loading';
import { AttendanceAppearanceSelection } from '../../lib/types';
import AttendanceAppearanceSelectionItem from './AttendanceAppearanceSelectionItem';
import RightButton from './AttendanceAppearanceSelectionList.styled';
import AttendanceAppearanceSelectionListHeader from './AttendanceAppearanceSelectionListHeader';

type AtendanceAppearanceSelectionListProps = {
  error?: ApolloError;
  list: AttendanceAppearanceSelection[];
  loading: boolean;
};

const AttendanceAppearanceSelectionList = ({
  list = [],
  loading,
  error,
}: AtendanceAppearanceSelectionListProps): ReactElement => {
  const [unlockStartup, setUnlockStartup] = useState<boolean>(false);
  const [hasAccepted, setHasAccepted] = useState<boolean>(false);
  const ids = list.map((item) => item.appearance.id);

  const handleUnlock = () => {
    setUnlockStartup(list[0]?.status === 'submitted');
  };

  const checkHasAccepted = () => {
    const item = list.find((selection) => selection.status === 'accepted');
    setHasAccepted(item !== undefined);
  };

  useEffect(() => {
    checkHasAccepted();
    handleUnlock();
  });

  const {
    attendanceAppearancesUpdateMutation,
  } = useAttendanceAppearancesUpdateMutation({
    appearanceIds: ids,
    unlockStartup,
  });

  const submit = async () => {
    await attendanceAppearancesUpdateMutation();
    handleUnlock();
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
          {unlockStartup ? 'Unlock Startups' : 'Submit'}
        </RightButton>
      )}
    </>
  );
};

export default AttendanceAppearanceSelectionList;
