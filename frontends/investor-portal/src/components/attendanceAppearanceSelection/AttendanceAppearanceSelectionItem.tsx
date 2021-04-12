import moment from 'moment';
import React, { ReactElement } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import {
  DestructiveButton,
  Modal,
  SecondaryButton,
  useModalState,
} from '../../lib/components';
import { useAttendanceAppearanceSelectionDestroyMutation } from '../../lib/hooks';
import { AttendanceAppearanceSelection } from '../../lib/types';
import Column, { ListItem } from './AttendanceAppearanceSelectionColumn.styled';

const AttendanceAppearanceSelectionItem = ({
  selection,
  eventTimezone,
}: {
  eventTimezone: string;
  selection: AttendanceAppearanceSelection;
}): ReactElement => {
  const { isOpen, openModal, closeModal } = useModalState();

  const {
    attendanceAppearanceSelectionDestroyMutation,
  } = useAttendanceAppearanceSelectionDestroyMutation({
    selectionId: selection.id,
  });

  const history = useHistory();
  const { attendanceId } = useParams<{ attendanceId: string }>();

  return (
    <ListItem>
      <Column>{selection.appearance.company.name}</Column>
      <Column>{new Date(selection.updatedAt).toDateString()}</Column>
      <Column>
        {selection.startsAt && (
          <div>
            {moment.tz(selection.startsAt, eventTimezone).format('ddd HH:mm')} -{' '}
            {moment.tz(selection.endsAt, eventTimezone).format('ddd HH:mm')}
          </div>
        )}
      </Column>
      <Column>{selection.status}</Column>
      <Column>
        <SecondaryButton
          style={{ marginLeft: 10 }}
          onClick={() =>
            history.push(`/dashboard/${attendanceId}/selection/${selection.id}`)
          }
        >
          Edit
        </SecondaryButton>
        <DestructiveButton style={{ marginLeft: 10 }} onClick={openModal}>
          Delete
        </DestructiveButton>
      </Column>

      <Modal
        defaultFooterIsDestructive
        withDefaultFooter
        defaultFooterPositiveButtonAction={async () => {
          await attendanceAppearanceSelectionDestroyMutation();
          closeModal();
        }}
        defaultFooterPositiveButtonText="Delete"
        description={`You are going to delete "${selection.appearance.company.name}" selection.\n\nThis action can not be un-done!`}
        isOpen={isOpen}
        title="Are you sure?"
        onRequestClose={closeModal}
      />
    </ListItem>
  );
};

export default AttendanceAppearanceSelectionItem;
