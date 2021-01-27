import { useMutation, useQuery } from '@apollo/client'
import { Button, CircularProgress } from '@material-ui/core'
import Snackbar from '@material-ui/core/Snackbar'
import TextField from '@material-ui/core/TextField'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'

import EVENT_UPDATE_MUTATION from '../../operations/mutatuions/EventUpdate'
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

  const [defaultStartupSelections, setDefaultStartupSelections] = useState<number | undefined>()
  const [meetingsPerSession, setMeetingsPerSession] = useState<number | undefined>()
  const [sessionDuration, setSessionDuration] = useState<number | undefined>()
  const [requestResponse, setRequestResponse] = useState<{ display: boolean; message: string }>({
    display: false,
    message: '',
  })

  useEffect(() => {
    if (!loading && data) {
      setDefaultStartupSelections(
        data?.event.configuration.investorMeetingsConfigurations.defaultStartupSelections
      )
      setMeetingsPerSession(
        data?.event.configuration.investorMeetingsConfigurations.meetingsPerSession
      )
      setSessionDuration(data?.event.configuration.investorMeetingsConfigurations.sessionDuration)
    }
  }, [loading, data])

  const handleChangeDefaultStartupSelections = (event: { target: { value: string } }) => {
    setDefaultStartupSelections(parseInt(event.target.value, 10))
  }
  const handleChangeMeetingsPerSession = (event: { target: { value: string } }) => {
    setMeetingsPerSession(parseInt(event.target.value, 10))
  }
  const handleChangeSessionDuration = (event: { target: { value: string } }) => {
    setSessionDuration(parseInt(event.target.value, 10))
  }

  const handleOpen = (message: string) => {
    setRequestResponse({ display: true, message })
  }

  const handleClose = () => {
    setRequestResponse({ display: false, message: '' })
  }

  const [eventUpdateMutuation] = useMutation(EVENT_UPDATE_MUTATION, {
    context: {
      slug: conferenceSlug,
      token,
    },
    onCompleted: (res: {
      eventUpdate: { successMessage?: string; userErrors?: [{ message: string }] }
    }) => {
      let message: string
      if (res?.eventUpdate?.userErrors?.length) {
        message = res.eventUpdate.userErrors[0]?.message
        handleOpen(message)
      }
      if (res?.eventUpdate?.successMessage) {
        message = res?.eventUpdate?.successMessage
        handleOpen(message)
      }
    },
    refetchQueries: ['EventQuery'],
    variables: {
      investorMeetingsDefaultStartupSelections: defaultStartupSelections,
      investorMeetingsMeetingsPerSession: meetingsPerSession,
      investorMeetingsSessionDuration: sessionDuration,
    }
  })

  const submitForm = () => {
    eventUpdateMutuation()
  }

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
      <Snackbar
        anchorOrigin={{
          horizontal: 'left',
          vertical: 'bottom',
        }}
        autoHideDuration={5000}
        message={requestResponse.message}
        open={requestResponse.display}
        onClose={handleClose}
      />
      <form noValidate autoComplete="off">
        <TextField
          id="standard-basic"
          label="Default startup selections"
          name="defaultStartupSelections"
          type="number"
          value={defaultStartupSelections}
          onChange={handleChangeDefaultStartupSelections}
        />
        <br />
        <TextField
          id="standard-basic"
          label="Investor session duration (minutes)"
          name="sessionDuration"
          value={sessionDuration}
          onChange={handleChangeSessionDuration}
        />
        <br />
        <TextField
          id="standard-basic"
          label="Startup meetings per investor session"
          name="meetingsPerSession"
          type="number"
          value={meetingsPerSession}
          onChange={handleChangeMeetingsPerSession}
        />
        <br />
        <br />
        <Button color="primary" variant="contained" onClick={submitForm}>
          Update
        </Button>
      </form>
    </>
  )
}

export default SettingsDashboard
