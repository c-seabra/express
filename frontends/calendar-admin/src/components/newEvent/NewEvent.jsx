import React, { useContext, useState } from 'react';

import Button from '../button/Button';
import { DetailsContext } from '../calendar/Context';

const NewEvent = ({ event }) => {
  const { title, description, location } = event;
  const starts_at = event.start;
  const ends_at = event.end;
  const { onCreateEvent } = useContext(DetailsContext);
  const [createdEvent, setCreatedEvent] = useState({});
  const [closePopup, setClosePopup] = useState(false);

  const handleChange = (name, value) => {
    event[name] = value;
    setCreatedEvent(event);
  };

  const handleSubmit = (e) => {
    onCreateEvent(createdEvent, true);
    setClosePopup(true);
  };

  return (
    <div>
      {!closePopup && (
        <form onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="title">Title: </label>
          <br />
          <input
            id="title"
            type="text"
            onChange={(e) => handleChange('title', e.target.value)}
            value={
              createdEvent.title !== undefined ? createdEvent.title : title
            }
          />
          <br />

          <label htmlFor="starts_at">Starts at: </label>
          <br />
          <input
            id="starts_at"
            type="text"
            defaultValue={starts_at}
            onChange={(e) => handleChange('starts_at', e.target.value)}
            value={
              createdEvent.starts_at !== undefined
                ? createdEvent.starts_at
                : starts_at
            }
          />
          <br />

          <label htmlFor="ends_at">Ends at: </label>
          <br />
          <input
            id="ends_at"
            type="text"
            defaultValue={ends_at}
            onChange={(e) => handleChange('ends_at', e.target.value)}
            value={
              createdEvent.ends_at !== undefined
                ? createdEvent.ends_at
                : ends_at
            }
          />
          <br />

          <label htmlFor="location">Location: </label>
          <br />
          <input
            id="location"
            type="text"
            onChange={(e) => handleChange('location', e.target.value)}
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
            type="text"
            onChange={(e) => handleChange('description', e.target.value)}
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
      )}
    </div>
  );
};

export default NewEvent;
