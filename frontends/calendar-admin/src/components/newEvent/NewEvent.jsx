import React, { useContext, useState } from 'react';

import { DetailsContext } from '../calendar/Context';
import {
  CreateButton,
  CreatePopupHeading,
  Form,
  FormInput,
  FormLabel,
  FormTextArea,
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
          name="location"
          type="text"
          value={
            createdEvent.location !== undefined
              ? createdEvent.location
              : location
          }
          onChange={(e) => handleChange(e)}
        />
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
      <CreateButton type="submit" onClick={(e) => handleSubmit(e)}>
        Create
      </CreateButton>
    </div>
  );
};

export default NewEvent;
