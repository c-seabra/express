import ButtonComponent from '@websummit/components/src/atoms/Button';
import { DestructiveButton } from '@websummit/components/src/atoms/Button';
import React, { useContext, useEffect, useState } from 'react';

import AddAttendance from '../addAttendance/AddAttendance';
import { DetailsContext } from '../calendar/Context';
import {
  Form,
  FormInput,
  FormLabel,
  FormSelect,
  FormTextArea,
  FormWrapper,
  InviteesListItem,
  Overlay,
  OverlayButtons,
  RemoveButton,
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
  formats,
}) => {
  const {
    locations,
    rsvps,
    onDeleteEvent,
    onDeleteEventInvitation,
    onUpdateEvent,
  } = useContext(DetailsContext);
  const { onCreateEventInvitation } = useContext(DetailsContext);
  const [selections, setSelections] = useState([]);
  const [deletions, setDeletions] = useState([]);
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
    selections?.forEach((att) => {
      onCreateEventInvitation(eventId, att.id);
    });
    deletions?.forEach((att) => {
      onDeleteEventInvitation(eventId, att);
    });
    setEditPopupActive(false);
  };

  return (
    <>
      <DestructiveButton
        style={{
          marginTop: '1em',
          marginLeft: '75%',
        }}
        onClick={(e) => {
          e.preventDefault();
          setDeletePopupActive(true);
        }}
      >
        Delete Event
      </DestructiveButton>
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
            onChange={(e) =>
              handleSetEditedEvent('description', e.target.value)
            }
          />
        </FormWrapper>
        <FormWrapper>
          <FormLabel>Add attendances: </FormLabel>
          <AddAttendance
            ids={rsvps.map((r) => r.attendance.data.id)}
            selections={selections}
            setSelections={setSelections}
          />
        </FormWrapper>
        <div>
          {rsvps.map(
            (rsvp) =>
              !deletions.includes(rsvp.invitation.id) && (
                <InviteesListItem key={rsvp.invitation.id}>
                  <span style={{ width: '90%' }}>
                    {`${String(
                      rsvp.attendance.data.person.first_name,
                    )} ${String(rsvp.attendance.data.person.last_name)}`}
                  </span>
                  <RemoveButton
                    onClick={() => {
                      setDeletions([...deletions, rsvp.invitation.id]);
                    }}
                  />
                </InviteesListItem>
              ),
          )}
        </div>
        <FormWrapper>
          <StyledButton
            style={{
              backgroundColor: '#fff',
              color: '#0067e9',
              marginLeft: '65%',
            }}
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
              <ButtonComponent
                type="primary"
                onClick={() => {
                  onDeleteEvent(eventId);
                  setDeletePopupActive(false);
                }}
              >
                Yes
              </ButtonComponent>
              <ButtonComponent
                type="error"
                onClick={() => setDeletePopupActive(false)}
              >
                No
              </ButtonComponent>
            </OverlayButtons>
          </Overlay>
        )}
      </Form>
    </>
  );
};

export default EditEvent;
