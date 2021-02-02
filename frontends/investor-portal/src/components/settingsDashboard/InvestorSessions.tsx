import { useMutation, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import moment from 'moment';
import 'moment-timezone';

import { Button } from '../../lib/components'
import ContainerCard from '../../lib/components/atoms/ContainerCard'

import INVESTOR_SESSIONS_CREATE_MUTATION from '../../operations/mutatuions/InvestorSessionsCreate'
import { useAppContext } from '../app/AppContext'
import LabeledInput from '../../lib/components/molecules/LabeledInput'
import { InvestorSessionsForm, ConfigurationPanel, PageContainer, SpacingBottom, SponsorLogo } from './SettingsDashboard.styled'


const InvestorSessions: React.FC = () => {
  const { conferenceSlug, token } = useAppContext()
  const [eventTimezone, setEventTimezone] = useState<string>('Europe/Dublin')

  const [startsAt, setStartsAt] = useState<string | undefined>()
  const [endsAt, setEndsAt] = useState<string | undefined>()
  const [count, setCount] = useState<number | undefined>()
  const [mutationSuccessMessage, setMutationSuccessMessage] = useState<string | undefined>()
  const [mutationError, setMutationError] = useState<string | undefined>()

  const usableDateString = (dateString: string | undefined) => {
    if (dateString === undefined || dateString === null) {
      return undefined
    }

    let str = dateString
    return moment(str).utcOffset(str).format('YYYY-MM-DDTHH:mm')
  }

  const styledDateForMutation = (dateString?: string) => {
    if (dateString === undefined) {
      return null
    }
    return moment(dateString).tz(eventTimezone, true).format()
  }


  useEffect(() => {
    setStartsAt(usableDateString(startsAt))
    setEndsAt(usableDateString(endsAt))
    setCount(count)
  },[])

  const [investorSessionsCreateMutation] = useMutation(INVESTOR_SESSIONS_CREATE_MUTATION, {
    context: {
      slug: conferenceSlug,
      token,
    },
    onCompleted: ({ investorSessionsCreate }) => {
      if (investorSessionsCreate?.successMessage.length) {
        setMutationSuccessMessage(investorSessionsCreate?.successMessage)
        setMutationError('')
      }
      if (investorSessionsCreate?.userErrors.length) {
        setMutationError(investorSessionsCreate?.userErrors[0])
      }
    },
    variables: {
      investorSessionsStartsAt: startsAt,
      investorSessionsEndsAt: endsAt,
      investorSessionsCount: count
    },
  })

  const submitForm = () => {
    investorSessionsCreateMutation()
  }

  return (
    <>
      <ContainerCard color="#f6b826" title="Session Settings">
        <SpacingBottom>
          <InvestorSessionsForm>
            <LabeledInput
              defaultValue={startsAt}
              label="Starting Time"
              type="datetime-local"
              onChange={e => {setStartsAt(e.target.value)}}
            />
            <LabeledInput
              defaultValue={endsAt}
              label="Ending Time"
              type="datetime-local"
              onChange={e => {setEndsAt(e.target.value)}}
            />
            <LabeledInput
              defaultValue={count}
              label="How many sessions in this block?"
              type="number"
              onChange={e => {setCount(parseInt(e.target.value))}}
            />
          </InvestorSessionsForm>
          <div>
            <Button onClick={submitForm}>Add Session</Button>
          </div>
        </SpacingBottom>
      </ContainerCard>
    </>
  )
}

export default InvestorSessions
