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

  const handleChange = (e) => {
    const { value, name } = e.target;
    let id;
    if (name === 'event_format_id') {
      formats.forEach((format) => {
        if (format.label === value) {
          id = format.id;
        }
      });
      handleSetCreatedEvent('event_format_id', id);
    } else if (name === 'location' && locationNames.includes(value)) {
      setLocationName(value);
      locations.forEach((loc) => {
        if (loc.name === value) {
          id = loc.id;
        }
      });
      handleSetCreatedEvent('location_id', id);
    } else {
      if (name === 'location') {
        setLocationName('');
      }
      handleSetCreatedEvent(name, value);
    }
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
          name="title"
          type="text"
          value={createdEvent.title !== undefined ? createdEvent.title : title}
          onChange={(e) => handleChange(e)}
        />
        <FormLabel htmlFor="start">Starts at: </FormLabel>
        <FormInput
          defaultValue={start}
          id="start"
          name="start"
          type="text"
          value={createdEvent.start !== undefined ? createdEvent.start : start}
          onChange={(e) => handleChange(e)}
        />
        <FormLabel htmlFor="end">Ends at: </FormLabel>
        <FormInput
          defaultValue={end}
          id="end"
          name="end"
          type="text"
          value={createdEvent.end !== undefined ? createdEvent.end : end}
          onChange={(e) => handleChange(e)}
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
          onChange={(e) => handleChange(e)}
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
          name="event_format_id"
          type="text"
          onChange={(e) => handleChange(e)}
        >
          <option defaultChecked>Please select a format</option>
          {formats?.map((format, i) => (
            <option key={i} value={format.label}>
              {format.label}
            </option>
          ))}
        </FormSelect>
        <FormLabel htmlFor="description">Description: </FormLabel>
        <FormTextArea
          id="description"
          name="description"
          type="text"
          value={
            createdEvent.description !== undefined
              ? createdEvent.description
              : description
          }
          onChange={(e) => handleChange(e)}
        />
      </Form>
      <CreateButton type="submit" onClick={handleSubmit}>
        Create
      </CreateButton>
    </div>
  );
};

export default NewEvent;
