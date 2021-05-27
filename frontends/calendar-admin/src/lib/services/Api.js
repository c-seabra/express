import stubAttendancesResponse from './stubs/attendancesResponse';
import stubEventsResponse from './stubs/eventsResponse';
import stubLocationsResponse from './stubs/locationsResponse';
import stubResponseStatuses from './stubs/responseStatuses';

const CONFIG = {
  development: {
    AVENGER_URL: 'http://api.lvh.me:3000',
    CALENDAR_URL: 'http://localhost:8000',
  },
  mock: {
    AVENGER_URL: '',
    CALENDAR_URL: '',
  },
  production: {
    AVENGER_URL: 'https://api.cilabs.com',
    CALENDAR_URL: 'http://calendar.calendar.svc.cluster.local:80',
  },
  staging: {
    AVENGER_URL: 'https://sapi.cilabs.com',
    CALENDAR_URL: 'https://calendar.staging.cluster.cilabs.net',
  },
};

const random = () => Math.floor(Math.random() * (2000 - 1000) + 1000);

const errorMessages = async (response) => {
  const result = await response.json();
  if (typeof result.data === 'string') {
    return result.data;
  }
  const errors = [];
  /* eslint-disable */
  for (const error in result.data) {
    errors.push(result.data[error].message);
  }
  /* eslint-disable */
  return errors;
};

const handleFetch = async (...args) => {
  const result = {};
  try {
    const response = await fetch(...args);
    if (response.ok) {
      const text = await response.text();
      result.data = text.length ? JSON.parse(text) : undefined;
    } else {
      result.error =
        response.error ||
        (await errorMessages(response)) ||
        response.statusText ||
        response.status;
    }
  } catch (e) {
    result.error = e.message;
  }
  return result;
};

