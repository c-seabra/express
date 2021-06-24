import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import './Calendar.css';

import {
  HTTP_ERROR_MESSAGES,
  HTTP_RESPONSE,
} from '../../lib/services/httpResponseStatic';
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
  const { attendances, colors } = useContext(AppContext);
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
  const [formats, setFormats] = useState();
  const [rsvps, setRsvps] = useState([]);
  // const [payload, setPayload] = useState()
  const [confSlug, setConfSlug] = useState();
  // const [conference, setConference] = useState()
  const [chosenDate, setChosenDate] = useState();
  const [currentUserId, setCurrentUserId] = useState();
  const [responseStatuses, setResponseStatuses] = useState();
  const [timezone, setTimezone] = useState();

  const normalizeError = (error, status) => {
    let _error = error;

    if (!_error || !_error.length ) {
      _error = HTTP_ERROR_MESSAGES.SERVER_ERR;

      if (status === HTTP_RESPONSE.NOT_FOUND) {
        _error = HTTP_ERROR_MESSAGES.NOT_FOUND;
      }
    }

    return _error;
  };

  const addError = (error, status) => {
    let _error = error;

    if (!Array.isArray(_error)) {
      _error = normalizeError(_error, status)
    }

    if (Array.isArray(error) && error.length) {
      _error = error
        .map((item) => normalizeError(error, status))
        .filter((val) => val);
    }

    if (_error && _error.length) {
      setErrors((prevState) => prevState.concat([_error]));
    }
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

  const getAdminEvents = async () => {
    const eventsResults = await Api.getAdminEvents(
      attendancesArray,
      token,
      env,
    );
    if (eventsResults.data) {
      let eventRes = [];
      eventsResults.data.data.forEach((e) => {
        e.calendar_events.forEach((i) => {
          i.attendance_id = e.id;
        });
        eventRes.push(...e.calendar_events);
      });

      eventRes = eventRes.map((e) => {
        const offsetString = moment(e.starts_at).tz(timezone, true).format();
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
      addError(eventsResults.error, eventsResults.status);
    }
  };

  const getRequiredData = async (payload) => {
    const confResult = await Api.getConferenceDetails(
      payload.conf_id,
      token,
      env,
    );
    if (confResult.data) {
      setChosenDate(new Date(confResult.data.data.start_date));
      setTimezone(confResult.data.data.timezone);
    } else {
      addError(confResult.error, confResult.status);
    }
    if (attendancesArray.length > 0) {
      await getAdminEvents();
    } else {
      setEvents([]);
    }

    const locationsResult = await Api.getLocations(payload.conf_slug, env);
    locationsResult.data
      ? setLocations(locationsResult.data.data)
      : addError(locationsResult.error, locationsResult.status);

    const responseStatusesResult = await Api.getResponseStatuses(env);
    responseStatusesResult.data
      ? setResponseStatuses(responseStatusesResult.data.data)
      : addError(responseStatusesResult.error, responseStatusesResult.status);

    const formatsResult = await Api.getEventFormats(token, env);
    if (formatsResult.data) {
      const privateFormats = formatsResult.data.data.filter((f) =>
        f.category === 'private' ? f : null,
      );
      setFormats(privateFormats);
    } else {
      addError(formatsResult.error, formatsResult.status);
    }
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
        : addError(result.error, result.status);
    });
  };

  const onSelectEvent = (e, syntheticEvent) => {
    if (e.invited_by_admin === true) {
      // don't do anything if already doing
      if (newEvent || existingEvent) return;
      // keep the click data
      syntheticEvent.persist();
      e.syntheticEvent = syntheticEvent;

      getRSVPSDetails(e.invitations);

      // meanwhile render
      setExistingEvent(e);
    }
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
    !result.data && addError(result.error, result.status);
  };

  const onDeleteEventInvitation = async (eventId, invitationId) => {
    // find event to update
    const eventToUpdateIndex = events.findIndex(
      (event) => event.id === eventId,
    );
    const eventToUpdate = events[eventToUpdateIndex];
    const rsvpToDeleteIndex = rsvps.findIndex(
      (rsvp) => rsvp.invitation.id === invitationId,
    );
    const updatedRsvps = update(rsvps, {
      $splice: [[rsvpToDeleteIndex, 1]],
    });

    setRsvps(updatedRsvps);
    // update existing event
    setExistingEvent(eventToUpdate);

    // update response status in API
    await Api.deleteEventInvitation(eventToUpdate.id, invitationId, token, env);
    await getAdminEvents();
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

    if (eventContent.ends_at) {
      eventContent.ends_at = moment(eventContent.ends_at)
        .tz(timezone, true)
        .format();
    }
    if (eventContent.starts_at) {
      eventContent.starts_at = moment(eventContent.starts_at)
        .tz(timezone, true)
        .format();
    }
    eventContent.reset_response_status = false;
    // update it in the API
    const result = await Api.updateEvent(eventId, eventContent, token, env);
    result.data
      ? setEvents(updatedEvents)
      : addError(result.error, result.status);
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

  const titleAccessor = (e) => {
    if (!e.invited_by_admin) return 'Private Event';
    return `${e.title}`;
  };

  const startAccessor = (e) => moment(e.starts_at).toDate();

  const endAccessor = (e) => moment(e.ends_at).toDate();

  const eventPropGetter = (e) => {
    const style = {};
    style.backgroundColor = colors.find(
      (c) => c.id === e.attendance_id,
    )?.colorHash;
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

  const getAttendance = async (invitee_id) => {
    const result = await Api.getAttendance(
      invitee_id,
      confSlug,
      currentToken,
      env,
    );
    result.data
      ? addRsvp({ attendance: result.data, invitation: {} })
      : addError(result.error, result.status);
  };

  const onCreateEventInvitation = async (event_id, invitee_id) => {
    const invitation = {
      calendar_event_id: event_id,
      invitee: {
        id: invitee_id,
        type: 'attendance',
      },
      response_status: 'accepted',
    };

    await Api.createEventInvitation(event_id, invitation, token, env);
    await getAdminEvents();
  };

  const onCreateEvent = async (event) => {
    const tokenPayload = jwt(token);
    if (attendancesArray.length > 0) {
      setNewEvent(event);
      if (event.title) {
        await Api.createEvent(
          attendancesArray,
          moment(event.end).tz(timezone, true).format(),
          moment(event.start).tz(timezone, true).format(),
          event.title,
          event.description,
          event.location,
          event.location_id,
          event.event_format_id,
          token,
          tokenPayload.conf_id,
          env,
        );
        await getAdminEvents();
      }
    }
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
          getAttendance,
          locations,
          onCreateEvent,
          onCreateEventInvitation,
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
          formats={formats}
          handleOnClick={() => cleanupData()}
          locations={locations}
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
          localizer={localizer}
          max={moment('2000-01-01T23:00:00.000Z').toDate()}
          min={moment('2000-01-01T01:00:00.000Z').toDate()}
          startAccessor={startAccessor}
          style={{ fontSize: '14px', height: '100vh' }}
          titleAccessor={titleAccessor}
          tooltipAccessor={tooltipAccessor}
          view={currentView}
          onDrillDown={onDrillDown}
          onEventDrop={moveEvent}
          onEventResize={resizeEvent}
          onNavigate={onNavigate}
          onSelectEvent={onSelectEvent}
          onSelectSlot={onCreateEvent}
          onView={onView}
        />
      </DetailsContext.Provider>
    </>
  );
};

export default Calendar;
