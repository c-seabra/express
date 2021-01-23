import jwt from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import withApollo from '../../lib/apollo/withApollo'
import AttendeeControlPanel from '../attendeeControlPanel/AttendeeControlPanel'
import LandingPageSelection from '../landingPageSelection/LandingPageSelection'
import SettingsDashboard from '../settingsDashboard/SettingsDashboard'

const App = ({ token }: { token: string }) => {
  const [conferenceSlug, setConferenceSlug] = useState<string>()
  const tokenPayload: { conf_slug: string; email: string } = jwt(token) as {
    conf_slug: string
    email: string
  }

  useEffect(() => {
    setConferenceSlug(tokenPayload.conf_slug)
  }, [token, tokenPayload.conf_slug])

  if (!token) return null

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <LandingPageSelection />
        </Route>
        <Route path="/settings">
          {conferenceSlug}
          <SettingsDashboard />
        </Route>
        <Route path="/attendee">
          <AttendeeControlPanel />
        </Route>
      </Switch>
    </Router>
  )
}

export default withApollo(App)
