import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'

import { Button, ContainerCard } from '../../lib/components'
import Breadcrumbs, { Breadcrumb } from '../../lib/components/molecules/Breadcrumbs'
import LabeledFileInput from '../../lib/components/molecules/LabeledFileInput'
import LabeledInput from '../../lib/components/molecules/LabeledInput'
import { useEventQuery, useEventUpdateMutation } from '../../lib/hooks'
import Loader from '../../lib/Loading'
import Warning from '../settingsActions/Warning'
import InvestorSessionsCreateForm from './InvestorSessionsCreateForm'
import SessionsSummary from './SessionsSummary'
import {
  BreadcrumbsContainer,
  ConfigurationPanel,
  FormArea,
  PageContainer,
  SpacingBottom,
  SponsorLogo,
} from './SettingsDashboard.styled'

const SettingsDashboard: React.FC = () => {
  const [defaultStartupSelections, setDefaultStartupSelections] = useState<number>()
  const [eventTimezone, setEventTimezone] = useState<string>('Europe/Dublin')
  const [sponsorLogo, setSponsorLogo] = useState<File | undefined>()
  const [meetingsPerSession, setMeetingsPerSession] = useState<number | undefined>()
  const [sessionDuration, setSessionDuration] = useState<number | undefined>()
  const [sponsorLogoUrl, setSponsorLogoUrl] = useState<string | undefined>()
  const [startupPortalOpeningAt, setStartupPortalOpeningAt] = useState<string | undefined>()
  const [startupPortalClosingAt, setStartupPortalClosingAt] = useState<string | undefined>()
  const [startupSelectionDeadline, setStartupSelectionDeadline] = useState<string | undefined>()

  const handleUpload = (uploadedFile?: File) => {
    setSponsorLogoUrl(URL.createObjectURL(uploadedFile))
    setSponsorLogo(uploadedFile)
  }

  const usableDateString = (dateString: string | undefined) => {
    if (dateString === undefined || dateString === null) {
      return undefined
    }
    const str = dateString
    return moment(str).utcOffset(str).format('YYYY-MM-DDTHH:mm')
  }

  const { data, loading, error } = useEventQuery()

  useEffect(() => {
    if (data) {
      const { investorMeetingConfiguration } = data.event.configuration

      setEventTimezone(data.event.timeZone.ianaName || 'Europe/Dublin')
      setDefaultStartupSelections(investorMeetingConfiguration.defaultStartupSelections)
      setMeetingsPerSession(investorMeetingConfiguration.meetingsPerSession)
      setSessionDuration(investorMeetingConfiguration.sessionDuration)
      setSponsorLogoUrl(investorMeetingConfiguration.sponsorLogoUrl)
      setStartupPortalOpeningAt(
        usableDateString(investorMeetingConfiguration.startupPortalOpeningAt)
      )
      setStartupPortalClosingAt(
        usableDateString(investorMeetingConfiguration.startupPortalClosingAt)
      )
      setStartupSelectionDeadline(
        usableDateString(investorMeetingConfiguration.startupSelectionDeadline)
      )
    }
  }, [data])

  const investorSessionsSummary = data?.event.investorSessionsSummary

  const { updateEventMutation } = useEventUpdateMutation({
    defaultStartupSelections,
    eventTimezone,
    meetingsPerSession,
    sessionDuration,
    sponsorLogo,
    startupPortalClosingAt,
    startupPortalOpeningAt,
    startupSelectionDeadline,
  })

  const breadcrumbsRoutes: Breadcrumb[] = [
    {
      label: data?.event.name || 'Home',
      redirectUrl: '/',
    },
    {
      label: 'Settings',
    },
  ]

  return (
    <>
      <Helmet>
        <title>Investor Portal configurations</title>
      </Helmet>
      <PageContainer>
        {loading && <Loader />}
        {error && (
          <Warning>
            <span>{error.message}</span>
          </Warning>
        )}
        <BreadcrumbsContainer>
          <Breadcrumbs routes={breadcrumbsRoutes} />
        </BreadcrumbsContainer>
        <SpacingBottom>
          <ContainerCard color="#00AFA9" title="Investor portal settings">
            <SpacingBottom>
              <ConfigurationPanel
                onSubmit={async e => {
                  e.preventDefault()
                  await updateEventMutation()
                }}
              >
                <FormArea>
                  <SponsorLogo src={sponsorLogoUrl} />
                  <LabeledFileInput
                    accept="image/svg+xml"
                    className="file-input"
                    defaultValue={sponsorLogoUrl}
                    label="Upload a SVG file"
                    type="file"
                    onChange={e => {
                      handleUpload(e.target.files?.[0])
                    }}
                  />
                </FormArea>
                <FormArea>
                  <h3 className="heading">Session settings</h3>
                  <LabeledInput
                    defaultValue={sessionDuration}
                    label="Sessions duration (min)"
                    type="number"
                    onChange={e => {
                      setSessionDuration(+e.target.value)
                    }}
                  />
                  <LabeledInput
                    defaultValue={meetingsPerSession}
                    label="Meetings per session"
                    type="number"
                    onChange={e => {
                      setMeetingsPerSession(+e.target.value)
                    }}
                  />
                  <LabeledInput
                    defaultValue={defaultStartupSelections}
                    label="Minimum startup selections"
                    type="number"
                    onChange={e => {
                      setDefaultStartupSelections(+e.target.value)
                    }}
                  />
                </FormArea>
                <FormArea>
                  <h3 className="heading">Investor portal dates</h3>
                  <LabeledInput
                    label="Startup submissions deadline"
                    type="datetime-local"
                    value={startupSelectionDeadline}
                    onChange={e => {
                      setStartupSelectionDeadline(e.target.value)
                    }}
                  />
                </FormArea>
                <FormArea className="space-around">
                  <h3 className="heading">Startup portal dates</h3>
                  <LabeledInput
                    label="Startup Portal opening at"
                    type="datetime-local"
                    value={startupPortalOpeningAt}
                    onChange={e => {
                      setStartupPortalOpeningAt(e.target.value)
                    }}
                  />
                  <LabeledInput
                    label="Startup Portal closing at"
                    min={startupPortalOpeningAt}
                    type="datetime-local"
                    value={startupPortalClosingAt}
                    onChange={e => {
                      setStartupPortalClosingAt(e.target.value)
                    }}
                  />
                </FormArea>
                <FormArea>
                  <Button className="align-right" type="submit">
                    Save
                  </Button>
                </FormArea>
              </ConfigurationPanel>
            </SpacingBottom>
          </ContainerCard>
        </SpacingBottom>
        <ContainerCard color="#4688D9" title="Sessions">
          <SpacingBottom>
            <InvestorSessionsCreateForm eventTimezone={eventTimezone} />
            {investorSessionsSummary && (
              <SessionsSummary investorSessionsSummaries={investorSessionsSummary} />
            )}
          </SpacingBottom>
        </ContainerCard>
      </PageContainer>
    </>
  )
}

export default SettingsDashboard
