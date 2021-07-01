import moment from 'moment-timezone';
import React, { useContext, useState } from 'react';

import { DetailsContext } from '../calendar/Context';
import {
  CreateButton,
  CreatePopupHeading,
  Form,
  FormInput,
  FormLabel,
  FormSelect,
  FormTextArea,
} from './NewEvent.styled';

const NewEvent = ({ closePopup, event, locations, formats }) => {
  const { title, description, start, end } = event;
  const { onCreateEvent } = useContext(DetailsContext);
  const [createdEvent, setCreatedEvent] = useState({ end, start });
  const [locationName, setLocationName] = useState();
  const locationNames = locations.map((loc) => {
    return loc.name;
  });

  const handleSetCreatedEvent = (name, value) => {
    setCreatedEvent((entity) => ({
      ...entity,
      [name]: value,
    }));
  };

  const handleTimeChange = (e) => {
    const { value, name } = e.target;
    handleSetCreatedEvent(name, value);
  };

  const handleLocationChange = (e) => {
    const { value, name } = e.target;
    if (locationNames.includes(value)) {
      setLocationName(value);
      const { id } = locations.find((item) => item.name === value);
      handleSetCreatedEvent('location_id', id);
    } else {
      setLocationName('');
      handleSetCreatedEvent(name, value);
    }
  };

  const handleFormatChange = (e) => {
    const { value, name } = e.target;
    const { id } = formats.find((item) => item.label === value);
    handleSetCreatedEvent(name, id);
  };

  const handleSubmit = () => {
    if (createdEvent.location) {
      createdEvent.location_id = undefined;
    }
    onCreateEvent(createdEvent);
    closePopup();
  };

  return (
    <div>
      <CreatePopupHeading>Create Event</CreatePopupHeading>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <FormLabel htmlFor="title">Title: </FormLabel>
        <FormInput
          id="title"
          type="text"
          value={createdEvent.title !== undefined ? createdEvent.title : title}
          onChange={(e) => handleSetCreatedEvent('title', e.target.value)}
        />
        <FormLabel htmlFor="start">Starts at: </FormLabel>
        <FormInput
          id="start"
          name="start"
          type="datetime-local"
          value={
            createdEvent.start !== undefined
              ? moment(createdEvent.start).format('YYYY-MM-DDTHH:mm')
              : moment(start).format('YYYY-MM-DDTHH:mm')
          }
          onChange={(e) => handleTimeChange(e)}
        />
        <FormLabel htmlFor="end">Ends at: </FormLabel>
        <FormInput
          defaultValue={moment(end).format('YYYY-MM-DD')}
          id="end"
          name="end"
          type="datetime-local"
          value={
            createdEvent.end !== undefined
              ? moment(createdEvent.end).format('YYYY-MM-DDTHH:mm')
              : moment(end).format('YYYY-MM-DDTHH:mm')
          }
          onChange={(e) => handleTimeChange(e)}
        />
        <FormLabel htmlFor="location">Location: </FormLabel>
        <FormInput
          id="location"
          list="locations"
          name="location"
          type="text"
          value={
            createdEvent.location !== undefined && createdEvent.location !== ''
              ? createdEvent.location
              : locationName
          }
          onChange={(e) => handleLocationChange(e)}
        />
        <datalist id="locations">
          {locations?.map((loc) => (
            <option key={loc.name} value={loc.name}>
              {loc.name}
            </option>
          ))}
        </datalist>
        <FormLabel htmlFor="event_format_id">Format: </FormLabel>
        <FormSelect
          id="event_format_id"
          name="event_format_id"
          type="text"
          onChange={(e) => handleFormatChange(e)}
        >
          <option defaultChecked>Please select a format</option>
          {formats?.map((format) => (
            <option key={format.label} value={format.label}>
              {format.label}
            </option>
          ))}
        </FormSelect>
        <FormLabel htmlFor="description">Description: </FormLabel>
        <FormTextArea
          id="description"
          type="text"
          value={
            createdEvent.description !== undefined
              ? createdEvent.description
              : description
          }
          onChange={(e) => handleSetCreatedEvent('description', e.target.value)}
        />
      </Form>
      <CreateButton type="submit" onClick={handleSubmit}>
        Create
      </CreateButton>
    </div>
  );
};

export default NewEvent;
