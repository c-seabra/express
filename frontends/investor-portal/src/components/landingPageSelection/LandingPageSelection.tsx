import { Box, Button, CardActions, CardContent, Typography } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import PersonIcon from '@material-ui/icons/Person'
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications'
import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

const useStyles = makeStyles(() => ({
  grid: {
    maxWidth: 450,
  },
  root: {
    flexGrow: 1,
    margin: 'auto',
    maxWidth: 1000,
  }
}))

const LandingPageSelection = (): ReactElement => {
  const classes = useStyles()

  return (
    <>
      <Helmet>
        <title>Choose your option</title>
      </Helmet>
      <div className={classes.root}>
        <Typography gutterBottom component="h1" variant="h3">
          Investor Portal
        </Typography>
        <Grid container justify="space-between">
          <Grid item xs className={classes.grid} component={Card}>
            <CardContent>
              <Box display="flex" mb={1}>
                <SettingsApplicationsIcon color="secondary" fontSize="large" />
                <Typography component="h2" variant="h5">
                  Conference settings
                </Typography>
              </Box>
              <Typography color="textSecondary" component="p" variant="body2">
                Configure conference settings for investor portal, such as sponsor logo, start/end
                dates etc.
              </Typography>
            </CardContent>
            <CardActions>
              <Button color="primary" component={Link} to="/settings">
                Configure settings
              </Button>
            </CardActions>
          </Grid>
          <Grid item xs className={classes.grid} component={Card}>
            <CardContent>
              <Box display="flex" mb={1}>
                <PersonIcon color="secondary" fontSize="large" />
                <Typography component="h2" variant="h5">
                  Investor settings
                </Typography>
              </Box>
              <Typography color="textSecondary" component="p" variant="body2">
                View list of selecetd investors along with configure options per attendee.
              </Typography>
            </CardContent>
            <CardActions>
              <Button color="primary" component={Link} to="/attendee">
                Configure investor settings
              </Button>
            </CardActions>
          </Grid>
        </Grid>
      </div>
    </>
  )
}

export default LandingPageSelection
