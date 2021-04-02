import stubAttendancesResponse from './stubs/attendancesResponse'
import stubCampaignResponse from './stubs/campaignResponse'
// import stubResponseStatuses from './stubs/responseStatuses'
import stubCreateCampaignResponse from './stubs/createCampaignResponse'
import stubEventsResponse from './stubs/eventsResponse'
import stubLocationsResponse from './stubs/locationsResponse'
import stubNotificationsResponse from './stubs/notificationsResponse'

const CONFIG = {
  production: {
    CALENDAR_URL: 'https://api.cilabs.com',
    AVENGER_URL: 'https://api.cilabs.com',
    NOTIFICATIONS_URL: 'https://api.cilabs.com'
  },
  staging: {
    CALENDAR_URL: 'https://calendar.staging.cluster.cilabs.net',
    AVENGER_URL: 'https://sapi.cilabs.com',
    NOTIFICATIONS_URL: 'http://localhost:3333'
  },
  development: {
    CALENDAR_URL: 'http://localhost:8000',
    AVENGER_URL: 'http://api.lvh.me:3000',
    NOTIFICATIONS_URL: 'http://localhost:3333'
  },
  mock: {
    CALENDAR_URL: '',
    AVENGER_URL: '',
    NOTIFICATIONS_URL: ''
  }
}

const random = () => Math.floor(Math.random() * (2000 - 1000) + 1000)

const handleFetch = async (...args) => {
  const result = {}
  try {
    const response = await fetch(...args)
    response.ok ? result.data = await response.json() : result.error = response.error || await errorMessages(response) || response.statusText || response.status
  } catch (e) {
    result.error = e.message
  }
  return result
}

const errorMessages = async (response) => {
  var result = await response.json()
  var errors = []
  for (var error in result.data) {
    errors.push(result.data[error].message)
  }
  return errors
}

