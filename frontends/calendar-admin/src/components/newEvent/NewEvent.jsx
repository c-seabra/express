import React, { useContext, useState } from 'react';

import Button from '../button/Button';
import { DetailsContext } from '../calendar/Context';

const NewEvent = ({ event }) => {
  const { title, description, location, start, end } = event;
  const { onCreateEvent } = useContext(DetailsContext);
  const [createdEvent, setCreatedEvent] = useState({"end": end, "start": start});

  const handleChange = (e) => {
    const { value, name } = e.target;
    setCreatedEvent((entity) => ({
      ...entity,
      [name]: value || '',
    }));
  };

  const handleSubmit = (e) => {
    onCreateEvent(createdEvent);
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="title">Title: </label>
        <br />
        <input
          id="title"
          name="title"
          type="text"
          onChange={(e) => handleChange(e)}
          value={createdEvent.title !== undefined ? createdEvent.title : title}
        />
        <br />
        <label htmlFor="start">Starts at: </label>
        <br />
        <input
          id="start"
          name="start"
          type="text"
          defaultValue={start}
          onChange={(e) => handleChange(e)}
          value={
            createdEvent.start !== undefined
              ? createdEvent.start
              : start
          }
        />
        <br />
        <label htmlFor="end">Ends at: </label>
        <br />
        <input
          id="end"
          name="end"
          type="text"
          defaultValue={end}
          onChange={(e) => handleChange(e)}
          value={
            createdEvent.end !== undefined ? createdEvent.end : end
          }
        />
        <br />
        <label htmlFor="location">Location: </label>
        <br />
        <input
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
        <br />
        <label htmlFor="description">Description: </label>
        <br />
        <input
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
        <br />
        <Button onBtnClick={(e) => handleSubmit(e)} type="submit">
          Save
        </Button>
      </form>
    </div>
  );
};

export default NewEvent;
