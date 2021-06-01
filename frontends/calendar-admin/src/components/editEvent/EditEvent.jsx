import { DestructiveButton } from '@websummit/components/src/atoms/Button';
import React, { useContext, useEffect, useState } from 'react';

import AddAttendance from '../addAttendance/AddAttendance';
import AvatarList from '../avatarList/AvatarList';
import { DetailsContext } from '../calendar/Context';
import {
  Form,
  FormEditInvitee,
  FormInput,
  FormLabel,
  FormSelect,
  FormTextArea,
  FormWrapper,
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
  startsAt,
  endsAt,
  eventFormatId,
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

  const [editedEvent, setEditedEvent] = useState({});
  const [deletePopupActive, setDeletePopupActive] = useState(false);
  const [locationName, setLocationName] = useState(location.name);
  const [formatName, setFormatName] = useState();
  const locationNames = locations.map((loc) => {
    return loc.name;
  });

  useEffect(() => {
    if (eventFormatId) {
      const { label } = formats.find((item) => item.id === eventFormatId);
      setFormatName(label);
    }
    if (location.id) {
      const { name } = locations.find((item) => item.id === location.id);
      setLocationName(name);
    }
  }, [location, locations, eventFormatId, formats]);

  const handleSetEditedEvent = (name, value) => {
    setEditedEvent((entity) => ({
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

  return (
    <Form onSubmit={(e) => handleSubmit(e)}>
      <FormWrapper>
        <FormLabel>Title: </FormLabel>
        <FormInput
          type="text"
          value={editedEvent.title !== undefined ? editedEvent.title : title}
          onChange={(e) => handleSetEditedEvent('title', e.target.value)}
        />
      </FormWrapper>
      <FormWrapper>
        <FormLabel>Starts At: </FormLabel>
        <FormInput
          type="datetime-local"
          value={
            editedEvent.starts_at !== undefined
              ? editedEvent.starts_at
              : startsAt
          }
          onChange={(e) => handleSetEditedEvent('starts_at', e.target.value)}
        />
      </FormWrapper>
      <FormWrapper>
        <FormLabel>Ends At: </FormLabel>
        <FormInput
          type="datetime-local"
          value={
            editedEvent.ends_at !== undefined ? editedEvent.ends_at : endsAt
          }
          onChange={(e) => handleSetEditedEvent('ends_at', e.target.value)}
        />
      </FormWrapper>
      <FormWrapper>
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
      </FormWrapper>
      <FormWrapper>
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
      </FormWrapper>
      <FormWrapper>
        <FormLabel>Description: </FormLabel>
        <FormTextArea
          value={
            editedEvent.description !== undefined
              ? editedEvent.description
              : description
          }
          onChange={(e) => handleSetEditedEvent('description', e.target.value)}
        />
      </FormWrapper>
      <FormWrapper>
        <FormLabel>Add attendances: </FormLabel>
        <AddAttendance eventId={eventId} />
      </FormWrapper>
      <FormWrapper>
        <FormEditInvitee>
          <AvatarList
            iconActive
            avatarList={rsvps}
            iconClickCallback={(id) => onDeleteEventInvitation(eventId, id)}
            listType="delete"
            organizerId={organizerId}
          />
        </FormEditInvitee>
      </FormWrapper>
      <FormWrapper>
        <DestructiveButton
          onClick={(e) => {
            e.preventDefault();
            setDeletePopupActive(true);
          }}
        >
          Delete Event
        </DestructiveButton>
        <StyledButton
          style={{ marginLeft: `12rem` }}
          type="button"
          onClick={() => setEditPopupActive(false)}
        >
          Cancel
        </StyledButton>
        <StyledButton type="submit">Save</StyledButton>
      </FormWrapper>
      {deletePopupActive && (
        <Overlay>
          <h3>Are you sure you want to delete this event?</h3>
          <OverlayButtons>
            <OverlayButton
              onClick={() => {
                onDeleteEvent(eventId);
                setDeletePopupActive(false);
              }}
            >
              Yes
            </OverlayButton>
            <OverlayButton onClick={() => setDeletePopupActive(false)}>
              No
            </OverlayButton>
          </OverlayButtons>
        </Overlay>
      )}
    </Form>
  );
};

export default EditEvent;