export default {
  getConferenceDetails: async (conferenceId, token, env) => {
    const requestData = {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      })
    }
    console.log('OVER HERE', conferenceId)

    return handleFetch(new Request(`${CONFIG[env].AVENGER_URL}/conferences/${conferenceId}`, requestData))
  },

  getEvents: async (token, env) => {
    // console.log({ getEvents: env })
    if (env === 'mock') {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve({ data: stubEventsResponse })
          // resolve({ error: `random error no: ${random()}` });
        }, random())
      })
    }
    const requestData = {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      })
    }
    return handleFetch(new Request(`${CONFIG[env].CALENDAR_URL}/calendar_events/`, requestData))
  },

  deleteEvent: async (calendar_event_id, token, env) => {
    if (env === 'mock') {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve({ data: stubEventsResponse })
          // resolve({ error: `random error no: ${random()}` });
        }, random())
      })
    }

    const requestData = {
      method: 'DELETE',
      headers: new Headers({
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      })
    }
    return handleFetch(new Request(`${CONFIG[env].CALENDAR_URL}/calendar_events/${calendar_event_id}`, requestData))
  },

  updateEvent: async (calendar_event_id, content_update, token, env) => {
    if (env === 'mock') {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve({ data: stubEventsResponse })
          // resolve({ error: `random error no: ${random()}` });
        }, random())
      });
    }

    const requestData = {
      method: 'PUT',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }),
      body: JSON.stringify({ calendar_event: content_update })
    }
    return handleFetch(new Request(`${CONFIG[env].CALENDAR_URL}/calendar_events/${calendar_event_id}`, requestData))
  },

  updateEventInvitationResponse: async (calendar_event_id, invitation_id, response, token, env) => {
    if (env === 'mock') {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve({ data: stubEventsResponse })
          // resolve({ error: `random error no: ${random()}` });
        }, random())
      });
    }

    const requestData = {
      method: 'PUT',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }),
      body: JSON.stringify({ response: { response_status: response } })
    }
    const requestUrl = `${CONFIG[env].CALENDAR_URL}/calendar_events/${calendar_event_id}/invitations/${invitation_id}/response`
    return handleFetch(new Request(requestUrl, requestData))
  },

  deleteEventInvitation: async (calendar_event_id, invitation_id, token, env) => {
    if (env === 'mock') {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve({ data: stubEventsResponse })
          // resolve({ error: `random error no: ${random()}` });
        }, random())
      });
    }

    const requestData = {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }),
    }
    const requestUrl = `${CONFIG[env].CALENDAR_URL}/calendar_events/${calendar_event_id}/invitations/${invitation_id}`
    return handleFetch(new Request(requestUrl, requestData))
  },

  getLocation: async (locationId, conferenceSlug, env) => {
    if (env === 'mock') {
      const location = stubLocationsResponse.data.find(location => location.id === locationId)
      return new Promise(resolve => {
        setTimeout(() => {
          resolve({ data: location })
          // resolve({ error: `random error no: ${random()}` });
        }, random())
      })
    }
    return handleFetch(`${CONFIG[env].AVENGER_URL}/conferences/${conferenceSlug}/locations/${locationId}`)
  },

  getLocations: async (conferenceSlug, env) => {
    if (env === 'mock') {
      const locations = stubLocationsResponse.data
      return new Promise(resolve => {
        setTimeout(() => {
          resolve({ data: locations })
          // resolve({ error: `random error no: ${random()}` });
        }, random())
      })
    }
    return handleFetch(`${CONFIG[env].AVENGER_URL}/conferences/${conferenceSlug}/locations/`)
  },

  getAttendance: async (attendanceId, conferenceSlug, token, env) => {
    if (env === 'mock') {
      const att = stubAttendancesResponse.data.find(att => att.id === attendanceId)
      return new Promise(resolve => {
        setTimeout(() => {
          resolve({ data: att })
          // resolve({ error: `random error no: ${random()}` });
        }, random())
      })
    }
    const requestData = {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      })
    }
    const requestUrl = `${CONFIG[env].AVENGER_URL}/conferences/${conferenceSlug}/attendances/${attendanceId}`
    return handleFetch(new Request(requestUrl, requestData))
  },

  getResponseStatuses: async (env) => {
    if (env === 'mock') {
      const responseStatuses = responseStatuses.data
      return new Promise(resolve => {
        setTimeout(() => {
          resolve({ response_statuses: responseStatuses })
          // resolve({ error: `random error no: ${random()}` });
        }, random())
      })
    }
    return handleFetch(`${CONFIG[env].CALENDAR_URL}/response_statuses`)
  },

  createCampaign: async (token, env, campaignParams) => {
    if (env === 'mock') {
      const campaignResponse = stubCreateCampaignResponse.data
      return new Promise(resolve => {
        setTimeout(() => {
          resolve({ data: campaignResponse }, random())
        })
      })
    }

    const requestData = {
      method: 'POST',
      headers: new Headers({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      body: JSON.stringify(campaignParams)
    }
    return handleFetch(new Request(`${CONFIG[env].NOTIFICATIONS_URL}/campaigns`, requestData))
  },

  updateCampaign: async (token, env, campaignId, campaignParams) => {
    const requestData = {
      method: 'PATCH',
      headers: new Headers({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      body: JSON.stringify(campaignParams)
    }
    console.log('update')
    console.log(requestData)
    return handleFetch(new Request(`${CONFIG[env].NOTIFICATIONS_URL}/campaigns/${campaignId}`, requestData))
  },

  getCampaign: async (campaignId, env, token) => {
    const requestData = {
      method: 'GET',
      headers: new Headers({
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      })
    }
    return handleFetch(new Request(`${CONFIG[env].NOTIFICATIONS_URL}/campaigns/${campaignId}`, requestData))
  },

  cancelCampaign: async (token, env, campaignId) => {
    const requestData = {
      method: 'DELETE',
      headers: new Headers({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    }
    return handleFetch(new Request(`${CONFIG[env].NOTIFICATIONS_URL}/campaigns/${campaignId}`, requestData))
  },

  getNotificationsData: async (token, viewType, conferenceId, env, params) => {
    // console.log('PARAMS', token)

    if (env === 'mock') {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve({ data: viewType === 'campaigns' ? stubCampaignResponse : stubNotificationsResponse })
          // resolve({ error: `random error no: ${random()}` });
        }, random())
      })
    }
    const requestData = {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      })
    }

    const requestUrl = `http://localhost:3333/${viewType}/?conference_id=${conferenceId}&page=${params.page}&pageSize=${params.pageSize}`
    return handleFetch(new Request(requestUrl, requestData))
  }
}
