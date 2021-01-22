import jwt from 'jwt-decode'
import React, { useEffect, useState } from 'react'

import withApollo from '../../lib/apollo/withApollo'

const App = ({ token }: { token: string }) => {
  const [conferenceSlug, setConferenceSlug] = useState<string>()
  if (!token) return null
  const tokenPayload: { conf_slug: string; email: string } = jwt(token) as {
    conf_slug: string
    email: string
  }

  useEffect(() => {
    setConferenceSlug(tokenPayload.conf_slug)
  }, [token, tokenPayload.conf_slug])


  return <div>{conferenceSlug} Starter app</div>
}

export default withApollo(App)
