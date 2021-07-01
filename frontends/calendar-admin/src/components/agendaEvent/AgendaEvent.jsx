import React from 'react';

import { DetailsContext } from '../calendar/Context';

const AgendaEvent = ({ event }) => {
  const { onSelectEvent, locations } = React.useContext(DetailsContext);

  let locationName;

  if (event && event.location.type === 'text') {
    locationName = event.location.name;
  } else {
    const eventLocation =
      event &&
      event.location.id &&
      locations.find((confLocation) => confLocation.id === event.location.id);
    locationName = eventLocation && eventLocation.name;
  }

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div onClick={(eClick) => onSelectEvent(event, eClick)}>
      {event && event.title} - {locationName && locationName}
    </div>
  );
};

export default AgendaEvent;
