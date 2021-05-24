import React, { useContext, useState } from 'react';

import AvatarList from '../avatarList/AvatarList';
import { DetailsContext } from '../calendar/Context';
import {
  Form,
  FormEditInvitee,
  FormInput,
  FormLabel,
  FormTextArea,
  StyledButton,
} from './EditEvent.styled';

const EditEvent = ({
  eventId,
  setEditPopupActive,
  title,
  location,
  description,
  starts_at,
  ends_at,
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
    setEditedEntity((entity) => ({
      ...entity,
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
      <FormLabel>Title: </FormLabel>
      <FormInput
        name="title"
        type="text"
        value={editedEntity.title !== undefined ? editedEntity.title : title}
        onChange={(e) => handleChange(e)}
      />
      <FormLabel>Starts At: </FormLabel>
      <FormInput
        name="starts_at"
        type="text"
        value={
          editedEntity.starts_at !== undefined
            ? editedEntity.starts_at
            : starts_at
        }
        onChange={(e) => handleChange(e)}
      />
      <FormLabel>Ends At: </FormLabel>
      <FormInput
        name="ends_at"
        type="text"
        value={
          editedEntity.ends_at !== undefined ? editedEntity.ends_at : ends_at
        }
        onChange={(e) => handleChange(e)}
      />
      <FormLabel>Location: </FormLabel>
      <FormInput
        name="location_name"
        type="text"
        value={
          editedEntity.location_name !== undefined
            ? editedEntity.location_name
            : location.name
        }
        onChange={(e) => handleChange(e)}
      />
      {locations.length > 0 && (
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
      <FormLabel>Description: </FormLabel>
      <FormTextArea
        name="description"
        value={
          editedEntity.description !== undefined
            ? editedEntity.description
            : description
        }
        onChange={(e) => handleChange(e)}
      />
      <FormEditInvitee>
        <AvatarList
          iconActive
          avatarList={rsvps}
          iconClickCallback={handleDeleteInvitation}
          listType="delete"
          organizerId={organizerId}
        />
      </FormEditInvitee>
      <StyledButton type="submit">Save</StyledButton>
      <StyledButton type="button" onClick={() => setEditPopupActive(false)}>
        Cancel
      </StyledButton>
    </Form>
  );
};

export default EditEvent;
