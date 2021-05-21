import React, { useContext, useState } from 'react';

import { DetailsContext } from '../calendar/Context';
import {
  CreateButton,
  CreatePopupHeading,
  Form,
  FormInput,
  FormLabel,
} from './NewEvent.styled';

const NewEvent = ({ closePopup, event }) => {
  const { title, description, location, start, end } = event;
  const { onCreateEvent } = useContext(DetailsContext);
  const [createdEvent, setCreatedEvent] = useState({ end, start });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setCreatedEvent((entity) => ({
      ...entity,
      [name]: value || '',
    }));
  };

  const handleSubmit = (e) => {
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
          onChange={(e) => handleChange(e)}
          value={createdEvent.title !== undefined ? createdEvent.title : title}
        />
        <FormLabel htmlFor="start">Starts at: </FormLabel>
        <FormInput
          id="start"
          name="start"
          type="text"
          defaultValue={start}
          onChange={(e) => handleChange(e)}
          value={createdEvent.start !== undefined ? createdEvent.start : start}
        />
        <FormLabel htmlFor="end">Ends at: </FormLabel>
        <FormInput
          id="end"
          name="end"
          type="text"
          defaultValue={end}
          onChange={(e) => handleChange(e)}
          value={createdEvent.end !== undefined ? createdEvent.end : end}
        />
        <FormLabel htmlFor="location">Location: </FormLabel>
        <FormInput
          id="location"
          name="location"
          type="text"
          onChange={(e) => handleChange(e)}
          value={
            createdEvent.location !== undefined
              ? createdEvent.location
              : location
          }
        />
        <FormLabel htmlFor="description">Description: </FormLabel>
        <FormInput
          id="description"
          name="description"
          type="text"
          onChange={(e) => handleChange(e)}
          value={
            createdEvent.description !== undefined
              ? createdEvent.description
              : description
          }
        />
      </Form>
      <CreateButton onClick={(e) => handleSubmit(e)} type="submit">
        Create
      </CreateButton>
    </div>
  );
};

export default NewEvent;
