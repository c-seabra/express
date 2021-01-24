import { useQuery } from '@apollo/client'
import { CircularProgress, Typography } from '@material-ui/core'
import React from 'react'
import { Helmet } from 'react-helmet'

import EVENT_QUERY, { EventQuery } from '../../operations/queries/Event'
import { useAppContext } from '../app/AppContext'

const SettingsDashboard: React.FC = () => {
  const { conferenceSlug, token } = useAppContext()

  const { loading, error, data }: EventQuery = useQuery(EVENT_QUERY, {
    context: {
      slug: conferenceSlug,
      token,
    },
  })

  const event = data?.event

  if (loading) {
    return <CircularProgress />
  }

  if (error) {
    return <>{error.message}</>
  }

  return (
    <>
      <Helmet>
        <title>Investor Settings</title>
      </Helmet>
      <Typography component="h3" variant="h5">
        Conference settings
      </Typography>
      <Typography color="textSecondary" component="p" variant="body2">
        Event ID: {event?.id}
      </Typography>
      <Typography color="textSecondary" component="p" variant="body2">
        Event name: {event?.name}
      </Typography>
      <Typography color="textSecondary" component="p" variant="body2">
        Event slug: {event?.slug}
      </Typography>
    </>
  )
}

export default SettingsDashboard
