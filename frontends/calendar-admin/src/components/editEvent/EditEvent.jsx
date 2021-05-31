import { DestructiveButton } from '@websummit/components/src/atoms/Button';
import React, { useContext, useEffect, useState } from 'react';

import AvatarList from '../avatarList/AvatarList';
import { DetailsContext } from '../calendar/Context';
import {
  Form,
  FormEditInvitee,
  FormInput,
  FormLabel,
  FormSelect,
  FormTextArea,
  Overlay,
  OverlayButton,
  OverlayButtons,
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
  event_format_id,
  organizerId,
  formats,
}) => {
  const {
    locations,
    rsvps,
    onDeleteEvent,
    onDeleteEventInvitation,
    onUpdateEvent,
  } = useContext(DetailsContext);

  const [editedEvent, seteditedEvent] = useState({});
  const [deletePopupActive, setDeletePopupActive] = useState(false);
  const [deletedInvites, setDeletedInvites] = useState([]);
  const [locationName, setLocationName] = useState(location.name);
  const [formatName, setFormatName] = useState();
  const locationNames = locations.map((loc) => {
    return loc.name;
  });

  useEffect(() => {
    if (event_format_id) {
      const { label } = formats.find((item) => item.id === event_format_id);
      setFormatName(label);
    }
    if (location.id) {
      const { name } = locations.find((item) => item.id === location.id);
      setLocationName(name);
    }
  }, [location, locations, event_format_id, formats]);

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

  const handleFormatChange = (e) => {
    const { value } = e.target;
    setFormatName(value);
    const { id } = formats.find((item) => item.label === value);
    handleSetEditedEvent('event_format_id', id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      Object.keys(editedEvent).length !== 0 &&
      editedEvent.constructor === Object
    )
      onUpdateEvent(eventId, editedEvent);

    setEditPopupActive(false);
  };

  const handleDeleteResponse = (deleteResponse) => {
    if (deleteResponse) onDeleteEvent(eventId);
    setDeletePopupActive(false);
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
      <FormLabel htmlFor="event_format_id">Format: </FormLabel>
      <FormSelect
        id="event_format_id"
        type="text"
        value={formatName}
        onChange={(e) => handleFormatChange(e)}
      >
        <option defaultChecked>Please select a format</option>
        {formats?.map((format, i) => (
          <option key={i} value={format.label}>
            {format.label}
          </option>
        ))}
      </FormSelect>
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
          iconClickCallback={(id) => onDeleteEventInvitation(eventId, id)}
          listType="delete"
          organizerId={organizerId}
        />
      </FormEditInvitee>
      <DestructiveButton
        onClick={(e) => {
          e.preventDefault();
          setDeletePopupActive(true);
        }}
      >
        Delete Event
      </DestructiveButton>
      <StyledButton type="submit">Save</StyledButton>
      <StyledButton type="button" onClick={() => setEditPopupActive(false)}>
        Cancel
      </StyledButton>
      {deletePopupActive && (
        <Overlay>
          <h3>Are you sure you want to delete this event?</h3>
          <OverlayButtons>
            <OverlayButton onClick={() => handleDeleteResponse(true)}>
              Yes
            </OverlayButton>
            <OverlayButton onClick={() => handleDeleteResponse(false)}>
              No
            </OverlayButton>
          </OverlayButtons>
        </Overlay>
      )}
    </Form>
  );
};

export default EditEvent;
