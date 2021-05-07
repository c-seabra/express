import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import './Calendar.css';

import update from 'immutability-helper';
import jwt from 'jwt-decode';
import moment from 'moment-timezone';
import React, { useContext, useEffect, useState } from 'react';
import * as BigCalendar from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';

import Api from '../../lib/services/Api';
import AgendaEvent from '../agendaEvent/AgendaEvent';
import AppContext from '../app/AppContext';
import Error from '../error/Error';
import Popup from '../popup/Popup';
import { DetailsContext } from './Context';

const DragAndDropCalendar = withDragAndDrop(BigCalendar.Calendar);
const localizer = BigCalendar.momentLocalizer(moment);

const Calendar = ({ token, env }) => {
  const { attendances } = useContext(AppContext);
  const attendancesArray = attendances.map((att) => {
    return att.id;
  });
  if (!token) return null;
  // console.log({ token, env });
  // const [ENV, setENV] = useState();
  const [currentToken, setCurrentToken] = useState();
  const [currentView, setCurrentView] = useState(BigCalendar.Views.WEEK);
  const [events, setEvents] = useState([]);
  const [errors, setErrors] = useState([]);
  const [newEvent, setNewEvent] = useState();
  const [existingEvent, setExistingEvent] = useState();
  const [locations, setLocations] = useState();
  const [rsvps, setRsvps] = useState([]);
  // const [payload, setPayload] = useState()
  const [confSlug, setConfSlug] = useState();
  // const [conference, setConference] = useState()
  const [chosenDate, setChosenDate] = useState();
  const [currentUserId, setCurrentUserId] = useState();
  const [responseStatuses, setResponseStatuses] = useState();

  const addError = (error) => {
    setErrors((errors) => errors.concat([error]));
  };

  useEffect(() => {
    const tokenPayload = jwt(token);
    try {
      setCurrentToken(token); // use token or currentToken, not both (below)
      // setPayload(tokenPayload)
      getRequiredData(tokenPayload);

      setCurrentUserId(tokenPayload.sub);
      // setENV(env)
      setConfSlug(tokenPayload.conf_slug);
      // getAllLocationsDetails(tokenPayload.conf_slug)
      // getAllCalendarEvents(token)
    } catch (e) {
      addError(e);
    }
  }, [attendances, token]);

  const getRequiredData = async (payload) => {
    const confResult = await Api.getConferenceDetails(
      payload.conf_id,
      token,
      env,
    );
    confResult.data
      ? setChosenDate(new Date(confResult.data.data.start_date))
      : addError(confResult.error);

    if (attendancesArray.length > 0) {
      const eventsResults = await Api.getAdminEvents(
        attendancesArray,
        token,
        env,
      );
      if (eventsResults.data) {
        let eventRes = [];
        eventsResults.data.data.map((e) => eventRes.push(...e.calendar_events));

        eventRes = eventRes.map((e) => {
          const offsetString = moment(e.starts_at)
            .tz(confResult.data.data.timezone, true)
            .format();
          e.starts_at = moment(e.starts_at)
            .utcOffset(offsetString)
            .format('YYYY-MM-DDTHH:mm');
          e.ends_at = moment(e.ends_at)
            .utcOffset(offsetString)
            .format('YYYY-MM-DDTHH:mm');
          return e;
        });
        setEvents(eventRes);
      } else {
        addError(eventsResults.error);
      }
    } else {
      setEvents([]);
    }

    const locationsResult = await Api.getLocations(payload.conf_slug, env);
    locationsResult.data
      ? setLocations(locationsResult.data.data)
      : addError(locationsResult.error);

    const responseStatusesResult = await Api.getResponseStatuses(env);
    responseStatusesResult.data
      ? setResponseStatuses(responseStatusesResult.data.data)
      : addError(responseStatusesResult.error);
  };

  const addRsvp = (rsvp) => {
    setRsvps((rsvps) => rsvps.concat([rsvp]));
  };

  // const getAllCalendarEvents = async (token) => {
  //   const result = await Api.getEvents(token, env)
  //   result.data ? setEvents(result.data.data) : addError(result.error)
  // }

  // const getLocationDetails = async (location) => {
  //   const result = await Api.getLocation(location.id, conf_slug, env)
  //   result.data ? setLocation(result.data.data) : addError(result.error)
  // }

  // const getAllLocationsDetails = async (conf_slug) => {
  //   const result = await Api.getLocations(conf_slug, env)
  //   result.data ? setLocations(result.data.data) : addError(result.error)
  // }

  const getRSVPSDetails = async (invitations) => {
    invitations.forEach(async (invitation) => {
      const result = await Api.getAttendance(
        invitation.invitee.id,
        confSlug,
        currentToken,
        env,
      );
      result.data
        ? addRsvp({ attendance: result.data, invitation })
        : addError(result.error);
    });
  };

  const onSelectEvent = (e, syntheticEvent) => {
    // don't do anything if already doing
    if (newEvent || existingEvent) return;
    // keep the click data
    syntheticEvent.persist();
    e.syntheticEvent = syntheticEvent;

    getRSVPSDetails(e.invitations);

    // meanwhile render
    setExistingEvent(e);
  };

  const onUpdateEventInvitationResponse = async (eventId, response) => {
    // find current user invitation ID
    const currentEventIndex = events.findIndex((event) => event.id === eventId);
    const currentEvent = events[currentEventIndex];
    const currentUserInvitationIndex = currentEvent.invitations.findIndex(
      (invitation) => invitation.invitee.id === currentUserId,
    );
    const currentUserInvitation =
      currentEvent.invitations[currentUserInvitationIndex];
    const currentUserRsvpIndex = rsvps.findIndex(
      (rsvp) => rsvp.invitation.invitee.id === currentUserId,
    );
    const currentUserRsvp = rsvps[currentUserRsvpIndex];

    if (currentUserInvitationIndex === -1) return null;

    const updatedRsvp = update(currentUserRsvp, {
      invitation: {
        response: {
          response_status: { $set: response },
        },
      },
    });
    const updatedRsvps = update(rsvps, {
      [currentUserRsvpIndex]: { $set: updatedRsvp },
    });

    const updatedEvent = update(currentEvent, {
      invitations: {
        [currentUserInvitationIndex]: {
          response: {
            response_status: { $set: response },
          },
        },
      },
    });
    const updatedEvents = update(events, {
      [currentEventIndex]: { $set: updatedEvent },
    });

    setRsvps(updatedRsvps);
    setExistingEvent(updatedEvent);
    setEvents(updatedEvents);

    // update response status in API
    const result = await Api.updateEventInvitationResponse(
      eventId,
      currentUserInvitation.id,
      response,
      token,
      env,
    );
    !result.data && addError(result.error);
  };

  const onDeleteEventInvitation = async (eventId, invitationId) => {
    // find event to update
    const eventToUpdateIndex = events.findIndex(
      (event) => event.id === eventId,
    );
    const eventToUpdate = events[eventToUpdateIndex];
    const invitationToDeleteIndex = eventToUpdate.invitations.findIndex(
      (invitation) => invitation.id === invitationId,
    );
    const rsvpToDeleteIndex = rsvps.findIndex(
      (rsvp) => rsvp.invitation.id === invitationId,
    );

    const updatedEvent = update(eventToUpdate, {
      invitations: { $splice: [[invitationToDeleteIndex, 1]] },
    });
    const updatedEvents = update(events, {
      [eventToUpdateIndex]: { $set: updatedEvent },
    });
    const updatedRsvps = update(rsvps, {
      $splice: [[rsvpToDeleteIndex, 1]],
    });

    setRsvps(updatedRsvps);
    // update existing event
    setExistingEvent(eventToUpdate);

    // update response status in API
    const result = await Api.deleteEventInvitation(
      eventToUpdate.id,
      invitationId,
      token,
      env,
    );
    result.data ? setEvents(updatedEvents) : addError(result.error);
  };

  const onUpdateEvent = async (eventId, eventContent) => {
    const eventToUpdateindex = events.findIndex(
      (event) => event.id === eventId,
    );

    // update eventContent object to fit existingEvent layout
    // API only accepts location_id or location_name
    // existingEvent however has location object with type and id/name
    if (eventContent.location_id || eventContent.location_name) {
      eventContent.location = {};
      eventContent.location.type = eventContent.location_id
        ? 'location'
        : 'text';
      eventContent.location[eventContent.location_id ? 'id' : 'name'] =
        eventContent.location_id || eventContent.location_name;
    }

    const updatedExistingEvent = update(existingEvent, {
      $merge: eventContent,
    });

    setExistingEvent(updatedExistingEvent);

    // update events list
    const updatedEvents = update(events, {
      [eventToUpdateindex]: { $set: updatedExistingEvent },
    });

    // update it in the API
    const result = await Api.updateEvent(eventId, eventContent, token, env);
    result.data ? setEvents(updatedEvents) : addError(result.error);
  };

  const onDeleteEvent = (eventId) => {
    const deleteEventIndex = events.findIndex((event) => event.id === eventId);
    const updatedEvents = update(events, {
      [deleteEventIndex]: {
        saved: { $set: false },
      },
    });

    Api.deleteEvent(eventId, token, env);
    cleanupData(updatedEvents);
  };

  const onView = (v) => {
    cleanupData();
    setCurrentView(v);
  };

  const onNavigate = (when) => {
    // console.log({onNavigate: when})
    setChosenDate(new Date(when));
  };

  const onDrillDown = (d) => setCurrentView(BigCalendar.Views.DAY);

  const tooltipAccessor = (e) =>
    `${e.title} -> ${e.starts_at} + ${e.description || ''}`;

  const startAccessor = (e) => moment(e.starts_at).toDate();

  const endAccessor = (e) => moment(e.ends_at).toDate();

  const eventPropGetter = (e) => {
    const style = {};
    if (e.allDay === true) {
      style.backgroundColor = 'orange';
    }
    if (e.saved === false) {
      style.border = '2px solid red';
      style.zIndex = 6;
    }
    if (e.pin_id) {
      style.backgroundColor = 'green';
    }
    if (e.invited_by_admin) {
      style.backgroundColor = 'purple';
    }
    return { style };
  };

  const moveEvent = ({ event, start, end, isAllDay: droppedOnAllDaySlot }) => {
    // don't do anything if already doing
    if (newEvent || existingEvent) return;

    const idx = events.indexOf(event);
    let { allDay } = event;

    if (!event.allDay && droppedOnAllDaySlot) {
      allDay = true;
    } else if (event.allDay && !droppedOnAllDaySlot) {
      allDay = false;
    }

    const updatedEvent = { ...event, allDay };
    updatedEvent.starts_at = start;
    updatedEvent.ends_at = end;
    const nextEvents = [...events];
    nextEvents.splice(idx, 1, updatedEvent);
    setEvents(nextEvents);
    // console.log(`${updatedEvent.id} was dropped onto ${updatedEvent.starts_at}`)
  };

  const resizeEvent = ({ event, start, end }) => {
    const starts_at = start;
    const ends_at = end;
    const nextEvents = events.map((existingEvent) =>
      existingEvent.id === event.id
        ? { ...existingEvent, ends_at, starts_at }
        : existingEvent,
    );
    setEvents(nextEvents);
  };

  const createEvent = (event) => {
    const newEvent = {
      allDay: event.slots.length === 1,
      ends_at: event.end,
      event,
      id: events.length + 1,
      saved: false,
      starts_at: event.start,
      title: 'New Event',
    };
    const updatedEvents = events.concat([newEvent]);
    setEvents(updatedEvents);
    setNewEvent(newEvent);
  };

  const cleanupData = (newEvents = events) => {
    setEvents(newEvents.filter((event) => event.saved !== false));
    setNewEvent();
    setExistingEvent();
    setRsvps([]);
  };

  const components = {
    agenda: {
      event: AgendaEvent, // with the agenda view use a different component to render events
    },
  };

  return (
    <>
      {/* binding DetailsContext value with location AND rsvps from context */}
      <DetailsContext.Provider
        value={{
          confSlug,
          currentUserId,
          events,
          locations,
          onDeleteEvent,
          onDeleteEventInvitation,
          onSelectEvent,
          onUpdateEvent,
          onUpdateEventInvitationResponse,
          responseStatuses,
          rsvps,
        }}
      >
        <Error errors={errors} />
        <Popup
          existingEvent={existingEvent}
          handleOnClick={() => cleanupData()}
          newEvent={newEvent}
        />
        <DragAndDropCalendar
          popup
          selectable
          components={components}
          date={chosenDate}
          defaultView={BigCalendar.Views.WEEK}
          endAccessor={endAccessor}
          eventPropGetter={eventPropGetter}
          events={events}
          getNow={() => moment().toDate()}
          length={60}
          localizer={localizer}
          max={moment('2000-01-01T23:00:00.000Z').toDate()}
          min={moment('2000-01-01T01:00:00.000Z').toDate()}
          startAccessor={startAccessor}
          step={60}
          style={{ fontSize: '14px', height: '100vh' }}
          timeslots={1}
          titleAccessor="title"
          tooltipAccessor={tooltipAccessor}
          view={currentView}
          onDrillDown={onDrillDown}
          onEventDrop={moveEvent}
          onEventResize={resizeEvent}
          onNavigate={onNavigate}
          onSelectEvent={onSelectEvent}
          onSelectSlot={createEvent}
          onView={onView}
        />
      </DetailsContext.Provider>
    </>
  );
};

export default Calendar;
