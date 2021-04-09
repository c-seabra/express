import React, { useContext, useState } from 'react';

import AvatarList from '../avatarList/AvatarList';
import { DetailsContext } from '../calendar/Context';
import OvalSquare from '../svgs/OvalSquare';
import {
  Button,
  Form,
  FormEditContent,
  FormEditInvitee,
  FormInput,
} from './EditEvent.styled';

const EditEvent = ({
  eventId,
  setEditPopupActive,
  title,
  location,
  description,
  organizerId,
}) => {
  const {
    locations,
    rsvps,
    onDeleteEventInvitation,
    onUpdateEvent,
  } = useContext(DetailsContext);

  const [editedEntity, setEditedEntity] = useState({});
  const [deletedInvites, setDeletedInvites] = useState([]);
  // // new invitations
  // const [newInvites, setnewInvites] = useState({})

  const handleChange = (e) => {
    const { value, name } = e.target;
    setEditedEntity((editedEntity) => ({
      ...editedEntity,
      [name]: value || '',
    }));
  };

  const handleDeleteInvitation = (invitationId) => {
    setDeletedInvites((prevState) => {
      return [...prevState, invitationId];
    });
  };

  // const onNewInvitation = attendanceID => {
  //     // add invitation edit to local invitees list
  //     setnewInvites([...newInvites, attendanceID]);
  // }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      Object.keys(editedEntity).length !== 0 &&
      editedEntity.constructor === Object
    )
      onUpdateEvent(eventId, editedEntity);

    if (deletedInvites && deletedInvites.length)
      deletedInvites.map((invite) => onDeleteEventInvitation(eventId, invite));

    setEditPopupActive(false);
  };

  return (
    <Form onSubmit={(e) => handleSubmit(e)}>
      <FormEditContent>
        <FormInput>
          <OvalSquare />
          <input
            name="title"
            type="text"
            value={
              editedEntity.title !== undefined ? editedEntity.title : title
            }
            onChange={(e) => handleChange(e)}
          />
        </FormInput>

        <FormInput>
          <input
            name="location_name"
            type="text"
            value={
              editedEntity.location_name !== undefined
                ? editedEntity.location_name
                : location.name
            }
            onChange={(e) => handleChange(e)}
          />
          {locations && (
            <select
              name="location_id"
              value={
                editedEntity.location_id !== undefined
                  ? editedEntity.location_id
                  : location.id
              }
              onChange={(e) => handleChange(e)}
            >
              <option key="emptySelect" disabled value="">
                Select location
              </option>
              {locations.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc && loc.name}
                </option>
              ))}
            </select>
          )}
        </FormInput>
        <FormInput>
          <textarea
            value={
              editedEntity.description !== undefined
                ? editedEntity.description
                : description
            }
            onChange={(e) => handleChange(e)}
            name="description"
          />
        </FormInput>
        <Button type="submit">Save</Button>
        <Button type="button" onClick={() => setEditPopupActive(false)}>
          Cancel
        </Button>
      </FormEditContent>

      <FormEditInvitee>
        <AvatarList
          iconActive
          avatarList={rsvps}
          iconClickCallback={handleDeleteInvitation}
          listType="delete"
          organizerId={organizerId}
        />
      </FormEditInvitee>
    </Form>
  );
};

export default EditEvent;
