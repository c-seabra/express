import React, { useContext, useEffect, useState } from 'react';

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

  const [editedEvent, seteditedEvent] = useState({});
  const [deletedInvites, setDeletedInvites] = useState([]);
  const [locationName, setLocationName] = useState(location.name);
  const locationNames = locations.map((loc) => {
    return loc.name;
  });

  useEffect(() => {
    if (location.id) {
      const { name } = locations.find((item) => item.id === location.id);
      setLocationName(name);
    }
  }, [location, locations]);

  const handleSetEditedEvent = (name, value) => {
    seteditedEvent((entity) => ({
      ...entity,
      [name]: value,
    }));
  };

  const handleLocationChange = (e) => {
    const { value } = e.target;
    if (locationNames.includes(value)) {
      setLocationName(value);
      const { id } = locations.find((item) => item.name === value);
      handleSetEditedEvent('location_id', id);
    } else {
      setLocationName(value);
      handleSetEditedEvent('location_name', value);
    }
  };

  const handleDeleteInvitation = (invitationId) => {
    setDeletedInvites((prevState) => {
      return [...prevState, invitationId];
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      Object.keys(editedEvent).length !== 0 &&
      editedEvent.constructor === Object
    )
      onUpdateEvent(eventId, editedEvent);

    if (deletedInvites && deletedInvites.length)
      deletedInvites.map((invite) => onDeleteEventInvitation(eventId, invite));

    setEditPopupActive(false);
  };

  return (
    <Form onSubmit={(e) => handleSubmit(e)}>
      <FormLabel>Title: </FormLabel>
      <FormInput
        type="text"
        value={editedEvent.title !== undefined ? editedEvent.title : title}
        onChange={(e) => handleSetEditedEvent('title', e.target.value)}
      />
      <FormLabel>Starts At: </FormLabel>
      <FormInput
        type="datetime-local"
        value={
          editedEvent.starts_at !== undefined
            ? editedEvent.starts_at
            : starts_at
        }
        onChange={(e) => handleSetEditedEvent('starts_at', e.target.value)}
      />
      <FormLabel>Ends At: </FormLabel>
      <FormInput
        type="datetime-local"
        value={
          editedEvent.ends_at !== undefined ? editedEvent.ends_at : ends_at
        }
        onChange={(e) => handleSetEditedEvent('ends_at', e.target.value)}
      />
      <FormLabel htmlFor="location">Location: </FormLabel>
      <FormInput
        id="location"
        list="locations"
        type="text"
        value={locationName}
        onChange={(e) => handleLocationChange(e)}
      />
      <datalist id="locations">
        {locations?.map((loc, i) => (
          <option key={i} value={loc.name}>
            {loc.name}
          </option>
        ))}
      </datalist>
      <FormLabel>Description: </FormLabel>
      <FormTextArea
        value={
          editedEvent.description !== undefined
            ? editedEvent.description
            : description
        }
        onChange={(e) => handleSetEditedEvent('description', e.target.value)}
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