export function withConfig({ token: _token, env: _env } = {}) {
  // console.log(arguments);
  return {
    deleteEvent: async (
      calendar_event_id,
      token = String(_token),
      env = _env,
    ) => {
      if (env === 'mock') {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({ data: stubEventsResponse });
            // resolve({ error: `random error no: ${random()}` });
          }, random());
        });
      }

      const requestData = {
        headers: new Headers({
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        }),
        method: 'DELETE',
      };
      return handleFetch(
        new Request(
          `${String(CONFIG[env].CALENDAR_URL)}/calendar_events/${String(
            calendar_event_id,
          )}`,
          requestData,
        ),
      );
    },

    deleteEventInvitation: async (
      calendar_event_id,
      invitation_id,
      token = String(_token),
      env = _env,
    ) => {
      if (env === 'mock') {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({ data: stubEventsResponse });
            // resolve({ error: `random error no: ${random()}` });
          }, random());
        });
      }

      const requestData = {
        headers: new Headers({
          Accept: 'application/json',
          Authorization: `BIXSCANearer ${token}`,
          'Content-Type': 'application/json',
        }),
        method: 'DELETE',
      };
      const requestUrl = `${String(
        CONFIG[env].CALENDAR_URL,
      )}/calendar_events/${String(calendar_event_id)}/invitations/${String(
        invitation_id,
      )}`;
      return handleFetch(new Request(requestUrl, requestData));
    },

    getAdminEvents: async (
      attendancesArray,
      token = String(_token),
      env = _env,
    ) => {
      if (env === 'mock') {
        const att = stubAttendancesResponse.data.find(
          (mockAtt) => mockAtt.id === attendanceId,
        );
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({ data: att });
            // resolve({ error: `random error no: ${random()}` });
          }, random());
        });
      }
      const requestData = {
        headers: new Headers({
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        }),
        method: 'GET',
      };

      const requestUrl = `${String(
        CONFIG[env].CALENDAR_URL,
      )}/admin_calendar_events/?attendances[]=${attendancesArray.join(
        '&attendances[]=',
      )}`;
      return handleFetch(new Request(requestUrl, requestData));
    },

    getAttendance: async (
      attendanceId,
      slug,
      token = String(_token),
      env = _env,
    ) => {
      if (env === 'mock') {
        const att = stubAttendancesResponse.data.find(
          (mockAtt) => mockAtt.id === attendanceId,
        );
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({ data: att });
            // resolve({ error: `random error no: ${random()}` });
          }, random());
        });
      }
      const requestData = {
        headers: new Headers({
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        }),
        method: 'GET',
      };
      const requestUrl = `${String(
        CONFIG[env].AVENGER_URL,
      )}/conferences/${String(slug)}/attendances/${String(attendanceId)}`;
      return handleFetch(new Request(requestUrl, requestData));
    },

    getConferenceDetails: async (
      conferenceId,
      token = String(_token),
      env = _env,
    ) => {
      const requestData = {
        headers: new Headers({
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        }),
        method: 'GET',
      };
      return handleFetch(
        new Request(
          `${String(CONFIG[env].AVENGER_URL)}/conferences/${String(
            conferenceId,
          )}`,
          requestData,
        ),
      );
    },

    getEvents: async (token = String(_token), env = _env) => {
      // console.log({ getEvents: env })
      if (env === 'mock') {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({ data: stubEventsResponse });
            // resolve({ error: `random error no: ${random()}` });
          }, random());
        });
      }
      const requestData = {
        headers: new Headers({
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        }),
        method: 'GET',
      };
      return handleFetch(
        new Request(
          `${String(CONFIG[env].CALENDAR_URL)}/calendar_events/`,
          requestData,
        ),
      );
    },

    getLocation: async (locationId, slug, env = _env) => {
      if (env === 'mock') {
        const location = stubLocationsResponse.data.find(
          (mockLocation) => mockLocation.id === locationId,
        );
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({ data: location });
            // resolve({ error: `random error no: ${random()}` });
          }, random());
        });
      }
      return handleFetch(
        `${String(CONFIG[env].AVENGER_URL)}/conferences/${String(
          slug,
        )}/locations/${String(locationId)}`,
      );
    },

    getLocations: async (slug, env = _env) => {
      if (env === 'mock') {
        const locations = stubLocationsResponse.data;
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({ data: locations });
            // resolve({ error: `random error no: ${random()}` });
          }, random());
        });
      }
      return handleFetch(
        `${String(CONFIG[env].AVENGER_URL)}/conferences/${String(
          slug,
        )}/locations/`,
      );
    },

    getResponseStatuses: async (env = _env) => {
      if (env === 'mock') {
        const responseStatuses = stubResponseStatuses.data;
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({ response_statuses: responseStatuses });
            // resolve({ error: `random error no: ${random()}` });
          }, random());
        });
      }
      return handleFetch(
        `${String(CONFIG[env].CALENDAR_URL)}/response_statuses`,
      );
    },

    updateEvent: async (
      calendar_event_id,
      content_update,
      token = String(_token),
      env = _env,
    ) => {
      if (env === 'mock') {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({ data: stubEventsResponse });
            // resolve({ error: `random error no: ${random()}` });
          }, random());
        });
      }

      const requestData = {
        body: JSON.stringify({ calendar_event: content_update }),
        headers: new Headers({
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }),
        method: 'PUT',
      };
      return handleFetch(
        new Request(
          `${String(CONFIG[env].CALENDAR_URL)}/calendar_events/${String(
            calendar_event_id,
          )}`,
          requestData,
        ),
      );
    },

    updateEventInvitationResponse: async (
      calendar_event_id,
      invitation_id,
      response,
      token = String(_token),
      env = _env,
    ) => {
      if (env === 'mock') {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({ data: stubEventsResponse });
            // resolve({ error: `random error no: ${random()}` });
          }, random());
        });
      }

      const requestData = {
        body: JSON.stringify({ response: { response_status: response } }),
        headers: new Headers({
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }),
        method: 'PUT',
      };
      const requestUrl = `${String(
        CONFIG[env].CALENDAR_URL,
      )}/calendar_events/${String(calendar_event_id)}/invitations/${String(
        invitation_id,
      )}/response`;
      return handleFetch(new Request(requestUrl, requestData));
    },
  };
}

export default withConfig();
